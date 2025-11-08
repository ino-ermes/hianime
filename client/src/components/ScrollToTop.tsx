import React, { ReactElement, useLayoutEffect } from 'react';
import { useLocation } from 'react-router-dom';

interface ScrollToTopProps {
  children: ReactElement;
}

const ScrollToTop: React.FC<ScrollToTopProps> = ({ children }) => {
  const { pathname } = useLocation();
  useLayoutEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return children;
};

export default ScrollToTop;
