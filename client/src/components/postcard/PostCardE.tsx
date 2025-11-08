import { ReactElement } from 'react';
import Wrapper from '../../assets/wrappers/postcard/PostCardE';
import { FaCircleInfo } from 'react-icons/fa6';
import { FaClosedCaptioning, FaDotCircle } from 'react-icons/fa';

interface PostCardEProps {
  title: string | ReactElement;
  imgUrl: string;
  episodeCount: number | string;
  className?: string;
  type: string;
  duration: string;
  onClick?: (e: React.MouseEvent<HTMLElement>) => void;
}

const PostCardE: React.FC<PostCardEProps> = ({
  title,
  className,
  imgUrl,
  episodeCount,
  type,
  duration,
  onClick,
}) => {
  return (
    <Wrapper className={className}>
      <div className='poster' onClick={onClick}>
        <img src={imgUrl} alt='poster' />
        <FaCircleInfo className='play-icon' />
        <div className='count'>
          <span className='item'>
            <FaClosedCaptioning className='icon' />
            <span className='text'>{episodeCount}</span>
          </span>
        </div>
      </div>
      <p className='title' onClick={onClick}>
        {title}
      </p>
      <p className='meta-info'>
        {type === 'movie' ? 'Movie' : type.toUpperCase()}
        <FaDotCircle className='sep' />
        {duration + 'm'}
      </p>
    </Wrapper>
  );
};

export default PostCardE;
