import React, { useState } from 'react';
import Wrapper from '../assets/wrappers/CommentReply';
import { FaReply, FaRegThumbsUp, FaRegThumbsDown } from 'react-icons/fa';
import PrimaryButton from './PrimaryButton';
import ReactTimeAgo from 'react-time-ago';
import CommentReplyInput from './CommentReplyInput';
import { IReply } from './CommentSection';
import { message } from 'antd';
import { getAuthClient } from '../api/client';
import { useSelector } from 'react-redux';
import { selectUser } from '../store/slices/authSlice';

interface CommentReplyProps {
  reply: IReply;
  addReply: (reply: IReply) => void;
  addReplyVote: (
    commentId: string,
    replyId: string,
    userAction: -1 | 0 | 1
  ) => void;
}

const CommentReply: React.FC<CommentReplyProps> = ({
  addReply,
  reply,
  addReplyVote,
}) => {
  const [showReplyInput, setShowReplyInput] = useState(false);
  const [voteLoading, setVoteLoading] = useState(false);
  const user = useSelector(selectUser);

  const handleVote = async (vote: -1 | 1) => {
    setVoteLoading(true);
    if (vote === reply.userAction) {
      try {
        await getAuthClient().delete(`/comment-votes?comment=${reply._id}`);
        addReplyVote(reply.parentComment, reply._id, vote);
      } catch (err) {
        message.error('omae wa mou');
      }
    } else {
      try {
        await getAuthClient().post(`/comment-votes?comment=${reply._id}`, {
          isUpvote: vote === 1,
        });
        addReplyVote(reply.parentComment, reply._id, vote);
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
            reply.user.avtPath
              ? reply.user.avtPath
              : process.env.PUBLIC_URL + '/default_avatar.png'
          }
        />
      </div>
      <div className='right'>
        <div className='header'>
          <span className='name'>{reply.user.name}</span>
          <span className='time'>
            <ReactTimeAgo date={new Date(reply.createdAt)} />
          </span>
        </div>
        <p className='content'>{reply.content}</p>
        <div className='btn-container'>
          <PrimaryButton
            startIcon={FaReply}
            onClick={() => setShowReplyInput(true)}
          >
            Reply
          </PrimaryButton>
          <PrimaryButton
            startIcon={FaRegThumbsUp}
            className={reply.userAction === 1 ? 'voted' : undefined}
            onClick={() => handleVote(1)}
            disabled={voteLoading || !user}
          >
            {reply.upvote}
          </PrimaryButton>
          <PrimaryButton
            startIcon={FaRegThumbsDown}
            className={reply.userAction === -1 ? 'voted' : undefined}
            onClick={() => handleVote(-1)}
            disabled={voteLoading || !user}
          >
            {reply.devote}
          </PrimaryButton>
        </div>
        {showReplyInput && (
          <CommentReplyInput
            handleClose={() => setShowReplyInput(false)}
            addReply={addReply}
            parentCommentId={reply.parentComment}
            episode={reply.episode}
          />
        )}
      </div>
    </Wrapper>
  );
};

export default CommentReply;
