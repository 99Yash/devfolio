import { ExperienceDoc } from '@/models/experience.model';
import { useFetchUserExperiencesQuery } from '@/store/userApi';
import {
  Box,
  Button,
  Flex,
  HStack,
  Heading,
  Spinner,
  Text,
  VStack,
  useDisclosure,
} from '@chakra-ui/react';
import { FC } from 'react';
import { IoMdAdd } from 'react-icons/io';

const Experiences: FC = () => {
  const { data, isLoading, error } = useFetchUserExperiencesQuery(null, {
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
        <Heading fontSize={'2xl'}>Experiences</Heading>
        <Button onClick={onOpen}>
          <IoMdAdd />
        </Button>
      </HStack>
      {data?.experiences?.map((experience: ExperienceDoc) => (
        <Box key={experience._id}>
          {isLoading && <Spinner />}
          <Flex>
            <Heading size={'sm'}>{experience.companyName}</Heading>
            <VStack>
              <Heading size={'sm'}>{experience.position}</Heading>
              <Heading size={'sm'}>
                {experience.startMonth},{experience.startYear} to{' '}
                {experience.endMonth},{experience.endYear}
              </Heading>
              <Text size={'sm'}>{experience.description}</Text>
            </VStack>
          </Flex>
        </Box>
      ))}
    </Flex>
  );
};

export default Experiences;
