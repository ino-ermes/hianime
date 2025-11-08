import React, { useEffect, useRef, useState } from 'react';
import Wrapper from '../../assets/wrappers/PostInfo';
import { GoDotFill } from 'react-icons/go';
import { FaClosedCaptioning, FaPlay } from 'react-icons/fa';
import PrimaryButton from '../../components/PrimaryButton';
import { useNavigate, useParams } from 'react-router-dom';
import { client, getAuthClient } from '../../api/client';
import Loading from '../../components/Loading';
import { useSelector } from 'react-redux';
import { selectUser } from '../../store/slices/authSlice';
import { AxiosError } from 'axios';
import { message } from 'antd';

interface Post {
  _id: string;
  title: string;
  posterVerticalPath: string;
  description: string;
  type: string;
  airedFrom: string;
  airedTo: string;
  status: string;
  duration: number;
  episodeCount: number;
  studio: { _id: string; name: string };
  genres: { _id: string; name: string }[];
}

interface PostInfoProps {
  className?: string;
}

const PostInfo: React.FC<PostInfoProps> = ({ className }) => {
  const navigate = useNavigate();

  const { postId } = useParams();

  const user = useSelector(selectUser);

  const [loading, setLoading] = useState(true);

  const [post, setPost] = useState<Post>();
  const [list, setList] = useState<
    'fav' | 'later' | 'current' | 'arch' | 'none'
  >('none');
  const [actionLoading, setActionLoaind] = useState(false);

  useEffect(() => {
    const getPostInfo = async () => {
      setLoading(true);
      try {
        const response = await client.get(`/posts/${postId}?info=true`);
        setPost(response.data.post);

        if (user) {
          const { list } = (
            await getAuthClient().get(`/favorites/my-list?post=${postId}`)
          ).data;
          setList(list);
        }
      } catch (err) {
        navigate('/home');
      }
      setLoading(false);
    };
    getPostInfo();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [postId]);

  const deleteList = async (post?: string) => {
    if (!post) return;
    setActionLoaind(true);

    try {
      await getAuthClient().delete(`/favorites?post=${post}`);
      setList('none');
    } catch (err) {
      const error = err as AxiosError;
      message.error((error.response?.data as any).msg);
    }

    setActionLoaind(false);
  };

  const addTolist = async (
    li: 'fav' | 'later' | 'current' | 'arch',
    post?: string
  ) => {
    if (!post) return;

    if (li === list) {
      await deleteList(post);
      return;
    }

    setActionLoaind(true);

    try {
      await getAuthClient().post(`/favorites?post=${post}`, { list: li });
      setList(li);
    } catch (err) {
      const error = err as AxiosError;
      message.error((error.response?.data as any).msg);
    }

    setActionLoaind(false);
  };

  const [showAddList, setShowAddList] = useState(false);
  const addListRef = useRef<HTMLDivElement>(null);

  const handleClickOutside = (event: MouseEvent) => {
    if (
      addListRef.current &&
      !addListRef.current.contains(event.target as Node)
    ) {
      setShowAddList(false);
    }
  };
  useEffect(() => {
    if (showAddList) {
      document.addEventListener('mouseup', handleClickOutside);
    } else {
      document.removeEventListener('mouseup', handleClickOutside);
    }
    return () => {
      document.removeEventListener('mouseup', handleClickOutside);
    };
  }, [showAddList]);

  if (loading) {
    return (
      <Loading
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      />
    );
  }

  return (
    <Wrapper className={className}>
      <div className='poster'>
        <img alt='poster' src={post?.posterVerticalPath} />
      </div>
      <div className='summary'>
        <p className='nav'>
          <span onClick={() => navigate('/home')}>Home</span>
          <GoDotFill className='sep-dot' />
          <span>
            {post?.type === 'movie' ? 'Movie' : post?.type.toUpperCase()}
          </span>
          <GoDotFill className='sep-dot' />
          <span className='cgrey'>{post?.title}</span>
        </p>
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
        <div className='btn-container'>
          <PrimaryButton
            startIcon={FaPlay}
            className='btn'
            onClick={() => {
              navigate(`/posts/${postId}/episodes`);
            }}
          >
            Watch now
          </PrimaryButton>
          <div
            className='add-list-btn'
            onClick={(e) => {
              if (e.currentTarget === e.target) setShowAddList((prev) => !prev);
            }}
            ref={addListRef}
          >
            Add to list
            <aside className={`${showAddList ? 'show ' : ''}btn-menu`}>
              <button
                className={`${list === 'fav' ? 'activated ' : ''} btn-item`}
                onClick={() => addTolist('fav', postId)}
                disabled={actionLoading}
              >
                Favorite
              </button>
              <button
                className={`${list === 'later' ? 'activated ' : ''} btn-item`}
                onClick={() => addTolist('later', postId)}
                disabled={actionLoading}
              >
                Watch later
              </button>
              <button
                className={`${list === 'current' ? 'activated ' : ''} btn-item`}
                onClick={() => addTolist('current', postId)}
                disabled={actionLoading}
              >
                Watching
              </button>
              <button
                className={`${list === 'arch' ? 'activated ' : ''} btn-item`}
                onClick={() => addTolist('arch', postId)}
                disabled={actionLoading}
              >
                Archive
              </button>
            </aside>
          </div>
        </div>
        <p className='description'>{post?.description}</p>
      </div>
      <div className='info-container'>
        <p>
          <span className='label'>Aired:</span>
          <span>
            {new Date(post?.airedFrom || '').toLocaleDateString() +
              ' - ' +
              new Date(post?.airedTo || '').toLocaleDateString()}
          </span>
        </p>
        <p>
          <span className='label'>Premiered:</span>
          <span>{getSeasonYear(new Date(post?.airedFrom || ''))}</span>
        </p>
        <p>
          <span className='label'>Duration:</span>
          <span>{post?.duration}</span>
        </p>
        <p>
          <span className='label'>Status:</span>
          <span className='capitalize'>{post?.status}</span>
        </p>
        <div className='sep' />
        <p>
          <span className='label'>Genres:</span>
          {post?.genres.map((genre) => {
            return (
              <span
                key={genre._id}
                className='genre'
                onClick={() => navigate(`/genres/${genre._id}`)}
              >
                {genre.name}
              </span>
            );
          })}
        </p>
        <div className='sep' />
        <p>
          <span className='label'>Studio:</span>
          <span>{post?.studio.name}</span>
        </p>
      </div>
    </Wrapper>
  );
};

export default PostInfo;

function getSeasonYear(date: Date): string {
  const month = date.getMonth() + 1;
  let season: string;
  let year: number;

  switch (true) {
    case month >= 3 && month <= 5:
      season = 'Spring';
      break;
    case month >= 6 && month <= 8:
      season = 'Summer';
      break;
    case month >= 9 && month <= 11:
      season = 'Fall';
      break;
    default:
      season = 'Winter';
  }

  if (month >= 3) {
    year = date.getFullYear();
  } else {
    year = date.getFullYear() - 1;
  }

  return `${season} ${year}`;
}
