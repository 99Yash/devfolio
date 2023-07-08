import { useAppSelector } from '@/hooks/redux';
import { ACCENT_COLOR } from '@/styles/styles';
import { Code, Flex } from '@chakra-ui/react';

import Link from 'next/link';

const NavButtons = () => {
  const localUserState = useAppSelector((state) => state.currentUser.user);
  const localProjectsState = useAppSelector((state) => state.projects.projects);
  const localExperiencesState = useAppSelector(
    (state) => state.experiences.experiences
  );
  const localTechStack = useAppSelector((state) => state.techStack.techStack);
  return (
    <Flex
      display={{
        base: 'none',
        md: 'flex',
        lg: 'flex',
        xl: 'flex',
        sm: 'none',
      }}
      pt={8}
      px={8}
      gap={8}
      justifyContent={'end'}
    >
      {localUserState?.about && localUserState.about !== '' ? (
        <Link href="#about">
          <Code
            fontSize={'md'}
            bgClip={'text'}
            bgGradient={`linear(to-r, #ddd, ${ACCENT_COLOR})`}
          >
            About
          </Code>
        </Link>
      ) : null}
      {localTechStack && localTechStack?.length !== 0 ? (
        <Link href="#tech">
          <Code
            fontSize={'md'}
            bgClip={'text'}
            bgGradient={`linear(to-r, #ddd, ${ACCENT_COLOR})`}
          >
            Tech Stack
          </Code>
        </Link>
      ) : null}
      {localExperiencesState?.length !== 0 ? (
        <Link href="#experience">
          <Code
            fontSize={'md'}
            bgClip={'text'}
            bgGradient={`linear(to-r, #ddd, ${ACCENT_COLOR})`}
          >
            Experiences
          </Code>
        </Link>
      ) : null}
      {localProjectsState?.length !== 0 ? (
        <Link href="#projects">
          <Code
            fontSize={'md'}
            bgClip={'text'}
            bgGradient={`linear(to-r, #ddd, ${ACCENT_COLOR})`}
          >
            Projects
          </Code>
        </Link>
      ) : null}
    </Flex>
  );
};

export default NavButtons;
