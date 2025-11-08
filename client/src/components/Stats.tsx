import React from 'react';
import Wrapper from '../assets/wrappers/Stats';
import { IconType } from 'react-icons';

interface StatsProps {
  value: number;
  icon: IconType;
  text: string;
  primaryColor: string;
  secondaryColor: string;
}

const Stats: React.FC<StatsProps> = (props) => {
  return (
    <Wrapper style={{ borderBottomColor: props.primaryColor }}>
      <div className='static' style={{ color: props.primaryColor }}>
        <span className='num'>{props.value}</span>
        <span
          className='icon'
          style={{ backgroundColor: props.secondaryColor }}
        >
          <props.icon />
        </span>
      </div>
      <p className='des'>{props.text}</p>
    </Wrapper>
  );
};

export default Stats;
