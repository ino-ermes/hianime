import React from 'react';
import Wrapper from '../assets/wrappers/HeadNav';
import { FaCreativeCommonsSampling, FaMapSigns } from 'react-icons/fa';
import { Link } from 'react-router-dom';

interface HeadNavProps {
  navs: {
    name: string;
    to?: string;
  }[];
  className?: string;
}

const HeadNav: React.FC<HeadNavProps> = ({ navs, className }) => {
  return (
    <Wrapper className={className}>
      <FaMapSigns />
      {navs.map((value, index) => (
        <React.Fragment key={index}>
          {value.to ? (
            <>
              <Link to={value.to} className='link'>
                {value.name}
              </Link>
              <FaCreativeCommonsSampling />
            </>
          ) : (
            <span className='text'>{value.name}</span>
          )}
        </React.Fragment>
      ))}
    </Wrapper>
  );
};

export default HeadNav;
