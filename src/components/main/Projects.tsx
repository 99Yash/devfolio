import { Flex, Heading, Text } from '@chakra-ui/react';
import React from 'react';
import { FC } from 'react';

const Projects: FC<{
  projects: {
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
        <Flex flexDir={'column'} key={project.name}>
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
