import { useFetchUserAboutQuery } from '@/store/userApi';
import { Flex, Spinner, Text } from '@chakra-ui/react';
import { FC } from 'react';

const About: FC = () => {
  const { data, isFetching, isLoading } = useFetchUserAboutQuery(null, {
    refetchOnMountOrArgChange: true,
  });
  return (
    <Flex mt={1} maxW={'inherit'} whiteSpace={'pre-wrap'} wrap={'wrap'}>
      {isLoading && <Spinner />}
      <Text>{data?.about}</Text>
    </Flex>
  );
};

export default About;
