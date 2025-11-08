import React from 'react';
import Logo from './Logo';
import Wrapper from '../assets/wrappers/Footer';
import { FaFacebook } from "react-icons/fa";
import { FaGithub } from "react-icons/fa";

const Footer: React.FC = () => {
  return (
    <Wrapper>
      <section className='top'>
        <Logo />
        <div className='sep-ver'/>
        <div className='link-container'>
            <button><FaFacebook /></button>
            <button><FaGithub /></button>
        </div>
      </section>
      <div className='sep-hor'/>
      <section className='bot'>
        <div className='slogan'>In Mio We Trust</div>
      </section>
    </Wrapper>
  );
};

export default Footer;
