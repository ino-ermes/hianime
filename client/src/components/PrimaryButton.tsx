import { IconType } from 'react-icons';
import Wrapper from '../assets/wrappers/PrimaryButton';
import React from 'react';

interface PrimaryButtonProps {
  startIcon?: IconType;
  endIcon?: IconType;
  children?: string | number;
  className?: string;
  disabled?: boolean;
  onClick?: (e: React.MouseEvent<HTMLElement>) => void;
  type?: 'button' | 'submit' | 'reset';
}

const PrimaryButton: React.FC<PrimaryButtonProps> = (props) => {
  const { className, disabled, onClick, type } = props;
  return (
    <Wrapper {...{ disabled, className, onClick, type }}>
      {props.startIcon && <props.startIcon className='btn__start-icon' />}
      <span className='btn__text'>{props.children}</span>
      {props.endIcon && <props.endIcon className='btn__end-icon' />}
    </Wrapper>
  );
};

export default PrimaryButton;
