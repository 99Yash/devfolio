import { Flex, Heading, Text } from '@chakra-ui/react';
import { FC } from 'react';

const Projects: FC<{
  projects: {
    id: string;
    name: string;
    description: string;
    techStack: string[];
    githubLink: string;
    demoLink?: string;
  }[];
}> = ({ projects }) => {
  return (
    <>
      {projects.map((project) => (
        <Flex flexDir={'column'} key={project.id}>
          <Heading size={'md'}>{project.name}</Heading>
          <Text>{project.description}</Text>
          <Text>{project.techStack}</Text>
          <Text>{project.githubLink}</Text>
          <Text>{project.demoLink}</Text>
        </Flex>
      ))}
    </>
  );
};

export default Projects;
