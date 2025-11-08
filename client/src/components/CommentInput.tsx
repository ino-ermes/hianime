import React, { useState } from 'react';
import Wrapper from '../assets/wrappers/CommentInput';
import { Input, message } from 'antd';
import { IComment } from './CommentSection';
import { getAuthClient } from '../api/client';
import { useSelector } from 'react-redux';
import { selectUser } from '../store/slices/authSlice';

const { TextArea } = Input;

interface CommentInputProps {
  addComment: (comment: IComment) => void;
  episode: string | null;
}

const CommentInput: React.FC<CommentInputProps> = ({ addComment, episode }) => {
  const [showBtns, setShowBtns] = useState<boolean>(false);
  const [content, setContent] = useState('');
  const [loading, setLoading] = useState(false);

  const user = useSelector(selectUser);

  const handleComment = async () => {
    setLoading(true);
    try {
      const response = await getAuthClient().post(
        `/comments?episode=${episode}`,
        {
          content,
        }
      );
      const { comment } = response.data;
      addComment(comment);
      setContent('');
      setShowBtns(false);
    } catch (err) {
      message.error('omae wa mou');
    }
    setLoading(false);
  };

  return (
    <Wrapper>
      <div className='left'>
        <img
          alt='avt'
          src={user?.avtPath || process.env.PUBLIC_URL + '/default_avatar.png'}
        />
      </div>
      <div className='right'>
        <p className='header'>
          {user ? (
            <>
              Comment as{' '}
              <span style={{ color: 'var(--primary-500)' }}>{user.name}</span>
            </>
          ) : (
            'Login to comment'
          )}
        </p>
        <TextArea
          autoSize={{ minRows: 2 }}
          maxLength={200}
          className='comment'
          onFocus={() => setShowBtns(true)}
          value={content}
          onChange={(e) => setContent(e.target.value)}
          placeholder={user ? 'Write your comment' : 'Login to comment'}
          disabled={loading}
        />
        <div className={`btn-container ${showBtns ? 'show' : 'hide'}`}>
          <button
            className='cancel'
            onClick={() => setShowBtns(false)}
            disabled={loading}
          >
            Close
          </button>
          <button onClick={handleComment} disabled={loading || !user}>
            Comment
          </button>
        </div>
      </div>
    </Wrapper>
  );
};

export default CommentInput;
