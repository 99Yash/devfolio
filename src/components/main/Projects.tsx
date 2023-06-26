import { Button, Flex, HStack, Heading, useDisclosure } from '@chakra-ui/react';
import { FC } from 'react';

import { useAppSelector } from '@/hooks/redux';
import { ProjectDoc } from '@/models/project.model';
import { Fade } from 'react-awesome-reveal';
import { IoMdAdd } from 'react-icons/io';
import ProjectModal from '../modals/ProjectModal';
import SingleProject from './SingleProject';

const Projects: FC = () => {
  const projects = useAppSelector((state) => state.projects.projects);

  const { isOpen, onOpen, onClose } = useDisclosure();

  return (
    <Flex gap={2} flexDir={'column'}>
      <Fade>
        <HStack
          display={'flex'}
          gap={2}
          justifyContent={'space-between'}
          alignItems={'center'}
        >
          <Heading
            bgClip={'text'}
            bgGradient="linear(to-r, gray.200, blue.400)"
            fontSize={'3xl'}
          >
            Projects
          </Heading>
          <Button
            _hover={{
              bg: 'black',
            }}
            bg={'black'}
            color={'gray.200'}
            _focus={{
              boxShadow: 'none',
            }}
            onClick={onOpen}
          >
            <IoMdAdd />
          </Button>
        </HStack>
      </Fade>
      {projects?.map((project: ProjectDoc) => (
        <SingleProject key={project._id} project={project} />
      ))}
      {isOpen && <ProjectModal isOpen={isOpen} onClose={onClose} />}
    </Flex>
  );
};

export default Projects;
