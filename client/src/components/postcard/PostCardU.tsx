import React from 'react';
import Wrapper from '../../assets/wrappers/postcard/PostCardU';
import { FaClosedCaptioning, FaDotCircle } from 'react-icons/fa';

interface PostCardUProps {
  className?: string;
  imgUrl: string;
  title: string;
  episodeCount: number;
  type: string;
  onClick?: (e: React.MouseEvent<HTMLElement>) => void;
}

const PostCardU: React.FC<PostCardUProps> = ({
  className,
  episodeCount,
  imgUrl,
  title,
  type,
  onClick,
}) => {
  return (
    <Wrapper className={className} onClick={onClick}>
      <img src={imgUrl} alt='poster' />
      <div className='info'>
        <div className='title'>{title}</div>
        <span className='meta-info'>
          <span className='count-item'>
            <FaClosedCaptioning className='icon' />
            <span className='text'>{episodeCount}</span>
          </span>
          <FaDotCircle className='sep' />
          <span className='type'>
            {type === 'movie' ? 'Movie' : type.toUpperCase()}
          </span>
        </span>
      </div>
    </Wrapper>
  );
};

export default PostCardU;
