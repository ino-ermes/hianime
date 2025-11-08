import React, { useEffect, useRef, useState } from 'react';
import Wrapper from '../assets/wrappers/CommentSection';
import CommentInput from './CommentInput';
import Comment from './Comment';
import { useSearchParams } from 'react-router-dom';
import { getAuthClient } from '../api/client';
import { AxiosError } from 'axios';
import { message } from 'antd';
import Loading from './Loading';
import { GoTriangleDown } from 'react-icons/go';
import PrimaryButton from './PrimaryButton';
import { socket } from '../utils/socket';
import { useSelector } from 'react-redux';
import { selectUser } from '../store/slices/authSlice';

interface CommentSectionProps {}

export interface IReply {
  _id: string;
  user: { _id: string; name: string; avtPath: string };
  episode: string;
  content: string;
  upvote: number;
  devote: number;
  userAction: -1 | 0 | 1;
  createdAt: string;
  parentComment: string;
}

export interface IComment {
  _id: string;
  user: { _id: string; name: string; avtPath: string };
  episode: string;
  content: string;
  upvote: number;
  devote: number;
  userAction: -1 | 0 | 1;
  createdAt: string;
  replyCount: number;
  replies: IReply[];
}

let commentIds: { [key: string]: boolean } = {};

const CommentSection: React.FC<CommentSectionProps> = () => {
  const [firstLoad, setFirstload] = useState(false);
  const [comments, setComments] = useState<IComment[]>([]);
  const [hasMore, setHasMore] = useState(false);
  const [loading, setLoading] = useState(false);

  const user = useSelector(selectUser);

  const [params] = useSearchParams();
  const episode = params.get('episode');

  const targetRef = useRef(null);

  const updateCommentVote = (
    _id: string,
    upvote: number,
    devote: number,
    userId: string,
    userAction: -1 | 0 | 1
  ) => {
    setComments((prevComments) =>
      prevComments.map((comment) => {
        if (comment._id === _id) {
          return {
            ...comment,
            upvote,
            devote,
            userAction: userId === user?._id ? userAction : comment.userAction,
          };
        } else {
          return comment;
        }
      })
    );
  };

  const updateReplyVote = (
    commentId: string,
    replyId: string,
    upvote: number,
    devote: number,
    userId: string,
    userAction: -1 | 0 | 1
  ) => {
    setComments((prevComments) =>
      prevComments.map((comment) => {
        if (comment._id === commentId) {
          const replies = comment.replies.map((reply) => {
            if (reply._id === replyId) {
              return {
                ...reply,
                upvote,
                devote,
                userAction:
                  userId === user?._id ? userAction : comment.userAction,
              };
            } else {
              return reply;
            }
          });
          return { ...comment, replies };
        } else {
          return comment;
        }
      })
    );
  };

  const addCommentVote = (_id: string, userAction: -1 | 0 | 1) => {
    setComments((prevComments) =>
      prevComments.map((comment) => {
        if (comment._id === _id) {
          let upvote = comment.upvote;
          let devote = comment.devote;

          switch (userAction - comment.userAction) {
            case 1:
              upvote++;
              break;
            case -1:
              devote++;
              break;
            case 2:
              upvote++;
              devote--;
              break;
            case -2:
              upvote--;
              devote++;
              break;
            case 0:
              if (userAction === 1) {
                upvote--;
              } else if (userAction === -1) {
                devote--;
              }
              userAction = 0;
              break;
          }
          return { ...comment, upvote, devote, userAction };
        } else {
          return comment;
        }
      })
    );
  };

  const addReplyVote = (
    commentId: string,
    replyId: string,
    userAction: -1 | 0 | 1
  ) => {
    setComments((prevComments) =>
      prevComments.map((comment) => {
        if (comment._id === commentId) {
          const replies = comment.replies.map((reply) => {
            if (reply._id === replyId) {
              let upvote = reply.upvote;
              let devote = reply.devote;

              switch (userAction - reply.userAction) {
                case 1:
                  upvote++;
                  break;
                case -1:
                  devote++;
                  break;
                case 2:
                  upvote++;
                  devote--;
                  break;
                case -2:
                  upvote--;
                  devote++;
                  break;
                case 0:
                  if (userAction === 1) {
                    upvote--;
                  } else if (userAction === -1) {
                    devote--;
                  }
                  userAction = 0;
                  break;
              }

              return { ...reply, upvote, devote, userAction };
            } else {
              return reply;
            }
          });
          return { ...comment, replies };
        } else {
          return comment;
        }
      })
    );
  };

  const addComment = (comment: IComment) => {
    if (comment.user._id === user?._id) commentIds[comment._id] = true;

    comment.replies = [];
    setComments((prevComments) => [comment, ...prevComments]);
  };

  const addComments = (newComments: IComment[]) => {
    setComments((prevComments) => [
      ...prevComments,
      ...newComments.map((comment) => {
        comment.replies = [];
        return comment;
      }),
    ]);
  };

  const addReply = (reply: IReply) => {
    if (reply.user._id === user?._id) commentIds[reply._id] = true;

    setComments((prevComments) =>
      prevComments.map((comment) => {
        if (comment._id !== reply.parentComment) return comment;

        if (comment.replies.length === comment.replyCount)
          return {
            ...comment,
            replies: [...comment.replies, reply],
            replyCount: comment.replyCount + 1,
          };

        return {
          ...comment,
          replyCount: comment.replyCount + 1,
        };
      })
    );
  };

  const addReplies = (replies: IReply[]) => {
    setComments((prevComments) =>
      prevComments.map((comment) =>
        comment._id === replies[0].parentComment
          ? {
              ...comment,
              replies: [...comment.replies, ...replies],
            }
          : comment
      )
    );
  };

  const getComments = async () => {
    setLoading(true);
    try {
      const createdAt =
        comments.length !== 0
          ? comments[comments.length - 1].createdAt
          : new Date().toISOString();
      const response = await getAuthClient().get(
        `/comments?episode=${episode}&createdAt=${createdAt}&limit=12`
      );
      const { comments: cs, hasMore } = response.data;
      addComments(cs);
      setHasMore(hasMore);
    } catch (err) {
      const error = err as AxiosError;
      message.error((error.response?.data as any).msg);
    }
    setLoading(false);
  };

  useEffect(() => {
    const options = {
      root: null,
      rootMargin: '0px',
      threshold: 0.5,
    };

    commentIds = {};

    const observer = new IntersectionObserver(async ([entry]) => {
      if (entry.isIntersecting && episode) {
        await getComments();
        setFirstload(true);
        if (targetRef.current) observer.unobserve(targetRef.current);
      }
    }, options);

    if (targetRef.current) observer.observe(targetRef.current);

    return () => {
      observer.disconnect();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (episode && firstLoad) {
      socket.on(episode, (action: string, data: any) => {
        if (action === 'comment') {
          const { comment } = data;
          if (comment.parentComment) {
            if (!commentIds[comment._id]) {
              addReply(comment);
            }
          } else {
            if (!commentIds[comment._id]) {
              addComment(comment);
            }
          }
        } else if (action === 'vote') {
          const { replyId, commentId, upvote, devote, userId, userAction } =
            data;

          if (replyId) {
            updateReplyVote(
              commentId,
              replyId,
              upvote,
              devote,
              userId,
              userAction
            );
          } else {
            updateCommentVote(commentId, upvote, devote, userId, userAction);
          }
        }
      });

      return () => {
        socket.off(episode);
      };
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [firstLoad, episode, user]);

  return (
    <Wrapper ref={targetRef}>
      <header>
        <p>comment</p>
      </header>
      {firstLoad ? (
        <>
          <CommentInput addComment={addComment} episode={episode} />
          <div className='comment-container'>
            {comments.map((comment) => {
              return (
                <Comment
                  addReplies={addReplies}
                  addReply={addReply}
                  comment={comment}
                  key={comment._id}
                  addCommentVote={addCommentVote}
                  addReplyVote={addReplyVote}
                />
              );
            })}
          </div>
        </>
      ) : (
        <div style={{ height: '300px' }}>
          <Loading style={{ display: 'block', width: '300px' }} />
        </div>
      )}
      {hasMore && !loading && (
        <PrimaryButton
          startIcon={GoTriangleDown}
          className='show-more'
          onClick={getComments}
          disabled={loading}
        >
          View more
        </PrimaryButton>
      )}
      {loading && hasMore && (
        <Loading style={{ display: 'block', width: '300px' }} />
      )}
    </Wrapper>
  );
};

export default CommentSection;
