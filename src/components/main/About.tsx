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
import { Fade } from 'react-awesome-reveal';

const About: FC = () => {
  const userAbout = useAppSelector(
    (state) => state.currentUser.user?.about
  ) as string;
  const { isOpen, onOpen, onClose } = useDisclosure();

  return (
    <>
      <Flex gap={2} flexDir={'column'}>
        <Fade>
          <HStack
            display={'flex'}
            gap={2}
            justifyContent={'space-between'}
            alignItems={'center'}
          >
            <Heading
              bgClip={'text'}
              bgGradient="linear(to-r, gray.200, blue.300)"
              fontSize={'2xl'}
            >
              About
            </Heading>
            <Button
              _hover={{
                bg: 'black',
              }}
              bg={'black'}
              color={'gray.200'}
              _focus={{
                boxShadow: 'none',
              }}
              onClick={onOpen}
            >
              <MdModeEdit />
            </Button>
          </HStack>
        </Fade>
        <Flex mt={1} maxW={'inherit'} whiteSpace={'pre-wrap'} wrap={'wrap'}>
          <Text color={'gray.400'}>{userAbout}</Text>
        </Flex>
      </Flex>
      {isOpen && (
        <AboutModal userAbout={userAbout} isOpen={isOpen} onClose={onClose} />
      )}
    </>
  );
};

export default About;
