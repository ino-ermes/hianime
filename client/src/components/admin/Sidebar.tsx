import React from 'react';
import Wrapper from '../../assets/wrappers/admin/Sidebar';
import { NavLink } from 'react-router-dom';
import { MdMovie } from 'react-icons/md';
import { FaPuzzlePiece, FaSimplybuilt, FaUserFriends } from 'react-icons/fa';
import { MdLibraryAdd } from 'react-icons/md';
import { IoStatsChart } from 'react-icons/io5';

interface SidebarProps {
  showSidebar: boolean;
}

const Sidebar: React.FC<SidebarProps> = ({ showSidebar }) => {
  return (
    <Wrapper className={showSidebar ? 'show-sidebar' : ''}>
      <div className='content'>
        <NavLink
          to='posts'
          className={({ isActive }) =>
            isActive ? 'activated nav-link' : 'nav-link'
          }
        >
          <MdMovie className='icon' />
          <span className='text'>Posts</span>
        </NavLink>
        <NavLink
          to='add-post'
          className={({ isActive }) =>
            isActive ? 'activated nav-link' : 'nav-link'
          }
        >
          <MdLibraryAdd className='icon' />
          <span className='text'>Add posts</span>
        </NavLink>
        <NavLink
          to='statistics'
          className={({ isActive }) =>
            isActive ? 'activated nav-link' : 'nav-link'
          }
        >
          <IoStatsChart className='icon' />
          <span className='text'>Statistics</span>
        </NavLink>
        <NavLink
          to='genres'
          className={({ isActive }) =>
            isActive ? 'activated nav-link' : 'nav-link'
          }
        >
          <FaPuzzlePiece className='icon' />
          <span className='text'>Genres</span>
        </NavLink>
        <NavLink
          to='studios'
          className={({ isActive }) =>
            isActive ? 'activated nav-link' : 'nav-link'
          }
        >
          <FaSimplybuilt className='icon' />
          <span className='text'>Studios</span>
        </NavLink>
        <NavLink
          to='users'
          className={({ isActive }) =>
            isActive ? 'activated nav-link' : 'nav-link'
          }
        >
          <FaUserFriends className='icon' />
          <span className='text'>Users</span>
        </NavLink>
      </div>
    </Wrapper>
  );
};

export default Sidebar;
