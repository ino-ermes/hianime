import React from 'react';
import Wrapper from '../assets/wrappers/Sidebar';
import { FaChevronLeft } from 'react-icons/fa';
import Logo from './Logo';
import { NavLink } from 'react-router-dom';
import { IconType } from 'react-icons';

interface SidebarProps {
  show: boolean;
  setShow: (show: boolean) => void;
  items: {
    to: string;
    icon: IconType;
    name: string;
  }[];
}

const Sidebar: React.FC<SidebarProps> = ({ show, setShow, items }) => {
  const onWhiteSpaceClick = (e: React.MouseEvent<HTMLElement>) => {
    if (e.currentTarget !== e.target) return;
    setShow(false);
  };
  return (
    <Wrapper className={show ? 'show' : 'hide'} onClick={onWhiteSpaceClick}>
      <div className='side-bar'>
        <header>
          <Logo />
          <div className='menu' onClick={() => setShow(false)}>
            <FaChevronLeft />
          </div>
        </header>
        <div className='hor-sep' />
        <div className='content'>
          {items.map((value, index) => {
            return (
              <NavLink
                key={index}
                to={value.to}
                className={({ isActive }) =>
                  isActive ? 'activated nav-item' : 'nav-item'
                }
              >
                <value.icon className='icon' />
                <span>{value.name}</span>
              </NavLink>
            );
          })}
        </div>
      </div>
    </Wrapper>
  );
};

export default Sidebar;
