import { useFetchUserProjectsQuery } from '@/store/userApi';
import { Flex, Heading, Text } from '@chakra-ui/react';
import { FC } from 'react';

const Projects: FC<{
  projects: {
    _id: string;
  }[];
}> = ({ projects }) => {
  const { data } = useFetchUserProjectsQuery(null, {
    refetchOnMountOrArgChange: true,
  });
  return (
    <>
      {data?.projects.map((project) => (
        <Flex flexDir={'column'} key={project._id}>
          <Heading size={'md'}>{project.title}</Heading>
          <Flex>
            {project?.techStack
              ? project.techStack.map((tech) => (
                  <Text colorScheme="teal" key={tech}>
                    {tech}
                  </Text>
                ))
              : null}
          </Flex>
          <Text>{project?.githubLink}</Text>
          <Text>{project?.description}</Text>
          <Text>{project?.demoLink}</Text>
        </Flex>
      ))}
    </>
  );
};

export default Projects;
