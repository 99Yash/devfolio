import { useAppSelector } from '@/hooks/redux';
import { TechDoc } from '@/models/tech.model';
import {
  Button,
  Code,
  Flex,
  HStack,
  Heading,
  useDisclosure,
} from '@chakra-ui/react';
import { FC } from 'react';
import { IoMdAdd } from 'react-icons/io';
import TechStackModal from '../modals/TechStackModal';

const TechStack: FC = () => {
  const techStack = useAppSelector((state) => state.techStack.techStack);

  const { isOpen, onOpen, onClose } = useDisclosure();

  return (
    <Flex
      gap={2}
      flexDir={'column'}
      minW={['100%', '2xl']}
      maxW={['100%', '3xl']}
    >
      <HStack
        display={'flex'}
        gap={2}
        justifyContent={'space-between'}
        alignItems={'center'}
      >
        <Heading
          color={'gray.300'}
          bgClip={'text'}
          bgGradient="linear(to-r, gray.100, blue.400)"
          fontSize={['2xl', '3xl']}
        >
          Tech Stack
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
          <IoMdAdd />
        </Button>
      </HStack>
      <Flex fontSize={'md'} gap={2} wrap={'wrap'}>
        {techStack ? (
          techStack?.map((tech: TechDoc) => (
            <Code
              bg={'transparent'}
              color="teal.300"
              key={tech._id}
              size={'md'}
            >
              {tech.name}
            </Code>
          ))
        ) : (
          <Code bg={'transparent'} color="teal.300" size={'sm'}>
            No tech stack added yet
          </Code>
        )}
      </Flex>
      {isOpen && (
        <TechStackModal
          techStack={techStack}
          isOpen={isOpen}
          isCentered
          onClose={onClose}
        />
      )}
    </Flex>
  );
};

export default TechStack;
