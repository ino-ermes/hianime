import React, { useEffect, useMemo, useRef, useState } from 'react';
import Wrapper from '../../assets/wrappers/PostMain';
import EpisodeList from '../../components/EpisodeList';
import PlayerNav from '../../components/PlayerNav';
import { GoDotFill } from 'react-icons/go';
import RatingContainer from '../../components/RatingContainer';
import {
  Navigate,
  useNavigate,
  useParams,
  useSearchParams,
} from 'react-router-dom';
import { client, getAuthClient } from '../../api/client';
import '@vidstack/react/player/styles/default/theme.css';
import '@vidstack/react/player/styles/default/layouts/video.css';
import {
  MediaPlayer,
  MediaProvider,
  type MediaTimeUpdateEventDetail,
  type MediaPlayerInstance,
} from '@vidstack/react';
import {
  defaultLayoutIcons,
  DefaultVideoLayout,
} from '@vidstack/react/player/layouts/default';
import { useSelector } from 'react-redux';
import { selectSetting, selectUser } from '../../store/slices/authSlice';
import CommentSection from '../../components/CommentSection';
import { message } from 'antd';
import { AxiosError } from 'axios';

interface Episode {
  _id: string;
  index: number;
  episodeNumber: number;
  title: string;
  path: string;
  duration: string;
  releaseDate: string;
}

