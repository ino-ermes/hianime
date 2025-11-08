import React, { useState } from 'react';
import { Outlet, useNavigate } from 'react-router-dom';
import Wrapper from '../../assets/wrappers/admin/SharedLayout';
import Sidebar from '../../components/admin/Sidebar';
import Navbar from '../../components/admin/Navbar';
import Logo from '../../components/Logo';
import { FaBars, FaCaretLeft } from 'react-icons/fa';

const SharedLayout: React.FC = () => {
  const [showSidebar, setShowSidebar] = useState(false);
  const navigate = useNavigate();
  return (
    <Wrapper>
      <main className='dashboard'>
        <div className='toggle-sidebar'>
          <div
            className={showSidebar ? 'toggle-btn hide' : 'toggle-btn'}
            onClick={() => setShowSidebar(true)}
          >
            <FaBars />
          </div>
          <Logo onClick={() => navigate('/home')} />
          <div
            className={showSidebar ? 'toggle-btn' : 'toggle-btn hide'}
            onClick={() => setShowSidebar(false)}
          >
            <FaCaretLeft />
          </div>
        </div>
        <Sidebar showSidebar={showSidebar} />
        <div className='dashboard-main'>
          <Navbar />
          <div className='dashboard-page'>
            <Outlet />
          </div>
        </div>
      </main>
    </Wrapper>
  );
};

export default SharedLayout;
