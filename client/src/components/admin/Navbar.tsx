import React from 'react';
import Wrapper from '../../assets/wrappers/admin/Navbar';
import UserCircle from '../UserCircle';

interface NavbarProps {}

const Navbar: React.FC<NavbarProps> = () => {
  return (
    <Wrapper>
      <div className='missing-logo'></div>
      <p className='dashboard-title'>Dashboard</p>
      <UserCircle className='user-circle'/>
    </Wrapper>
  );
};

export default Navbar;
