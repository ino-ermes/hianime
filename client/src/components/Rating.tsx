import React, { useEffect, useState } from 'react';
import Wrapper from '../assets/wrappers/Rating';
import { FaStar } from 'react-icons/fa';
import { FaFaceGrinStars, FaFaceGrimace, FaFaceGrin } from 'react-icons/fa6';
import { useParams } from 'react-router-dom';
import { getAuthClient } from '../api/client';
import { useSelector } from 'react-redux';
import { selectUser } from '../store/slices/authSlice';

interface RatingProps {
  className?: string;
}

const Rating: React.FC<RatingProps> = ({ className }) => {
  const { postId } = useParams();
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState({
    averageRating: 0,
    myRating: 'none',
  });
  const user = useSelector(selectUser);

  const getAverageRating = async () => {
    setLoading(true);
    const response = await getAuthClient().get(`/ratings?post=${postId}`);
    const { averageRating, myRating } = response.data;
    setData({ averageRating, myRating });
    setLoading(false);
  };

  const rate = async (rateOpton: string) => {
    if (!user) return;
    setLoading(true);
    await getAuthClient().post(`/ratings?post=${postId}`, {
      rate: rateOpton,
    });
    await getAverageRating();
    setLoading(false);
  };

  useEffect(() => {
    getAverageRating();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <Wrapper className={className}>
      <section className='score-info'>
        <div className='score'>
          <FaStar className='star' />
          <span>{data.averageRating}</span>
        </div>
        <p>Vote now</p>
      </section>
      <section className='quote'>What do you think about this anime?</section>
      <div className='btn-container'>
        <button
          className={data.myRating === 'boring' ? 'btn activated' : 'btn'}
          disabled={loading}
          onClick={() => rate('boring')}
        >
          <FaFaceGrimace className='icon' />
          <span>Boring</span>
        </button>
        <button
          className={data.myRating === 'good' ? 'btn activated' : 'btn'}
          disabled={loading}
          onClick={() => rate('good')}
        >
          <FaFaceGrin className='icon' />
          <span>Good</span>
        </button>
        <button
          className={data.myRating === 'great' ? 'btn activated' : 'btn'}
          disabled={loading}
          onClick={() => rate('great')}
        >
          <FaFaceGrinStars className='icon' />
          <span>Great</span>
        </button>
      </div>
    </Wrapper>
  );
};

export default Rating;
