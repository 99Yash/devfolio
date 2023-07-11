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
import { IoMdAdd } from 'react-icons/io';
import ExpModal from '../modals/ExpModal';
import SingleExperience from './SingleExperience';

import { Inter } from 'next/font/google';

const inter = Inter({
  weight: ['400', '500', '700'],
  display: 'swap',
  subsets: ['latin'],
});

const Experiences: FC = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const experiences = useAppSelector((state) => state.experiences.experiences);

  return (
    <Flex className={`${inter.className}`} gap={2} flexDir={'column'}>
      <HStack
        display={'flex'}
        gap={2}
        justifyContent={'space-between'}
        alignItems={'center'}
      >
        <Heading
          bgClip={'text'}
          bgGradient="linear(to-r, gray.200, blue.400)"
          fontSize={'3xl'}
        >
          Experiences
        </Heading>
        <Button
          _hover={{
            bg: 'black',
          }}
          bg={'black'}
          color={'gray.200'}
          _focus={{
            outline: 'none',
          }}
          onClick={onOpen}
        >
          <IoMdAdd />
        </Button>
      </HStack>
      {experiences ? (
        experiences.map((exp) => (
          <SingleExperience experience={exp} key={exp._id} />
        ))
      ) : (
        <Text color={'blackAlpha.300'}>No experiences added yet.</Text>
      )}
      {isOpen && <ExpModal isOpen={isOpen} onClose={onClose} />}
    </Flex>
  );
};

export default Experiences;
