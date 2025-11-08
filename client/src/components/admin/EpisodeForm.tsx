import React, { useState } from 'react';
import Wrapper from '../../assets/wrappers/admin/EpisodeForm';
import {
  InputNumber,
  Input,
  DatePicker,
  Upload,
  TimePicker,
  Progress,
  Tabs,
} from 'antd';
import { InboxOutlined } from '@ant-design/icons';
import type { UploadFile, UploadProps } from 'antd';
import dayjs from 'dayjs';
import customParseFormat from 'dayjs/plugin/customParseFormat';
import PrimaryButton from '../../components/PrimaryButton';
import { FaCheckDouble } from 'react-icons/fa';
import { FaTimes } from 'react-icons/fa';
import { Episode } from '../../pages/admin/Episodes';
import '@vidstack/react/player/styles/base.css';
import '@vidstack/react/player/styles/plyr/theme.css';
import { MediaPlayer, MediaProvider } from '@vidstack/react';
import {
  PlyrLayout,
  plyrLayoutIcons,
} from '@vidstack/react/player/layouts/plyr';
import {
  formatDateToYMD,
  hmsToSeconds,
  secondsToHMS,
} from '../../utils/convert';
dayjs.extend(customParseFormat);
const dateFormat = 'YYYY/MM/DD';
const timeFormat = 'HH:mm:ss';

const { Dragger } = Upload;

interface EpisodeFormProps {
  episode: Episode;
  onSubmit: (episode: Episode, video?: UploadFile) => void;
  onCancel: () => void;
  progress?: number;
  loading?: boolean;
}

const EpisodeForm: React.FC<EpisodeFormProps> = ({
  episode,
  onCancel,
  onSubmit,
  progress,
  loading,
}) => {
  const [dumpEpisode, setDumpEpisode] = useState<Episode>(episode);
  const [date, setDate] = useState({
    releaseDate: formatDateToYMD(new Date(dumpEpisode.releaseDate)),
    releaseTime: new Date(dumpEpisode.releaseDate).toTimeString(),
  });
  const handleOnChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setDumpEpisode({ ...dumpEpisode, [e.target.id]: e.target.value });
  };
  const [fileList, setFileList] = useState<UploadFile[]>([]);
  const props: UploadProps = {
    name: 'video',
    multiple: false,
    beforeUpload() {
      return false;
    },
    onChange({ file }) {
      if (!file.name) {
        setFileList([]);
      } else if (file.name.endsWith('.mp4') || file.name.endsWith('.mkv')) {
        setFileList([file]);
      }
    },
    onRemove() {
      setFileList([]);
    },
    fileList: fileList,
    accept: '.mp4,.mkv',
    style: {
      color: '#eee',
    },
    disabled: loading,
  };
  return (
    <Wrapper>
      <div className='form-container'>
        <p className='for-what'>
          {episode._id ? 'Edit episode' : 'Add episode'}
        </p>
        <div className='form-row'>
          <label htmlFor='ep-number'>EP Number</label>
          <InputNumber
            value={dumpEpisode.episodeNumber}
            className='input'
            onChange={(episodeNumber) => {
              if (episodeNumber)
                setDumpEpisode({ ...dumpEpisode, episodeNumber });
            }}
            disabled={loading}
          />
        </div>
        <div className='form-row'>
          <label htmlFor='title'>Title</label>
          <Input
            type='text'
            id='title'
            className='input'
            value={dumpEpisode.title}
            onChange={handleOnChange}
            disabled={loading}
          />
        </div>
        <div className='form-row'>
          <label htmlFor='release-date'>Release date</label>
          <DatePicker
            value={dayjs(date.releaseDate, dateFormat)}
            format={dateFormat}
            id='release-date'
            className='input'
            onChange={(_, dateString) => {
              if (typeof dateString === 'string') {
                setDate({ ...date, releaseDate: dateString });
              }
            }}
            disabled={loading}
          />
        </div>
        <div className='form-row'>
          <label htmlFor='release-time'>Release time</label>
          <TimePicker
            value={dayjs(date.releaseTime, timeFormat)}
            format={timeFormat}
            id='release-time'
            className='input'
            onChange={(_, dateString) => {
              if (typeof dateString === 'string') {
                setDate({ ...date, releaseTime: dateString });
              }
            }}
            disabled={loading}
          />
        </div>
        <Tabs
          defaultActiveKey='1'
          items={[
            {
              key: '1',
              label: 'Upload Video',
              children: (
                <Dragger {...props}>
                  <p className='ant-upload-drag-icon'>
                    <InboxOutlined />
                  </p>
                  <p className='ant-upload-text' style={{ color: '#eeeeee' }}>
                    Click or drag file to this area to upload
                  </p>
                  <p className='ant-upload-hint' style={{ color: '#eeeeee' }}>
                    今まで、僕が作り上げてきた魔法、しっかりしてよ
                  </p>
                </Dragger>
              ),
            },
            {
              key: '2',
              label: 'Stream link',
              children: (
                <div>
                  <div className='form-row'>
                    <label htmlFor='path'>Path</label>
                    <Input
                      type='text'
                      id='path'
                      className='input'
                      value={dumpEpisode.path}
                      onChange={handleOnChange}
                      disabled={loading}
                    />
                  </div>
                  <div className='form-row'>
                    <label htmlFor='duration'>Duration</label>
                    <TimePicker
                      value={dayjs(
                        secondsToHMS(dumpEpisode.duration || 0),
                        timeFormat
                      )}
                      format={timeFormat}
                      id='duration'
                      className='input'
                      onChange={(_, dateString) => {
                        if (typeof dateString === 'string') {
                          setDumpEpisode({
                            ...dumpEpisode,
                            duration: hmsToSeconds(dateString),
                          });
                        }
                      }}
                      disabled={loading}
                    />
                  </div>
                </div>
              ),
            },
          ]}
        />
        {progress && (
          <Progress
            percent={progress}
            style={{ width: '100%' }}
            strokeColor='var(--primary-500)'
          />
        )}
        {dumpEpisode.path && (
          <MediaPlayer
            title='Sprite Fight'
            src={dumpEpisode.path}
            style={{ marginTop: '50px' }}
          >
            <MediaProvider />
            <PlyrLayout icons={plyrLayoutIcons} />
          </MediaPlayer>
        )}
        <div className='btn-container'>
          <PrimaryButton
            startIcon={FaCheckDouble}
            onClick={(e: React.MouseEvent) => {
              e.preventDefault();
              onSubmit(
                {
                  ...dumpEpisode,
                  releaseDate: combineDateAndTime(
                    date.releaseDate,
                    date.releaseTime
                  ),
                },
                fileList.length === 1 ? fileList[0] : undefined
              );
            }}
            disabled={loading}
          >
            {episode._id ? 'Update' : 'Add'}
          </PrimaryButton>
          <PrimaryButton
            startIcon={FaTimes}
            className='btn-cancel'
            onClick={onCancel}
            disabled={loading}
          >
            Cancel
          </PrimaryButton>
        </div>
      </div>
    </Wrapper>
  );
};

export default EpisodeForm;

function combineDateAndTime(dateStr: string, timeStr: string) {
  const date = new Date(dateStr);
  const timeParts = timeStr.split(':');

  date.setHours(parseInt(timeParts[0], 10));
  date.setMinutes(parseInt(timeParts[1], 10));
  if (timeParts.length === 3) {
    date.setSeconds(parseInt(timeParts[2], 10));
  } else {
    date.setSeconds(0);
  }

  return date.toISOString();
}
