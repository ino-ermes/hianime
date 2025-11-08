import React, { useEffect, useState } from 'react';
import Wrapper from '../../assets/wrappers/admin/Episodes';
import HeadNav from '../../components/HeadNav';
import Table from '../../components/Table';
import PrimaryButton from '../../components/PrimaryButton';
import { FaEdit, FaPlus, FaTrash } from 'react-icons/fa';
import Modal from '../../components/Modal';
import EpisodeForm from '../../components/admin/EpisodeForm';
import ConfirmForm from '../../components/ConfirmForm';
import dayjs from 'dayjs';
import customParseFormat from 'dayjs/plugin/customParseFormat';
import { GetProp, UploadProps, UploadFile, message } from 'antd';
import { getAuthClient } from '../../api/client';
import { useParams } from 'react-router-dom';
import { AxiosError, AxiosResponse } from 'axios';
import Loading from '../../components/Loading';
import { secondsToHMS } from '../../utils/convert';
import { socket } from '../../utils/socket';
dayjs.extend(customParseFormat);

export type Episode = {
  _id?: string;
  post?: string;
  index?: number;
  episodeNumber?: number;
  title?: string;
  duration?: number;
  releaseDate: string;
  path?: string;
  rendering?: boolean;
};

const getInitialEpisode = (): Episode => {
  return {
    _id: undefined,
    post: undefined,
    index: undefined,
    episodeNumber: undefined,
    title: undefined,
    duration: undefined,
    releaseDate: new Date().toISOString(),
    path: undefined,
  };
};

type FileType = Parameters<GetProp<UploadProps, 'beforeUpload'>>[0];

