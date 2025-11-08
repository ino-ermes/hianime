import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { getAuthClient } from '../api/client';
import Loading from '../components/Loading';
import PostCardO from '../components/postcard/PostCardO';
import Wrapper from '../assets/wrappers/Histories';
import { FaHistory, FaTimes } from 'react-icons/fa';
import { AxiosError } from 'axios';
import { message } from 'antd';

interface HistoriesProps {
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

interface Episode {
  _id: string;
  episodeNumber: number;
  duration: number;
}

interface History {
  _id: string;
  post: Post;
  episode: Episode;
  position: number;
}

const Histories: React.FC<HistoriesProps> = ({ className }) => {
  const navigate = useNavigate();

  const [status, setStatus] = useState<
    'idle' | 'loading' | 'succeeded' | 'failed'
  >('idle');

  const loading = status === 'idle' || status === 'loading';

  const [histories, setHistories] = useState<History[]>([]);
  const [actionLoading, setActionLoaing] = useState(false);

  const deleteHistory = async (post: string) => {
    setActionLoaing(true);

    try {
      await getAuthClient().delete(`/histories?post=${post}`);
      setHistories([
        ...histories.filter((history) => history.post._id !== post),
      ]);
    } catch (err) {
      const error = err as AxiosError;
      message.error((error.response?.data as any).msg);
    }

    setActionLoaing(false);
  };

  useEffect(() => {
    if (status === 'idle') {
      const getMyHistories = async () => {
        setStatus('loading');
        try {
          const response = await getAuthClient().get(`/histories`);
          setHistories(response.data.histories);
          setStatus('succeeded');
        } catch (err) {
          setStatus('failed');
        }
      };
      getMyHistories();
    }
  }, [status]);

  return (
    <Wrapper className={className}>
      <header>
        <span className='his-icon'>
          <FaHistory />
        </span>
        <p>continue watching</p>
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
          {histories.map((history) => {
            return (
              <div className='post-with-btn' key={history.post._id}>
                <PostCardO
                  episodeDuration={history.episode.duration}
                  episodeNumber={history.episode.episodeNumber}
                  episodeRemuse={Math.floor(history.position)}
                  duration={history.post.duration}
                  episodeCount={history.post.episodeCount}
                  imgUrl={history.post.posterVerticalPath}
                  title={history.post.title}
                  type={history.post.type}
                  className='post'
                  onClick={() => {
                    navigate(`/posts/${history.post._id}/episodes`);
                  }}
                />
                <button
                  className='delete-btn'
                  onClick={() => deleteHistory(history.post._id)}
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

export default Histories;
