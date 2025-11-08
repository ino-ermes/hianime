import React, { useEffect, useState } from 'react';
import Wrapper from '../assets/wrappers/RatingContainer';
import Rating from './Rating';
import { FaClosedCaptioning } from 'react-icons/fa';
import { GoDotFill } from 'react-icons/go';
import { useParams } from 'react-router-dom';
import { client } from '../api/client';

interface Post {
  _id: string;
  title: string;
  posterVerticalPath: string;
  type: string;
  episodeCount: string;
  duration: number;
}

const RatingContainer: React.FC = () => {
  const [status, setStatus] = useState<
    'idle' | 'loading' | 'succeeded' | 'failed'
  >('idle');

  const { postId } = useParams();

  const [post, setPost] = useState<Post>();

  useEffect(() => {
    if (status === 'idle') {
      const getPostInfo = async () => {
        setStatus('loading');
        try {
          const response = await client.get(`/posts/${postId}`);
          setPost(response.data.post);
          setStatus('succeeded');
        } catch (err) {
          setStatus('failed');
        }
      };
      getPostInfo();
    }
  }, [status, postId]);

  return (
    <Wrapper>
      <div className='poster'>
        <img alt='poster' src={post?.posterVerticalPath} />
      </div>
      <div className='info'>
        <p className='title'>{post?.title}</p>
        <div className='meta-info'>
          <span className='item'>
            <FaClosedCaptioning className='icon' />
            <span className='text'>{post?.episodeCount}</span>
          </span>
          <GoDotFill className='sep-dot' />
          <span>
            {post?.type === 'movie' ? 'Movie' : post?.type.toUpperCase()}
          </span>
          <GoDotFill className='sep-dot' />
          <span>{post?.duration + 'm'}</span>
        </div>
      </div>
      <div className='rating-container'>
        <Rating className='rating' />
      </div>
    </Wrapper>
  );
};

export default RatingContainer;
