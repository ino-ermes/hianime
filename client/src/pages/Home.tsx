import React from 'react';
import Wrapper from '../assets/wrappers/Home';
import RecentlyUpdated from '../components/RecentlyUpdated';
import TopAnime from '../components/TopAnime';
import 'swiper/css';
import Trending from '../components/Trending';


const Home: React.FC = () => {
  return (
    <Wrapper>
      <Trending />
      <div className='combine'>
        <RecentlyUpdated className='recently' />
        <TopAnime className='top-anime' />
      </div>
    </Wrapper>
  );
}

export default Home;
