import { Flex, Heading, Text, VStack } from '@chakra-ui/react';
import { FC } from 'react';

const Experiences: FC<{
  experiences: {
    id: string;
    position: string;
    companyName: string;
    description: string;
    startYear: number;
    startMonth: number;
    endMonth?: number;
    endYear?: number;
    present?: boolean;
  }[];
}> = ({ experiences }) => {
  return (
    <>
      {experiences.map((experience) => (
        <Flex key={experience.id}>
          <Heading size={'sm'}>{experience.companyName}</Heading>
          <VStack>
            <Heading size={'sm'}>{experience.position}</Heading>
            <Heading size={'sm'}>
              {experience.startMonth},{experience.startYear} to{' '}
            </Heading>
            <Text size={'sm'}>{experience.description}</Text>
          </VStack>
        </Flex>
      ))}
    </>
  );
};

export default Experiences;
