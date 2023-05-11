import { UserButton } from '@clerk/nextjs';
import React from 'react';

const Header = () => {
  return (
    <>
      <header>
        <UserButton />
      </header>
    </>
  );
};

export default Header;
