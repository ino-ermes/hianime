import React, { useEffect } from 'react';
import Wrapper from '../assets/wrappers/Modal';

interface ModalProps {
  children: any;
  onClickOutside: () => void;
}

const Modal: React.FC<ModalProps> = ({ children, onClickOutside }) => {
  const onClickExceptChild = (e: React.MouseEvent) => {
    if (e.currentTarget !== e.target) return;
    onClickOutside();
  };
  useEffect(() => {
    document.body.style.overflowY = 'hidden';
    return () => {
      document.body.style.overflowY = 'scroll';
    };
  });

  return <Wrapper onMouseDown={onClickExceptChild}>{children}</Wrapper>;
};

export default Modal;
