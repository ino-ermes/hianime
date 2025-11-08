import React, { useState } from 'react';
import Wrapper from '../assets/wrappers/Comment';
import { FaReply, FaRegThumbsUp, FaRegThumbsDown } from 'react-icons/fa';
import PrimaryButton from './PrimaryButton';
import ReactTimeAgo from 'react-time-ago';
import CommentReplyInput from './CommentReplyInput';
import { GoTriangleDown } from 'react-icons/go';
import CommentReply from './CommentReply';
import { IComment, IReply } from './CommentSection';
import { getAuthClient } from '../api/client';
import { message } from 'antd';
import Loading from './Loading';
import { useSelector } from 'react-redux';
import { selectUser } from '../store/slices/authSlice';

interface CommentProps {
  comment: IComment;
  addReply: (reply: IReply) => void;
  addReplies: (replies: IReply[]) => void;
  addCommentVote: (_id: string, userAction: -1 | 0 | 1) => void;
  addReplyVote: (
    commentId: string,
    replyId: string,
    userAction: -1 | 0 | 1
  ) => void;
}

const Comment: React.FC<CommentProps> = ({
  comment,
  addReplies,
  addReply,
  addCommentVote,
  addReplyVote,
}) => {
  const [showReplyInput, setShowReplyInput] = useState(false);
  const [showReplies, setShowReplies] = useState(false);
  const [hasMore, setHasMore] = useState(false);
  const [loading, setLoading] = useState(false);
  const [voteLoading, setVoteLoading] = useState(false);
  const user = useSelector(selectUser);
  const hasReplies = comment.replyCount > 0;

  const handleGetReplies = async () => {
    setLoading(true);
    try {
      const createdAt =
        comment.replies.length !== 0
          ? comment.replies[comment.replies.length - 1].createdAt
          : comment.createdAt;
      const response = await getAuthClient().get(
        `/comments?episode=${comment.episode}&parent=${comment._id}&createdAt=${createdAt}&limit=6`
      );

      const { comments, hasMore } = response.data;
      addReplies(comments);
      setHasMore(hasMore);
    } catch (err) {
      message.error('omae wa mou');
    }
    setLoading(false);
  };

  const handleShowHideReplies = () => {
    setShowReplies((prevShowReplies) => {
      if (!prevShowReplies && hasReplies && comment.replies.length === 0) {
        handleGetReplies();
      }
      return !prevShowReplies;
    });
  };

  const handleVote = async (vote: -1 | 1) => {
    setVoteLoading(true);
    if (vote === comment.userAction) {
      try {
        await getAuthClient().delete(`/comment-votes?comment=${comment._id}`);
        addCommentVote(comment._id, vote);
      } catch (err) {
        message.error('omae wa mou');
      }
    } else {
      try {
        await getAuthClient().post(`/comment-votes?comment=${comment._id}`, {
          isUpvote: vote === 1,
        });
        addCommentVote(comment._id, vote);
      } catch (err) {
        message.error('omae wa mou');
      }
    }
    setVoteLoading(false);
  };

  return (
    <Wrapper>
      <div className='left'>
        <img
          alt='avt'
          src={
            comment.user.avtPath
              ? comment.user.avtPath
              : process.env.PUBLIC_URL + '/default_avatar.png'
          }
        />
      </div>
      <div className='right'>
        <div className='header'>
          <span className='name'>{comment.user.name}</span>
          <span className='time'>
            <ReactTimeAgo date={new Date(comment.createdAt)} />
          </span>
        </div>
        <p className='content'>{comment.content}</p>
        <div className='btn-container'>
          <PrimaryButton
            startIcon={FaReply}
            onClick={() => setShowReplyInput(true)}
          >
            Reply
          </PrimaryButton>
          <PrimaryButton
            startIcon={FaRegThumbsUp}
            className={comment.userAction === 1 ? 'voted' : undefined}
            onClick={() => handleVote(1)}
            disabled={voteLoading || !user}
          >
            {comment.upvote}
          </PrimaryButton>
          <PrimaryButton
            startIcon={FaRegThumbsDown}
            className={comment.userAction === -1 ? 'voted' : undefined}
            onClick={() => handleVote(-1)}
            disabled={voteLoading || !user}
          >
            {comment.devote}
          </PrimaryButton>
        </div>
        {showReplyInput && (
          <CommentReplyInput
            handleClose={() => setShowReplyInput(false)}
            addReply={addReply}
            parentCommentId={comment._id}
            episode={comment.episode}
          />
        )}

        {hasReplies && (
          <PrimaryButton
            startIcon={GoTriangleDown}
            className={`${showReplies ? 'rotated' : ''} view-reply-btn`}
            onClick={handleShowHideReplies}
            disabled={loading}
          >
            {showReplies
              ? 'Hide replies'
              : `View ${comment.replyCount} ${
                  comment.replyCount > 1 ? 'replies' : 'reply'
                }`}
          </PrimaryButton>
        )}
        {showReplies &&
          comment.replies.map((reply) => {
            return (
              <CommentReply
                addReply={addReply}
                reply={reply}
                key={reply._id}
                addReplyVote={addReplyVote}
              />
            );
          })}
        {showReplies && loading && (
          <Loading style={{ display: 'block', width: '300px' }} />
        )}
        {hasMore && !loading && showReplies && (
          <PrimaryButton
            startIcon={GoTriangleDown}
            className='show-more'
            onClick={handleGetReplies}
            disabled={loading}
          >
            View more
          </PrimaryButton>
        )}
      </div>
    </Wrapper>
  );
};

export default Comment;
