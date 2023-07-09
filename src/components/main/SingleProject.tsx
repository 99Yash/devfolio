import { ProjectDoc } from '@/models/project.model';
import {
  Box,
  Button,
  Code,
  Flex,
  HStack,
  Heading,
  Text,
  useDisclosure,
} from '@chakra-ui/react';
import { FC } from 'react';

import Link from 'next/link';
import { BsGlobe } from 'react-icons/bs';

import { MdModeEditOutline } from 'react-icons/md';
import { VscGithubAlt } from 'react-icons/vsc';
import EditProjectModal from '../modals/EditProjectModal';

const SingleProject: FC<{
  project: ProjectDoc;
}> = ({ project }) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  return (
    <>
      <Box
        cursor={'default'}
        _hover={{
          borderColor: 'gray.800',
        }}
        transition="border-color 400ms"
        borderColor={'gray.700'}
        borderWidth={'1px'}
        borderRadius={'xl'}
        borderStyle={'solid'}
        my={2}
      >
        <Flex m={2} p={4} flexDir={'column'}>
          <Flex justifyContent={'space-between'}>
            <Heading color={'gray.300'} size={'md'}>
              {project.title}
            </Heading>
            <HStack>
              {project?.demoLink ? (
                <Link target="_blank" href={project?.demoLink}>
                  <BsGlobe />
                </Link>
              ) : null}
              <Link
                target="_blank"
                rel="noopener noreferer"
                href={project?.githubLink}
              >
                <VscGithubAlt />
              </Link>
              <Button
                _hover={{
                  bg: 'transparent',
                }}
                _focus={{
                  boxShadow: 'none',
                }}
                onClick={onOpen}
                bg={'transparent'}
                color={'beige'}
              >
                <MdModeEditOutline />
              </Button>
            </HStack>
          </Flex>
          <Text fontStyle={'italic'} my={4} color={'gray.500'} size={'xs'}>
            {project?.description}
          </Text>

          <Flex
            maxW={'1/2'}
            wrap={'wrap'}
            flexDir={'row-reverse'}
            justifyContent={'space-between'}
          >
            <Flex mt={1}>
              {project?.techStack
                ? project.techStack.map((tech) => (
                    <Code
                      bg={'transparent'}
                      size={'xs'}
                      mr={1}
                      color="teal.500"
                      key={Math.random().toString()}
                    >
                      {tech}
                    </Code>
                  ))
                : null}
            </Flex>
          </Flex>
        </Flex>
      </Box>
      {isOpen && (
        <EditProjectModal project={project} isOpen={isOpen} onClose={onClose} />
      )}
    </>
  );
};

export default SingleProject;
