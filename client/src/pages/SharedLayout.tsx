import React, { useState } from 'react';
import NavBar from '../components/Navbar';
import { Outlet } from 'react-router-dom';
import Wrapper from '../assets/wrappers/SharedLayout';
import Footer from '../components/Footer';
import Sidebar from '../components/Sidebar';
import { FaHome, FaClock, FaFilter } from 'react-icons/fa';
import { RiMovie2Fill } from 'react-icons/ri';
import { PiTelevisionFill } from 'react-icons/pi';

const SharedLayout: React.FC = () => {
  const [showSidebar, setShowSidebar] = useState(false);
  const [initalSidebar, setInitalSidebar] = useState(false);

  const handleMenuClicked = (e: React.MouseEvent) => {
    if (!initalSidebar) {
      setInitalSidebar(true);
    }
    setShowSidebar(true);
  };
  return (
    <Wrapper>
      {initalSidebar && (
        <Sidebar
          show={showSidebar}
          setShow={setShowSidebar}
          items={[
            { icon: FaHome, name: 'Home', to: '/home' },
            { icon: FaClock, name: 'Recently', to: '/recently-updated' },
            { icon: PiTelevisionFill, name: 'TV', to: '/tv' },
            { icon: RiMovie2Fill, name: 'Movie', to: '/movie' },
            { icon: FaFilter, name: 'Filter', to: '/filter' },
          ]}
        />
      )}
      <NavBar onMenuClick={handleMenuClicked} />
      <Outlet />
      <Footer />
    </Wrapper>
  );
};

export default SharedLayout;
