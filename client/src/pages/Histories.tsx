import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { getAuthClient } from '../api/client';
import Loading from '../components/Loading';
import PostCardO from '../components/postcard/PostCardO';
import Wrapper from '../assets/wrappers/Histories';
import { FaHistory } from 'react-icons/fa';

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
              <PostCardO
                episodeDuration={history.episode.duration}
                episodeNumber={history.episode.episodeNumber}
                episodeRemuse={Math.floor(history.position)}
                duration={history.post.duration + 'm'}
                episodeCount={history.post.episodeCount}
                imgUrl={history.post.posterVerticalPath}
                title={history.post.title}
                type={history.post.type}
                className='post'
                key={history.post._id}
                onClick={() => {
                  navigate(`/posts/${history.post._id}`);
                }}
              />
            );
          })}
        </div>
      )}
    </Wrapper>
  );
};

export default Histories;
