import { Button, Flex, HStack, Heading, useDisclosure } from '@chakra-ui/react';
import { FC } from 'react';
import { IoMdAdd } from 'react-icons/io';

const Experiences: FC = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  return (
    <Flex gap={2} flexDir={'column'}>
      <HStack
        display={'flex'}
        gap={2}
        justifyContent={'space-between'}
        alignItems={'center'}
      >
        <Heading fontSize={'2xl'}>Experiences</Heading>
        <Button onClick={onOpen}>
          <IoMdAdd />
        </Button>
      </HStack>
      {/* add exp here */}
    </Flex>
  );
};

export default Experiences;
