import { ExperienceDoc } from '@/models/experience.model';
import { Box, Code, Flex, Heading, Text } from '@chakra-ui/react';
import { FC } from 'react';

type SingleExpProps = {
  experience: ExperienceDoc;
};

const SingleExperience: FC<SingleExpProps> = ({ experience }) => {
  const endDate =
    experience.present === false
      ? `${new Date(experience.endDate).toLocaleString('default', {
          month: 'long',
        })} ${new Date(experience.endDate).getFullYear()}`
      : 'Present';

  const startDate = experience.startDate
    ? `${new Date(experience.startDate).toLocaleString('default', {
        month: 'long',
      })} ${new Date(experience.startDate).getFullYear()}`
    : null;

  return (
    <Box whiteSpace={'pre'} gap={4} p={4} cursor={'default'} my={2}>
      <Flex gap={2} flexDir={'column'}>
        <Flex gap={12} justifyContent={'start'}>
          <Heading fontWeight={'bold'} alignSelf={'flex-start'} fontSize={'md'}>
            {experience.companyName}
          </Heading>
          <Flex gap={1} flexDir={'column'}>
            <Heading fontSize={'sm'}>{experience.position}</Heading>
            <Code color={'teal.300'} bg={'transparent'} fontSize={'sm'}>
              {startDate}-{endDate}
            </Code>
            <Text fontSize={'sm'} color={'gray.500'} fontStyle={'italic'}>
              {experience.description}
            </Text>
          </Flex>
        </Flex>
      </Flex>
    </Box>
  );
};

export default SingleExperience;
