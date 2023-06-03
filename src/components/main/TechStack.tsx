import { useAppDispatch, useAppSelector } from '@/hooks/redux';
import { TechDoc } from '@/models/tech.model';
import { setTechStack } from '@/store/user.slice';
import {
  Button,
  Code,
  Flex,
  HStack,
  Heading,
  useDisclosure,
} from '@chakra-ui/react';
import axios from 'axios';
import { FC, useEffect } from 'react';
import { IoMdAdd } from 'react-icons/io';
import TechStackModal from '../modals/TechStackModal';
import { axiosClient } from '@/lib/utils/axiosInstance';

const TechStack: FC = () => {
  const dispatch = useAppDispatch();
  const techStack = useAppSelector((state) => state.currentUser.techStack);

  useEffect(() => {
    const fetchUserTechStack = async () => {
      try {
        const { data } = await axiosClient.get<TechDoc[] | null>('/user/tech');
        dispatch(setTechStack(data ? data : []));
        console.log(techStack, data);
      } catch (err: any) {
        console.error(err);
      }
    };
    fetchUserTechStack();
  }, [dispatch]);
  console.log(techStack);

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
        <Button _focus={{}} onClick={onOpen}>
          <IoMdAdd />
        </Button>
      </HStack>
      <Flex gap={2}>
        {/* {techStack ? (
          techStack?.map((tech: TechDoc) => (
            <Code
              bg={'transparent'}
              color="teal.300"
              key={tech._id}
              size={'sm'}
            >
              {tech.name}
            </Code>
          ))
        ) : (
          <Code bg={'transparent'} color="teal.300" size={'sm'}>
            No tech stack added yet
          </Code>
        )} */}
      </Flex>
      {/* {isOpen && (
        <TechStackModal
          techStack={techStack}
          isOpen={isOpen}
          isCentered
          onClose={onClose}
        />
      )} */}
    </Flex>
  );
};

export default TechStack;
