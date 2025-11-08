import { Spin } from 'antd';
import React from 'react';
import { LoadingOutlined } from '@ant-design/icons';

interface LoadingProps {
  style?: React.CSSProperties;
}

const Loading: React.FC<LoadingProps> = ({ style }) => {
  return (
    <Spin
      style={style}
      indicator={
        <LoadingOutlined
          style={{ fontSize: 60, color: 'var(--primary-500)', margin: '20px' }}
          spin
        />
      }
    />
  );
};

export default Loading;
