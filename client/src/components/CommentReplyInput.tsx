import React, { useState } from 'react';
import Wrapper from '../assets/wrappers/CommentReplyInput';
import { Input, message } from 'antd';
import { IReply } from './CommentSection';
import { getAuthClient } from '../api/client';
import { useSelector } from 'react-redux';
import { selectUser } from '../store/slices/authSlice';

const { TextArea } = Input;

interface CommentReplyInputProps {
  handleClose: () => void;
  parentCommentId: string;
  addReply: (reply: IReply) => void;
  episode: string | null;
}

const CommentReplyInput: React.FC<CommentReplyInputProps> = ({
  handleClose,
  addReply,
  parentCommentId,
  episode,
}) => {
  const [content, setContent] = useState('');
  const [loading, setLoading] = useState(false);

  const user = useSelector(selectUser);

  const handleReply = async () => {
    setLoading(true);
    try {
      const response = await getAuthClient().post(
        `/comments?episode=${episode}`,
        {
          content,
          parentComment: parentCommentId,
        }
      );
      const { comment } = response.data;
      addReply(comment);
      setContent('');
      handleClose();
    } catch (err) {
      message.error('omae wa mou');
    }
    setLoading(false);
  };

  return (
    <Wrapper>
      <div className='left'>
        <img alt='avt' src={process.env.PUBLIC_URL + '/default_avatar.png'} />
      </div>
      <div className='right'>
        <TextArea
          autoSize={{ minRows: 2 }}
          maxLength={200}
          className='comment'
          value={content}
          onChange={(e) => setContent(e.target.value)}
          placeholder={user ? 'Write your reply' : 'Login to reply'}
          disabled={loading}
        />
        <div className='btn-container'>
          <button
            className='cancel'
            onClick={() => handleClose()}
            disabled={loading}
          >
            Close
          </button>
          <button onClick={handleReply} disabled={loading || !user}>
            Reply
          </button>
        </div>
      </div>
    </Wrapper>
  );
};

export default CommentReplyInput;
