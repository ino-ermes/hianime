import { ReactElement } from 'react';
import Wrapper from '../../assets/wrappers/postcard/PostCardO';
import { FaPlay, FaClosedCaptioning } from 'react-icons/fa';
import { GoDotFill } from 'react-icons/go';
import { secondToShortHSM } from '../../utils/convert';

interface PostCardOProps {
  title: string | ReactElement;
  imgUrl: string;
  episodeCount: number;
  className?: string;
  type: string;
  duration: number;
  episodeDuration: number;
  episodeRemuse: number;
  episodeNumber: number;
  onClick?: (e: React.MouseEvent<HTMLElement>) => void;
}

const PostCardO: React.FC<PostCardOProps> = ({
  title,
  className,
  imgUrl,
  episodeCount,
  type,
  duration,
  episodeNumber,
  episodeDuration,
  episodeRemuse,
  onClick,
}) => {
  return (
    <Wrapper className={className}>
      <div className='poster' onClick={onClick}>
        <img src={imgUrl} alt='poster' />
        <FaPlay className='play-icon' />
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
        <GoDotFill className='sep' />
        {duration + 'm'}
      </p>
      <div className='duration'>
        <div className='ep-info'>
          <span>{'EP ' + episodeNumber}</span>
          <span>
            {secondToShortHSM(Math.floor(episodeRemuse)) +
              ' / ' +
              secondToShortHSM(Math.ceil(episodeDuration))}
          </span>
        </div>
        <div className='bgr'>
          <div
            className='remuse-position'
            style={{
              width: Math.floor((episodeRemuse * 100) / episodeDuration) + '%',
            }}
          />
        </div>
      </div>
    </Wrapper>
  );
};

export default PostCardO;
