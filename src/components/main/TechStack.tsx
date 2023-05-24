import { useFetchUserTechStackQuery } from '@/store/userApi';
import { Flex, Heading, Spinner, Text } from '@chakra-ui/react';
import { FC } from 'react';

const TechStack: FC = () => {
  const { data, isLoading } = useFetchUserTechStackQuery(null, {
    refetchOnMountOrArgChange: true,
  });
  return (
    <>
      {isLoading && <Spinner />}
      <Flex gap={2}>
        {data?.techStack?.map((tech) => (
          <Text color="teal" key={Math.random().toString()} size={'xs'}>
            {tech}
          </Text>
        ))}
      </Flex>
    </>
  );
};

export default TechStack;
