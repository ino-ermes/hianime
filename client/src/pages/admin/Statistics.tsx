import React, { useEffect, useState } from 'react';
import Wrapper from '../../assets/wrappers/Statistics';
import Stats from '../../components/Stats';
import { FaUserFriends, FaPuzzlePiece } from 'react-icons/fa';
import { MdMovie } from 'react-icons/md';
import PieChart from '../../components/PieChart';
import LineChart from '../../components/LineChart';
import Loading from '../../components/Loading';
import { getAuthClient } from '../../api/client';
import BarChart from '../../components/BarChart';

const Statistics: React.FC = () => {
  const [loading, setLoading] = useState(true);

  const [isLineChart, setIsLineChart] = useState(true);

  const [stats, setStats] = useState<{
    count: {
      usersCount: number;
      postsCount: number;
      genresCount: number;
    };
    viewsCountPerType: { name: string; movie: number; tv: number }[];
    postsCountPerGenre: { count: number; genre: string }[];
  }>();

  useEffect(() => {
    const getStats = async () => {
      try {
        const response = await getAuthClient().get('/posts/stats');
        setStats(response.data);
      } catch (err) {}
      setLoading(false);
    };
    getStats();
  }, []);

  if (loading) return <Loading />;

  return (
    <Wrapper>
      <section className='total'>
        <Stats
          icon={FaUserFriends}
          text='Users'
          value={stats?.count.usersCount || 0}
          primaryColor='#ff0000'
          secondaryColor='#fee3e3'
        />
        <Stats
          icon={MdMovie}
          text='Posts'
          value={stats?.count.postsCount || 0}
          primaryColor='var(--primary-500)'
          secondaryColor='#cdecfc'
        />
        <Stats
          icon={FaPuzzlePiece}
          text='Genres'
          value={stats?.count.genresCount || 0}
          primaryColor='#ffdb00'
          secondaryColor='#fdffe2'
        />
      </section>

      <section>
        <p className='chart-title'>Number of posts per genre</p>
        <PieChart data={stats?.postsCountPerGenre || []} />
      </section>

      <section>
        <p className='chart-title'>View count in last six months</p>
        <button
          onClick={() => setIsLineChart((prev) => !prev)}
          className='switch-chart'
        >
          {isLineChart ? 'Bar Chart' : 'Line Chart'}
        </button>
        {isLineChart ? (
          <LineChart
            data={stats?.viewsCountPerType || []}
            meta={[
              { dataKey: 'tv', stroke: '#3aa6b9' },
              { dataKey: 'movie', stroke: '#ffd0d0' },
              { dataKey: 'ova', stroke: '#ff9eaa' },
              { dataKey: 'ona', stroke: '#f9f9e0' },
            ]}
          />
        ) : (
          <BarChart
            data={stats?.viewsCountPerType || []}
            meta={[
              { dataKey: 'tv', stroke: '#3aa6b9' },
              { dataKey: 'movie', stroke: '#ffd0d0' },
              { dataKey: 'ova', stroke: '#ff9eaa' },
              { dataKey: 'ona', stroke: '#f9f9e0' },
            ]}
          />
        )}
      </section>
    </Wrapper>
  );
};

export default Statistics;
