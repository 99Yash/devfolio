import { useFetchUserTechStackQuery } from '@/store/userApi';
import {
  Button,
  Code,
  Flex,
  HStack,
  Heading,
  Spinner,
  useDisclosure,
} from '@chakra-ui/react';
import { FC } from 'react';
import { IoMdAdd } from 'react-icons/io';
import TechStackModal from '../modals/TechStackModal';

const TechStack: FC = () => {
  const { data, isLoading } = useFetchUserTechStackQuery(null, {
    refetchOnMountOrArgChange: true,
  });

  const { isOpen, onOpen, onClose } = useDisclosure();

  return (
    <Flex gap={2} flexDir={'column'}>
      <HStack
        display={'flex'}
        gap={2}
        justifyContent={'space-between'}
        alignItems={'center'}
      >
        <Heading fontSize={'2xl'}>Tech Stack</Heading>
        <Button onClick={onOpen}>
          <IoMdAdd />
        </Button>
      </HStack>
      {isLoading && <Spinner />}
      <Flex gap={2}>
        {data?.techStack?.map((tech: string) => (
          <Code
            bg={'transparent'}
            color="teal.300"
            key={Math.random().toString()}
            size={'sm'}
          >
            {tech}
          </Code>
        ))}
        {isOpen && (
          <TechStackModal isOpen={isOpen} isCentered onClose={onClose} />
        )}
      </Flex>
    </Flex>
  );
};

export default TechStack;
