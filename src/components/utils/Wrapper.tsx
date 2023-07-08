import { Flex } from '@chakra-ui/react';
import { FC, ReactNode } from 'react';

interface WrapperProps {
  children: ReactNode;
}

const Wrapper: FC<WrapperProps> = ({ children }) => {
  return (
    <Flex
      flexDir={'column'}
      justifyContent="center"
      maxW={['90%', '80%', '70%', '60%']}
      minH={'100vh'}
      mb={10}
      mx={'auto'}
    >
      {children}
    </Flex>
  );
};

export default Wrapper;
