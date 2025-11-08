import React, { useEffect, useRef, useState } from 'react';
import Wrapper from '../assets/wrappers/UserCircle';
import { useDispatch, useSelector } from 'react-redux';
import { logoutUser, selectUser } from '../store/slices/authSlice';
import { FaUserCircle, FaHeart, FaHistory } from 'react-icons/fa';
import { MdAdminPanelSettings } from 'react-icons/md';
import { IoMdLogOut } from 'react-icons/io';
import { AppDispatch } from '../store/store';
import { useNavigate } from 'react-router-dom';

interface UserCircleProps {
  className?: string;
}

const UserCircle: React.FC<UserCircleProps> = ({ className }) => {
  const user = useSelector(selectUser);
  const dispatch = useDispatch<AppDispatch>();
  const [userPanel, setUserPanel] = useState(false);
  const panelRef = useRef<HTMLDivElement>(null);
  const navigate = useNavigate();
  const handleClickOutside = (event: MouseEvent) => {
    if (panelRef.current && !panelRef.current.contains(event.target as Node)) {
      setUserPanel(false);
    }
  };
  useEffect(() => {
    if (userPanel) {
      document.addEventListener('mouseup', handleClickOutside);
    } else {
      document.removeEventListener('mouseup', handleClickOutside);
    }
    return () => {
      document.removeEventListener('mouseup', handleClickOutside);
    };
  }, [userPanel]);
  const logout = () => {
    dispatch(logoutUser());
  };
  return (
    <Wrapper className={className} ref={panelRef}>
      <img
        alt='avt'
        src={user?.avtPath || process.env.PUBLIC_URL + '/default_avatar.png'}
        onClick={() => setUserPanel((show) => !show)}
      />
      <div className={userPanel ? 'imagine imagine-show' : 'imagine'}>
        <div className='user-name'>
          <img
            alt='avt'
            src={
              user?.avtPath || process.env.PUBLIC_URL + '/default_avatar.png'
            }
          />
          <span>{user?.name}</span>
        </div>
        <div className='sep' />
        <div className='menu-setting'>
          <div className='menu-item' onClick={() => navigate('/profile')}>
            <FaUserCircle className='icon' />
            <span className='text'>My profile</span>
          </div>
          <div className='menu-item' onClick={() => navigate('/favorites')}>
            <FaHeart className='icon' />
            <span className='text'>My list</span>
          </div>
          <div className='menu-item' onClick={() => navigate('/histories')}>
            <FaHistory className='icon' />
            <span className='text'>History</span>
          </div>
          {user?.role === 'admin' && (
            <div className='menu-item' onClick={() => navigate('/admin/posts')}>
              <MdAdminPanelSettings className='icon' />
              <span className='text'>Admin dashboard</span>
            </div>
          )}
          <div className='menu-item' onClick={logout}>
            <IoMdLogOut className='icon' />
            <span className='text'>Logout</span>
          </div>
        </div>
      </div>
    </Wrapper>
  );
};

export default UserCircle;
