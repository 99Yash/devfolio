import { ExperienceDoc } from '@/models/experience.model';
import { useFetchUserExperiencesQuery } from '@/store/userApi';
import { Box, Flex, Heading, Spinner, Text, VStack } from '@chakra-ui/react';
import { FC } from 'react';

const Experiences: FC = () => {
  const { data, isLoading, error } = useFetchUserExperiencesQuery(null, {
    refetchOnMountOrArgChange: true,
  });
  return (
    <>
      {isLoading && <Spinner />}
      {data?.experiences?.map((experience: ExperienceDoc) => (
        <Box key={experience._id}>
          <Flex>
            <Heading size={'sm'}>{experience.companyName}</Heading>
            <VStack>
              <Heading size={'sm'}>{experience.position}</Heading>
              <Heading size={'sm'}>
                {experience.startMonth},{experience.startYear} to{' '}
                {experience.endMonth},{experience.endYear}
              </Heading>
              <Text size={'sm'}>{experience.description}</Text>
            </VStack>
          </Flex>
        </Box>
      ))}
    </>
  );
};

export default Experiences;
