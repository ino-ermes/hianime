import React from 'react';
import Wrapper from '../../assets/wrappers/postcard/PostCardA';
import {
  FaCalendarTimes,
  FaPlay,
  FaAngleRight,
  FaPlayCircle,
  FaClosedCaptioning,
} from 'react-icons/fa';
import PrimaryButton from '../PrimaryButton';
import { useNavigate } from 'react-router-dom';
import { FaClock } from 'react-icons/fa6';
interface PostCardAProps {
  _id: string;
  title: string;
  description: string;
  type: string;
  duration: number;
  episodeCount: number;
  airedFrom: string;
  $imgUrl: string;
  className?: string;
}

const PostCardA: React.FC<PostCardAProps> = ({
  _id,
  title,
  description,
  type,
  duration,
  episodeCount,
  airedFrom,
  $imgUrl,
  className,
}) => {
  const navigate = useNavigate();
  return (
    <Wrapper {...{ className, $imgUrl }}>
      <div className='shadow'>
        <div className='content'>
          <h1 className='title'>{title}</h1>
          <div className='info'>
            <span className='info-item'>
              <FaPlayCircle className='icon' />
              <span className='text'>
                {type === 'movie' ? 'Movie' : type.toUpperCase()}
              </span>
            </span>
            <span className='info-item'>
              <FaClock className='icon' />
              <span className='text'>{duration + 'm'}</span>
            </span>
            <span className='info-item'>
              <FaCalendarTimes className='icon' />
              <span className='text'>
                {new Date(airedFrom).toLocaleDateString()}
              </span>
            </span>
            <span className='info-item'>
              <FaClosedCaptioning className='icon' />
              <span className='text'>{episodeCount}</span>
            </span>
          </div>
          <div className='nav-container'>
            <PrimaryButton
              startIcon={FaPlay}
              className='nav'
              onClick={() => {
                navigate(`/posts/${_id}/episodes`);
              }}
            >
              Watch now
            </PrimaryButton>
            <PrimaryButton
              endIcon={FaAngleRight}
              className='nav-white nav'
              onClick={() => {
                navigate(`/posts/${_id}`);
              }}
            >
              Details
            </PrimaryButton>
          </div>
          <div className='description'>{description}</div>
        </div>
      </div>
    </Wrapper>
  );
};

export default PostCardA;
