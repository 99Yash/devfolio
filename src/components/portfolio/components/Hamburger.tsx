import { useAppDispatch, useAppSelector } from '@/hooks/redux';
import { axiosClient } from '@/lib/utils/axiosInstance';
import { ExperienceDoc } from '@/models/experience.model';
import { ProjectDoc } from '@/models/project.model';
import { SocialDoc } from '@/models/social.model';
import { TechDoc } from '@/models/tech.model';
import { UserDoc } from '@/models/user.model';
import { setCurrentUser } from '@/store/user.slice';
import {
  Avatar,
  Box,
  Button,
  Code,
  Drawer,
  DrawerBody,
  DrawerCloseButton,
  DrawerContent,
  DrawerOverlay,
  Flex,
  HStack,
  Heading,
  Text,
  VStack,
  useDisclosure,
} from '@chakra-ui/react';
import Head from 'next/head';
import { useEffect } from 'react';

import { getIconByLinkName } from '@/components/utils/getIconsByLink';
import { setExperiences } from '@/store/experiences.slice';
import { setProjects } from '@/store/projects.slice';
import { setSocialLinks } from '@/store/socials.slice';
import { setTechStack } from '@/store/tech.slice';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useState } from 'react';
import { BsGlobeAmericas } from 'react-icons/bs';
import { FaBars } from 'react-icons/fa';
import { VscGithubAlt } from 'react-icons/vsc';

const Hamburger = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const localUserState = useAppSelector((state) => state.currentUser.user);
  const localProjectsState = useAppSelector((state) => state.projects.projects);
  const localExperiencesState = useAppSelector(
    (state) => state.experiences.experiences
  );
  const localSocialsState = useAppSelector((state) => state.socials.socials);
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
                      bgGradient="linear(to-r, white, orange.400)"
                    >
                      About
                    </Code>
                  </Link>
                ) : null}
                {localTechStack && localTechStack?.length !== 0 ? (
                  <Link onClick={onClose} href="#tech">
                    <Code
                      bgClip={'text'}
                      bgGradient="linear(to-r, white, orange.400)"
                    >
                      Tech Stack
                    </Code>
                  </Link>
                ) : null}
                {localExperiencesState?.length !== 0 ? (
                  <Link onClick={onClose} href="#experience">
                    <Code
                      bgClip={'text'}
                      bgGradient="linear(to-r, white, orange.400)"
                    >
                      Experiences
                    </Code>
                  </Link>
                ) : null}
                {localProjectsState?.length !== 0 ? (
                  <Link onClick={onClose} href="#projects">
                    <Code
                      bgClip={'text'}
                      bgGradient="linear(to-r, white, orange.400)"
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
