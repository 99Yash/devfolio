import {
  useDeleteProjectMutation,
  useFetchUserProjectsQuery,
} from '@/store/userApi';
import { Box, Button, Flex, Heading, Text } from '@chakra-ui/react';
import { FC } from 'react';
import { Spinner } from '@chakra-ui/react';
import Link from 'next/link';
import { VscGithubAlt } from 'react-icons/vsc';
import { TiDelete } from 'react-icons/ti';
const Projects: FC = () => {
  const { data, isError, isFetching, isLoading } = useFetchUserProjectsQuery(
    null,
    {
      refetchOnMountOrArgChange: true,
    }
  );

  const [deleteProject, results] = useDeleteProjectMutation(); //!nw

  return (
    <>
      {isLoading && <Spinner />}
      {data?.projects.map((project) => (
        <Box my={2} bg={'Background'} key={project._id}>
          <Flex m={2} flexDir={'column'}>
            <Flex>
              <Heading size={'md'}>{project.title}</Heading>
              <Link
                target="_blank"
                rel="noopener noreferer"
                href={project?.githubLink}
              >
                <VscGithubAlt />
              </Link>
              <Button
                onClick={() => {
                  deleteProject(project._id);
                }}
                variant={'ghost'}
              >
                <TiDelete />
              </Button>
            </Flex>
            <Text color={'gray.500'} size={'sm'}>
              {project?.description}
            </Text>
            <Text>{project?.demoLink}</Text>

            <Flex
              maxW={'1/2'}
              wrap={'wrap'}
              flexDir={'row-reverse'}
              justifyContent={'space-between'}
            >
              <Flex mt={1}>
                {project?.techStack
                  ? project.techStack.map((tech) => (
                      <Text size={'2xs'} mr={1} color="GrayText" key={tech}>
                        {tech}
                      </Text>
                    ))
                  : null}
              </Flex>
            </Flex>
          </Flex>
        </Box>
      ))}
    </>
  );
};

export default Projects;
