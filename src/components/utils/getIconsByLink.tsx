import { BsGithub } from 'react-icons/bs';
import { RiTwitterFill } from 'react-icons/ri';
import { FaLinkedinIn } from 'react-icons/fa';
import { VscGlobe } from 'react-icons/vsc';
import { IconType } from 'react-icons';

export const getIconByLinkName = (linkName: string): JSX.Element => {
  let IconComponent: IconType;

  switch (linkName) {
    case 'Github':
      IconComponent = BsGithub;
      break;
    case 'Twitter':
      IconComponent = RiTwitterFill;
      break;
    case 'LinkedIn':
      IconComponent = FaLinkedinIn;
      break;
    case 'Website':
      IconComponent = VscGlobe;
      break;
    default:
      return <></>;
  }

  return <IconComponent />;
};
