import React, { useEffect, useState } from 'react';
import Wrapper from '../assets/wrappers/TopAnime';
import PostCardU from './postcard/PostCardU';
import { useNavigate } from 'react-router-dom';
import { client } from '../api/client';

interface TopAnimeProps {
  className?: string;
}

interface Post {
  _id: string;
  title: string;
  posterVerticalPath: string;
  type: string;
  duration: number;
  episodeCount: number;
  totalViews: number;
  airedFrom: string;
}

const TopAnime: React.FC<TopAnimeProps> = ({ className }) => {
  const navigate = useNavigate();

  const [topBy, setTopBy] = useState<'day' | 'week' | 'month'>('day');

  const [posts, setPosts] = useState<Post[]>([]);

  useEffect(() => {
    const getTrendingPosts = async () => {
      let ago;
      switch (topBy) {
        case 'day':
          ago = 1;
          break;
        case 'week':
          ago = 7;
          break;
        case 'month':
          ago = 30;
          break;
      }
      try {
        const response = await client.get(
          `/posts/top?ago=${ago}&posterVerticalPath=true`
        );
        setPosts(response.data.posts);
      } catch (err) {}
    };
    getTrendingPosts();
  }, [topBy]);

  return (
    <Wrapper className={className}>
      <header>
        <p>Top Film</p>
        <span>
          <button
            className={topBy === 'day' ? 'activate' : ''}
            onClick={() => setTopBy('day')}
          >
            Day
          </button>
          <button
            className={topBy === 'week' ? 'activate' : ''}
            onClick={() => setTopBy('week')}
          >
            Week
          </button>
          <button
            className={topBy === 'month' ? 'activate' : ''}
            onClick={() => setTopBy('month')}
          >
            Month
          </button>
        </span>
      </header>
      <div className='container'>
        {posts.map((post, index) => {
          return (
            <div className='item' key={post._id}>
              <span className='rank'>{index + 1}</span>
              <PostCardU
                episodeCount={post.episodeCount}
                imgUrl={post.posterVerticalPath}
                title={post.title}
                type={post.type}
                className='post'
                onClick={() => {
                  navigate(`/posts/${post._id}`);
                }}
              />
            </div>
          );
        })}
      </div>
    </Wrapper>
  );
};

export default TopAnime;
