import React from 'react';
import { BsGithub } from 'react-icons/bs';
import { RiTwitterFill } from 'react-icons/ri';
import { FaLinkedinIn } from 'react-icons/fa';
import { VscGlobe } from 'react-icons/vsc';
import { IconType } from 'react-icons';
import { ReactNode } from 'react';

export const getIconByLinkName = (linkName: string): ReactNode => {
  let icon: IconType;

  switch (linkName) {
    case 'Github':
      icon = BsGithub;
      break;
    case 'Twitter':
      icon = RiTwitterFill;
      break;
    case 'LinkedIn':
      icon = FaLinkedinIn;
      break;
    case 'Website':
      icon = VscGlobe;
      break;
    default:
      return null;
  }

  return <>{React.createElement(icon)}</>;
};
