import React from 'react';
import Hamburger from './components/Hamburger';
import Hero from './components/Hero';
import NavButtons from './components/NavButtons';

const TopSection = () => {
  return (
    <>
      <Hamburger />
      <NavButtons />
      <Hero />
    </>
  );
};

export default TopSection;
