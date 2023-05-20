import { Flex, Heading } from '@chakra-ui/react';
import { FC } from 'react';

const TechStack: FC<{ techStack: string[] }> = ({ techStack }) => {
  return (
    <>
      {techStack.map((tech) => (
        <Flex flexDir={'column'} key={tech}>
          <Heading size={'sm'}>{tech}</Heading>
        </Flex>
      ))}
    </>
  );
};

export default TechStack;
