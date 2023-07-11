import { useAppSelector } from '@/hooks/redux';
import {
  Button,
  Flex,
  HStack,
  Heading,
  Skeleton,
  Text,
  useDisclosure,
} from '@chakra-ui/react';
import { FC } from 'react';
import { MdModeEdit } from 'react-icons/md';
import AboutModal from '../modals/AboutModal';
import { Inter } from 'next/font/google';

const inter = Inter({
  weight: ['400', '500', '700'],
  display: 'swap',
  subsets: ['latin'],
});

const About: FC = () => {
  const userAbout = useAppSelector(
    (state) => state.currentUser.user?.about
  ) as string;

  const { isOpen, onOpen, onClose } = useDisclosure();

  return (
    <>
      <Flex className={`${inter.className}`} gap={2} flexDir={'column'}>
        <HStack
          display={'flex'}
          gap={2}
          justifyContent={'space-between'}
          alignItems={'center'}
        >
          <Heading
            bgClip={'text'}
            bgGradient="linear(to-r, gray.200, blue.300)"
            fontSize={'3xl'}
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

        <Flex mt={1} maxW={'inherit'} whiteSpace={'pre-wrap'} wrap={'wrap'}>
          {userAbout ? (
            <Text color={'gray.400'}>{userAbout}</Text>
          ) : (
            <Skeleton height={'50px'}></Skeleton>
          )}
        </Flex>
      </Flex>
      {isOpen && (
        <AboutModal userAbout={userAbout} isOpen={isOpen} onClose={onClose} />
      )}
    </>
  );
};

export default About;
