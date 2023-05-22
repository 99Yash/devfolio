import { Flex, Text } from '@chakra-ui/react';
import { FC } from 'react';

const About: FC<{ about: string }> = ({ about }) => {
  return (
    <Flex mt={1} maxW={'inherit'} whiteSpace={'pre-wrap'} wrap={'wrap'}>
      <Text>{about}</Text>
    </Flex>
  );
};

export default About;
