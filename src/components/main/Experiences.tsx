import { useAppDispatch, useAppSelector } from '@/hooks/redux';
import { axiosClient } from '@/lib/utils/axiosInstance';
import { ExperienceDoc } from '@/models/experience.model';
import { setExperiences } from '@/store/user.slice';
import {
  Button,
  Flex,
  HStack,
  Heading,
  Text,
  useDisclosure,
} from '@chakra-ui/react';
import { FC, useEffect } from 'react';
import { IoMdAdd } from 'react-icons/io';
import SingleExperience from './SingleExperience';
import ExpModal from '../modals/ExpModal';

const Experiences: FC = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const experiences = useAppSelector((state) => state.currentUser.experiences);
  const dispatch = useAppDispatch();

  useEffect(() => {
    const fetchUserExpList = async () => {
      try {
        const { data: experiences } = await axiosClient.get<{
          experiences: ExperienceDoc[];
        }>('/user/experience');
        dispatch(setExperiences(experiences.experiences));
      } catch (err: any) {
        console.error(err);
      }
    };
    fetchUserExpList();
  }, [dispatch]);
  return (
    <Flex gap={2} flexDir={'column'}>
      <HStack
        display={'flex'}
        gap={2}
        justifyContent={'space-between'}
        alignItems={'center'}
      >
        <Heading fontSize={'2xl'}>Experiences</Heading>
        <Button _focus={{}} onClick={onOpen}>
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
