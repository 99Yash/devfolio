import React, { FC } from 'react';
import { ExperienceDoc } from '@/models/experience.model';
import { Box, Code, Flex, Heading, Text } from '@chakra-ui/react';

type SingleExpProps = {
  experience: ExperienceDoc;
};

const SingleExperience: FC<SingleExpProps> = ({ experience }) => {
  //todo add initialFocusRef

  const endDate = experience.endDate
    ? `${experience.endDate.getMonth()} ${experience.endDate.getFullYear()}`
    : 'Present';

  return (
    <Box whiteSpace={'pre'} gap={4} p={4} cursor={'default'} my={2}>
      <Flex gap={2} p={4} flexDir={'column'}>
        <Flex justifyContent={'space-evenly'}>
          <Heading fontWeight={'bold'} alignSelf={'flex-start'} fontSize={'md'}>
            {experience.companyName}
          </Heading>
          <Flex gap={1} flexDir={'column'}>
            <Heading fontSize={'sm'}>{experience.position}</Heading>
            <Code color={'teal.300'} bg={'transparent'} fontSize={'sm'}>
              {experience.startDate.getMonth()}
              {experience.startDate.getFullYear()}-{endDate}
            </Code>
            <Text color={'gray.500'} fontStyle={'italic'}>
              {experience.description}
            </Text>
          </Flex>
        </Flex>
      </Flex>
    </Box>
  );
};

export default SingleExperience;
