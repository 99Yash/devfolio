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

const About: FC = () => {
  const userAbout = useAppSelector(
    (state) => state.currentUser.user?.about
  ) as string;

  const { isOpen, onOpen, onClose } = useDisclosure();

  return (
    <>
      <Flex  gap={2} flexDir={'column'}>
        <HStack
          display={'flex'}
          gap={2}
          justifyContent={'space-between'}
          alignItems={'center'}
        >
          <Heading
            bgClip={'text'}
            bgGradient="linear(to-r, gray.200, blue.300)"
            fontSize={['2xl', '3xl']}
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
            <Text fontSize={['md', 'lg']} color={'gray.400'}>
              {userAbout}
            </Text>
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
