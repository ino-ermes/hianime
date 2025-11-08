import React, { useEffect, useState } from 'react';
import Wrapper from '../assets/wrappers/RecentlyUpdated';
import { FaAngleRight } from 'react-icons/fa6';
import PostCardI from './postcard/PostCardI';
import { useNavigate } from 'react-router-dom';
import { client } from '../api/client';
import Loading from './Loading';

interface RecentlyUpdatedProps {
  className?: string;
}

interface Post {
  _id: string;
  title: string;
  posterVerticalPath: string;
  type: string;
  duration: number;
  episodeCount: number;
}

const RecentlyUpdated: React.FC<RecentlyUpdatedProps> = ({ className }) => {
  const navigate = useNavigate();

  const [status, setStatus] = useState<
    'idle' | 'loading' | 'succeeded' | 'failed'
  >('idle');

  const loading = status === 'idle' || status === 'loading';

  const [posts, setPosts] = useState<Post[]>([]);

  useEffect(() => {
    if (status === 'idle') {
      const getTrendingPosts = async () => {
        setStatus('loading');
        try {
          const response = await client.get('posts?sort=updated');
          setPosts(response.data.posts);
          setStatus('succeeded');
        } catch (err) {
          setStatus('failed');
        }
      };
      getTrendingPosts();
    }
  }, [status]);

  return (
    <Wrapper className={className}>
      <header>
        <p>recently updated</p>
        <div className='btn' onClick={() => navigate('/recently-updated')}>
          <span className='text'>View more</span>
          <span className='icon'>
            <FaAngleRight />
          </span>
        </div>
      </header>
      {loading ? (
        <Loading
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        />
      ) : (
        <div className='container'>
          {posts.map((post) => {
            return (
              <PostCardI
                duration={post.duration}
                episodeCount={post.episodeCount}
                imgUrl={post.posterVerticalPath}
                title={post.title}
                type={post.type}
                className='post'
                key={post._id}
                onClick={() => {
                  navigate(`/posts/${post._id}`);
                }}
              />
            );
          })}
        </div>
      )}
    </Wrapper>
  );
};

export default RecentlyUpdated;
