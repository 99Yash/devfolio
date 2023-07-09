import { useAppSelector } from '@/hooks/redux';
import {
  Button,
  Code,
  Drawer,
  DrawerBody,
  DrawerCloseButton,
  DrawerContent,
  DrawerOverlay,
  Flex,
  VStack,
  useDisclosure,
} from '@chakra-ui/react';

import Link from 'next/link';
import { FaBars } from 'react-icons/fa';

const Hamburger = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const localUserState = useAppSelector((state) => state.currentUser.user);
  const localProjectsState = useAppSelector((state) => state.projects.projects);
  const localExperiencesState = useAppSelector(
    (state) => state.experiences.experiences
  );
  const localTechStack = useAppSelector((state) => state.techStack.techStack);
  return (
    <Flex
      display={{
        base: 'flex',
        sm: 'flex',
        md: 'none',
        lg: 'none',
        xl: 'none',
      }}
      justify={'end'}
    >
      <Button
        _hover={{
          background: 'transparent',
          color: 'pink.200',
        }}
        px={4}
        pt={6}
        color="yellow.600"
        bg={'transparent'}
        onClick={onOpen}
      >
        <FaBars />
      </Button>
      {isOpen && (
        <Drawer placement="right" onClose={onClose} isOpen={isOpen}>
          <DrawerOverlay />
          <DrawerContent bg={'black'}>
            <DrawerCloseButton
              _hover={{
                background: 'transparent',
                color: 'pink.200',
              }}
              _focus={{ outline: 'none' }}
            />
            <DrawerBody
              display={'flex'}
              justifyContent={'center'}
              alignItems={'center'}
            >
              <VStack spacing={10} align="center">
                {localUserState?.about && localUserState.about !== '' ? (
                  <Link onClick={onClose} href="#about">
                    <Code
                      bgClip={'text'}
                      bgGradient="linear(to-r, white, green.950)"
                    >
                      About
                    </Code>
                  </Link>
                ) : null}

                {localExperiencesState?.length !== 0 ? (
                  <Link onClick={onClose} href="#experience">
                    <Code
                      bgClip={'text'}
                      bgGradient="linear(to-r, white, green.950)"
                    >
                      Experiences
                    </Code>
                  </Link>
                ) : null}
                {localProjectsState?.length !== 0 ? (
                  <Link onClick={onClose} href="#projects">
                    <Code
                      bgClip={'text'}
                      bgGradient="linear(to-r, white, green.950)"
                    >
                      Projects
                    </Code>
                  </Link>
                ) : null}
              </VStack>
            </DrawerBody>
          </DrawerContent>
        </Drawer>
      )}
    </Flex>
  );
};

export default Hamburger;
