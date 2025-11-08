import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { getAuthClient } from '../api/client';
import Loading from '../components/Loading';
import PostCardI from '../components/postcard/PostCardI';
import Wrapper from '../assets/wrappers/Favorites';
import { FaTimes, FaHeart } from 'react-icons/fa';
import { Radio, message } from 'antd';
import { AxiosError } from 'axios';

interface FavoritesProps {
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

const Favorites: React.FC<FavoritesProps> = ({ className }) => {
  const navigate = useNavigate();

  const [loading, setLoading] = useState(true);

  const [actionLoading, setActionLoaing] = useState(false);

  const [favorites, setFavorites] = useState<Post[]>([]);

  const [listType, setListType] = useState('fav');

  useEffect(() => {
    const getMyFavorites = async () => {
      setLoading(true);
      try {
        const response = await getAuthClient().get(
          `/favorites?list=${listType}`
        );
        setFavorites(response.data.favorites);
      } catch (err) {}
      setLoading(false);
    };
    getMyFavorites();
  }, [listType]);

  const deleteFavorite = async (post: string) => {
    setActionLoaing(true);

    try {
      await getAuthClient().delete(`/favorites?post=${post}`);
      setFavorites([...favorites.filter((favorite) => favorite._id !== post)]);
    } catch (err) {
      const error = err as AxiosError;
      message.error((error.response?.data as any).msg);
    }

    setActionLoaing(false);
  };

  return (
    <Wrapper className={className}>
      <header>
        <span className='fav-icon'>
          <FaHeart />
        </span>
        <p>my list</p>
      </header>
      <Radio.Group
        defaultValue='fav'
        style={{ marginLeft: '18px' }}
        onChange={(e) => setListType(e.target.value)}
      >
        <Radio.Button value='fav'>Favorite</Radio.Button>
        <Radio.Button value='later'>Watch later</Radio.Button>
        <Radio.Button value='current'>Watching</Radio.Button>
        <Radio.Button value='arch'>Archive</Radio.Button>
      </Radio.Group>
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
          {favorites.map((post) => {
            return (
              <div className='post-with-btn' key={post._id}>
                <PostCardI
                  duration={post.duration}
                  episodeCount={post.episodeCount}
                  imgUrl={post.posterVerticalPath}
                  title={post.title}
                  type={post.type}
                  className='post'
                  onClick={() => {
                    navigate(`/posts/${post._id}`);
                  }}
                />
                <button
                  className='delete-btn'
                  onClick={() => deleteFavorite(post._id)}
                  disabled={actionLoading}
                >
                  <FaTimes />
                </button>
              </div>
            );
          })}
        </div>
      )}
    </Wrapper>
  );
};

export default Favorites;
