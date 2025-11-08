import React, { useEffect, useRef, useState } from 'react';
import Wrapper from '../assets/wrappers/Trending';
import { FaAngleLeft, FaAngleRight } from 'react-icons/fa';
import { Swiper, SwiperClass, SwiperSlide } from 'swiper/react';
import PostCardA from '../components/postcard/PostCardA';
import Loading from './Loading';
import { client } from '../api/client';

interface Post {
  _id: string;
  title: string;
  posterHorizonPath: string;
  type: string;
  description: string;
  duration: number;
  episodeCount: number;
  totalViews: number;
  airedFrom: string;
}

const Trending: React.FC = () => {
  const swiperRef = useRef<SwiperClass>();

  const [status, setStatus] = useState<
    'idle' | 'loading' | 'succeeded' | 'failed'
  >('idle');

  const loading = status === 'idle' || status === 'loading';

  const [posts, setPosts] = useState<Post[]>([]);

  useEffect(() => {
    if (status === 'idle') {
      const getTrendingPosts = async () => {
        setStatus('loading');
        try {
          const response = await client.get(
            '/posts/top?ago=30&description=true&posterHorizonPath=true'
          );
          setPosts(response.data.posts);
          setStatus('succeeded');
        } catch (err) {
          setStatus('failed');
        }
      };
      getTrendingPosts();
    }
  }, [status]);

  return (
    <Wrapper>
      {loading ? (
        <Loading
          style={{
            height: '550px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        />
      ) : status === 'failed' ? (
        <div className='err'>
          <p className='err-msg'>Can't get trending posts, try again later</p>
        </div>
      ) : (
        <Swiper
          onSwiper={(swiper: SwiperClass) => {
            swiperRef.current = swiper;
          }}
          loop={true}
          className='swiper'
        >
          {posts.map((post) => {
            return (
              <SwiperSlide key={post._id}>
                <PostCardA
                  _id={post._id}
                  title={post.title}
                  description={post.description}
                  type={post.type}
                  duration={post.duration}
                  airedFrom={post.airedFrom}
                  episodeCount={post.episodeCount}
                  $imgUrl={post.posterHorizonPath}
                />
              </SwiperSlide>
            );
          })}
          <div className='btn-container'>
            <button
              onClick={() => swiperRef.current!.slidePrev()}
              className='btn'
            >
              <FaAngleLeft />
            </button>
            <button
              onClick={() => swiperRef.current!.slideNext()}
              className='btn'
            >
              <FaAngleRight />
            </button>
          </div>
        </Swiper>
      )}
    </Wrapper>
  );
};

export default Trending;
