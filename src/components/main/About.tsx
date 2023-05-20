import { Text } from '@chakra-ui/react';
import { FC } from 'react';

const About: FC<{ about: string }> = ({ about }) => {
  return (
    <>
      <Text>{about}</Text>
    </>
  );
};

export default About;