const PostMain: React.FC = () => {
  const navigate = useNavigate();

  const { postId } = useParams();
  const [searchParams, setSearchParams] = useSearchParams();
  const episode = searchParams.get('episode');

  const [ads, setAds] = useState(false);

  const user = useSelector(selectUser);
  const { autoNext, autoPlay } = useSelector(selectSetting);

  const [episodes, setEpisodes] = useState<Episode[]>([]);
  const [loading, setLoading] = useState(true);

  const episodeIndex = episodes.findIndex((e) => e._id === episode);

  const [iniPos, setIniPos] = useState<number>();

  const [curAdsTime, setCurAdsTime] = useState(5);

  useEffect(() => {
    const getEpisodes = async () => {
      setLoading(true);

      try {
        const response = await client.get(`/episodes/watch?post=${postId}`);
        const { episodes } = response.data;
        setEpisodes(episodes);
        if (user) {
          try {
            const response = await getAuthClient().get(
              `/histories?post=${postId}`
            );
            const { history } = response.data;
            if (history) {
              const { episode: ep, position } = history;
              if (episode === ep) setIniPos(position);
              if (!episode) {
                setSearchParams({
                  episode: ep,
                });
                setIniPos(position);
              }
            } else if (!episode) {
              if (episodes.length > 0) {
                setSearchParams({
                  episode: episodes[0]._id,
                });
              }
            }
          } catch (err) {
            message.error(
              ((err as AxiosError).response?.data as any)?.msg || 'unknow error'
            );
          }
        } else if (!episode) {
          if (episodes.length > 0) {
            setSearchParams({
              episode: episodes[0]._id,
            });
          }
        }
      } catch (err) {
        console.log(err);
        message.error(
          ((err as AxiosError).response?.data as any)?.msg || 'unknow error'
        );
        navigate('/home');
      }

      setLoading(false);
    };
    getEpisodes();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [postId]);

  const updateHistory = () => {
    let timeOutId: ReturnType<typeof setTimeout>;
    let position = iniPos || 0;
    return (e: MediaTimeUpdateEventDetail) => {
      if (Math.abs(e.currentTime - position) > 10) {
        clearTimeout(timeOutId);
        position = e.currentTime;
        timeOutId = setTimeout(async () => {
          try {
            await getAuthClient().post(`/histories?post=${postId}`, {
              episode: episode,
              position: position,
            });
          } catch (err) {
            message.error(
              ((err as AxiosError).response?.data as any)?.msg || 'unknow error'
            );
          }
        }, 3000);
      }
    };
  };

  const handleTimeUpdate = useMemo(
    () => (user && episode ? updateHistory() : undefined),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [user, episode]
  );

  const increasView = async () => {
    try {
      await client.post(`/posts/${postId}/watch`);
    } catch (err) {
      message.error(
        ((err as AxiosError).response?.data as any)?.msg || 'unknow error'
      );
    }
  };

  const handleVideoStarted = () => {
    playerRef.current!.pause();
    setAds(true);
    increasView();
  };

  const playerRef = useRef<MediaPlayerInstance>(null);
  const adsRef = useRef<MediaPlayerInstance>(null);

  const handleVideoLoaded = () => {
    if (iniPos) {
      playerRef.current!.currentTime = iniPos;
    }
  };

  const handleVideoEnded = () => {
    setAds(false);
    if (!autoNext) return;
    if (episodeIndex < episodes.length - 1) {
      setIniPos(undefined);
      setSearchParams({
        episode: episodes[episodeIndex + 1]._id,
      });
    }
  };

  const handleChangeEpisode = (episodeId: string) => {
    if (episode === episodeId) return;

    setAds(false);
    setIniPos(undefined);
    setSearchParams({
      episode: episodeId,
    });
  };

  const handleNextEpisode = () => {
    setAds(false);
    setIniPos(undefined);
    setSearchParams({
      episode: episodes[episodeIndex + 1]._id,
    });
  };

  const handlePrevEpisode = () => {
    setAds(false);
    setIniPos(undefined);
    setSearchParams({
      episode: episodes[episodeIndex - 1]._id,
    });
  };

  const handleSkipAds = () => {
    setAds(false);
    playerRef.current!.play();
    setCurAdsTime(5);
  };

  const handleAdsTimeUpdate = (e: MediaTimeUpdateEventDetail) => {
    setCurAdsTime(Math.max(Math.ceil(5 - e.currentTime), 0));
  };

  if (!loading && (episodes.length === 0 || episodeIndex === -1)) {
    return <Navigate to='/home' />;
  }

  return (
    <Wrapper>
      <div className='main'>
        <p className='nav'>
          <span>Home</span>
          <GoDotFill className='sep-dot' />
          <span>TV</span>
          <GoDotFill className='sep-dot' />
          <span>Kore kara watashi tachi ha</span>
        </p>
        <section className='watch'>
          <EpisodeList
            className='episode-list'
            curEpisodeId={episode!}
            episodes={episodes}
            onChangeEpisode={handleChangeEpisode}
          />
          <div className='what-do-we-do'>
            {!episodes[episodeIndex] ? (
              <div className='frame' />
            ) : (
              <>
                <MediaPlayer
                  title={episodes[episodeIndex].title}
                  src={episodes[episodeIndex].path}
                  key={episodes[episodeIndex]._id}
                  ref={playerRef}
                  className='player'
                  onStarted={handleVideoStarted}
                  onLoadedMetadata={handleVideoLoaded}
                  autoPlay={autoPlay}
                  onTimeUpdate={handleTimeUpdate}
                  onEnded={handleVideoEnded}
                >
                  <MediaProvider />
                  <DefaultVideoLayout icons={defaultLayoutIcons} />
                </MediaPlayer>
                {ads && (
                  <aside className='ads'>
                    <MediaPlayer
                      title='Ads'
                      src='/public/6731abeae1dcbbba82f97032-1731308522697/master.m3u8'
                      key='ads'
                      className='player'
                      ref={adsRef}
                      onEnded={handleSkipAds}
                      onTimeUpdate={handleAdsTimeUpdate}
                      autoPlay
                    >
                      <MediaProvider />
                    </MediaPlayer>
                    <DelayedButton
                      onClick={handleSkipAds}
                      curAdsTime={curAdsTime}
                    />
                  </aside>
                )}
              </>
            )}
            <PlayerNav
              disabledNext={episodeIndex >= episodes.length - 1}
              disabledPrev={episodeIndex <= 0}
              onNextClicked={handleNextEpisode}
              onPrevClicked={handlePrevEpisode}
            />
          </div>
        </section>
        <RatingContainer />
      </div>
      <CommentSection key={searchParams.get('episode')} />
    </Wrapper>
  );
};

interface DelayedButtonProps {
  onClick: () => void;
  curAdsTime: number;
}

const DelayedButton: React.FC<DelayedButtonProps> = ({
  onClick,
  curAdsTime,
}) => {
  const isEnabled = curAdsTime === 0;

  return (
    <button onClick={onClick} disabled={!isEnabled} className='delayed-btn'>
      {isEnabled ? 'Skip' : `Wait ${curAdsTime} seconds`}
    </button>
  );
};

export default PostMain;
