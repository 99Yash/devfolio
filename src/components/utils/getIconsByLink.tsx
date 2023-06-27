import { FiGithub } from 'react-icons/fi';
import { FiTwitter } from 'react-icons/fi';
import { FiLinkedin } from 'react-icons/fi';
import { BsGlobeAmericas } from 'react-icons/bs';
import { IconType } from 'react-icons';

export const getIconByLinkName = (linkName: string): JSX.Element => {
  let IconComponent: IconType;

  switch (linkName) {
    case 'Github':
      IconComponent = FiGithub;
      break;
    case 'Twitter':
      IconComponent = FiTwitter;
      break;
    case 'LinkedIn':
      IconComponent = FiLinkedin;
      break;
    case 'Website':
      IconComponent = BsGlobeAmericas;
      break;
    default:
      return <></>;
  }

  return <IconComponent />;
};
