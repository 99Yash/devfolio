import { useAppSelector } from '@/hooks/redux';
import {
  Button,
  Flex,
  HStack,
  Heading,
  Text,
  useDisclosure,
} from '@chakra-ui/react';
import { FC } from 'react';
import { MdModeEdit } from 'react-icons/md';
import AboutModal from '../modals/AboutModal';

const About: FC = () => {
  const userAbout = useAppSelector(
    (state) => state.currentUser.user?.about
  ) as string;
  const { isOpen, onOpen, onClose } = useDisclosure();

  return (
    <>
      <Flex gap={2} flexDir={'column'}>
        <HStack
          display={'flex'}
          gap={2}
          justifyContent={'space-between'}
          alignItems={'center'}
        >
          <Heading fontSize={'2xl'}>About</Heading>
          <Button onClick={onOpen}>
            <MdModeEdit />
          </Button>
        </HStack>
        <Flex mt={1} maxW={'inherit'} whiteSpace={'pre-wrap'} wrap={'wrap'}>
          <Text>{userAbout}</Text>
        </Flex>
      </Flex>
      {isOpen && (
        <AboutModal userAbout={userAbout} isOpen={isOpen} onClose={onClose} />
      )}
    </>
  );
};

export default About;