const Episodes: React.FC = () => {
  const [status, setStatus] = useState<
    'idle' | 'loading' | 'succeeded' | 'failed'
  >('idle');
  const [formLoading, setFormLoading] = useState(false);
  const [progress, setProgress] = useState<number>();

  const { postId } = useParams();

  const [episodes, setEpisodes] = useState<Episode[]>([]);
  const [action, setAction] = useState<{
    action: 'add' | 'update' | 'delete' | 'none';
    episode: Episode;
  }>({
    action: 'none',
    episode: getInitialEpisode(),
  });

  const resetAction = () => {
    setAction({ action: 'none', episode: getInitialEpisode() });
  };

  const onButtonAdd = () => {
    setAction({ action: 'add', episode: getInitialEpisode() });
  };

  const onTableDelete = (episode: Episode) => {
    setAction({ action: 'delete', episode });
  };

  const onTableUpdate = (episode: Episode) => {
    setAction({ action: 'update', episode });
  };

  const onSubmit = async (episode: Episode, video?: UploadFile) => {
    if (action.action === 'update') {
      setFormLoading(true);
      try {
        const formData = new FormData();

        (Object.keys(episode) as (keyof Episode)[]).forEach((key) => {
          if (episode[key]) {
            formData.append(key, episode[key] as string);
          }
        });
        let response: AxiosResponse<any, any>;
        if (video) {
          formData.append('video', video as FileType);
          response = await getAuthClient().put(
            `/episodes/${episode._id}`,
            formData,
            {
              headers: {
                'Content-Type': 'multipart/form-data',
              },
              onUploadProgress(progressEvent) {
                const totalLength = progressEvent.total;
                if (totalLength) {
                  setProgress(
                    Math.round((progressEvent.loaded * 100) / totalLength)
                  );
                }
              },
            }
          );
        } else {
          response = await getAuthClient().put(
            `/episodes/${episode._id}`,
            formData
          );
        }

        const updatedEpisode = response.data.episode;

        setEpisodes([
          ...episodes.map((episode) => {
            if (episode._id === updatedEpisode._id) {
              return {
                ...updatedEpisode,
                releaseDate: new Date(
                  updatedEpisode.releaseDate
                ).toLocaleString(),
              };
            } else {
              return episode;
            }
          }),
        ]);
        resetAction();
        message.success('to live a better life');
      } catch (err) {
        const error = err as AxiosError;
        message.error((error.response?.data as any).msg);
      }
      setFormLoading(false);
    } else if (action.action === 'add') {
      setFormLoading(true);
      if (!video && (!episode.duration || !episode.path)) {
        message.error('Please provide video');
        return;
      }
      try {
        const formData = new FormData();
        episode.post = postId;
        if (episodes.length !== 0) {
          episode.index = episodes[episodes.length - 1].index! + 10;
        } else {
          episode.index = 0;
        }
        (Object.keys(episode) as (keyof Episode)[]).forEach((key) => {
          if (episode[key] !== undefined) {
            formData.append(key, String(episode[key]));
          }
        });

        let response: AxiosResponse;

        formData.append('video', video as FileType);

        if (video) {
          response = await getAuthClient().post('/episodes', formData, {
            headers: {
              'Content-Type': 'multipart/form-data',
            },
            onUploadProgress(progressEvent) {
              const totalLength = progressEvent.total;
              if (totalLength) {
                setProgress(
                  Math.round((progressEvent.loaded * 100) / totalLength)
                );
              }
            },
          });
        } else {
          response = await getAuthClient().post('/episodes', formData);
        }

        setEpisodes([
          ...episodes,
          {
            ...response.data.episode,
            releaseDate: new Date(
              response.data.episode.releaseDate
            ).toLocaleString(),
          },
        ]);
        resetAction();
        message.success('to live a better life');
      } catch (err) {
        const error = err as AxiosError;
        message.error((error.response?.data as any).msg);
      }
      setFormLoading(false);
    } else if (action.action === 'delete') {
      setFormLoading(true);
      try {
        const response = await getAuthClient().delete(
          `/episodes/${episode._id}`
        );
        setEpisodes(episodes.filter((value) => value._id !== episode._id));
        message.success(response.data.msg);
        resetAction();
      } catch (err) {
        const error = err as AxiosError;
        message.error((error.response?.data as any).msg);
      }
      setFormLoading(false);
    }
    setProgress(undefined);
  };

  const showForm = action.action !== 'none';

  const loading = status === 'idle' || status === 'loading';

  useEffect(() => {
    if (status === 'idle') {
      const getAllEpisodes = async () => {
        try {
          setStatus('loading');
          const response = await getAuthClient().get(
            `/episodes?post=${postId}`
          );

          setEpisodes(
            (response.data.episodes as Array<Episode>).map((value) => {
              return {
                ...value,
                releaseDate: new Date(value.releaseDate).toLocaleString(),
              };
            })
          );
          setStatus('succeeded');
        } catch (err) {
          setStatus('failed');
          const error = err as AxiosError;
          message.error((error.response?.data as any).msg);
        }
      };
      getAllEpisodes();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    socket.on('rendered', (episodeId, path) => {
      setEpisodes((prevEpisodes) =>
        prevEpisodes.map((episode) => {
          if (episodeId !== episode._id) return episode;

          return { ...episode, rendering: false, path };
        })
      );
    });

    return () => {
      socket.off('rendered');
    };
  }, []);

  return (
    <Wrapper>
      <HeadNav
        navs={[
          { name: 'Posts', to: '/admin/posts' },
          { name: 'Post', to: `/admin/posts/${postId}` },
          { name: 'Episodes' },
        ]}
      />
      {showForm && (
        <Modal onClickOutside={() => {}}>
          {action.action === 'delete' ? (
            <ConfirmForm
              description="You're going to delete one episode. Are you sure"
              disabled={formLoading}
              message='Deleting a episode'
              onCancel={resetAction}
              onConfirm={() => onSubmit(action.episode)}
            />
          ) : (
            <EpisodeForm
              episode={action.episode}
              onSubmit={onSubmit}
              onCancel={resetAction}
              progress={progress}
              loading={formLoading}
            />
          )}
        </Modal>
      )}
      <div className='card-container'>
        {loading ? (
          <Loading />
        ) : (
          <>
            <div className='btn-container'>
              <PrimaryButton startIcon={FaPlus} onClick={onButtonAdd}>
                New episode
              </PrimaryButton>
            </div>
            <Table
              data={episodes}
              fields={[
                {
                  key: 'episodeNumber',
                  title: 'EP Number',
                },
                {
                  key: 'title',
                  title: 'Title',
                },
                {
                  key: 'duration',
                  title: 'Duration',
                  map: secondsToHMS,
                },
                {
                  key: 'releaseDate',
                  title: 'Release Date',
                },
              ]}
              changeAction={(episode) => episode.rendering}
              actions={[
                {
                  icon: FaEdit,
                  name: 'Edit',
                  onClick: onTableUpdate,
                },
                'sep',
                {
                  icon: FaTrash,
                  name: 'Delete',
                  onClick: onTableDelete,
                },
              ]}
            />
          </>
        )}
      </div>
    </Wrapper>
  );
};

export default Episodes;
