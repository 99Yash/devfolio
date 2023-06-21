import { ExperienceDoc } from '@/models/experience.model';
import {
  Box,
  Button,
  Code,
  Flex,
  HStack,
  Heading,
  Text,
  useDisclosure,
} from '@chakra-ui/react';
import { FC } from 'react';
import { BsFillPencilFill } from 'react-icons/bs';
import EditExperienceModal from '../modals/EditExperienceModal';

type SingleExpProps = {
  experience: ExperienceDoc;
};

const SingleExperience: FC<SingleExpProps> = ({ experience }) => {
  const { isOpen, onClose, onOpen } = useDisclosure();

  const endDate =
    experience.present === false
      ? `${new Date(experience.endDate).toLocaleString('default', {
          month: 'long',
        })} ${new Date(experience.endDate).getFullYear()}`
      : 'Present';

  const startDate = experience.startDate
    ? `${new Date(experience.startDate).toLocaleString('default', {
        month: 'long',
      })} ${new Date(experience.startDate).getFullYear()}`
    : null;

  return (
    <>
      <Box gap={4} p={8} cursor={'default'} my={2}>
        <Flex whiteSpace={'pre-wrap'} gap={2} flexDir={'column'}>
          <Flex gap={12} alignItems={'flex-start'} justifyContent={'start'}>
            <Heading
              color={'gray.300'}
              bgClip={'text'}
              bgGradient="linear(to-r, gray.500, gray.200)"
              fontWeight={'bold'}
              alignSelf={'flex-start'}
              fontSize={'md'}
            >
              {experience.companyName}
            </Heading>

            <Flex wrap={'wrap'} gap={1} flexDir={'column'}>
              <Heading color={'gray.400'} fontSize={'sm'}>
                {experience.position}
              </Heading>
              <Code color={'teal.300'} bg={'transparent'} fontSize={'sm'}>
                {startDate}-{endDate}
              </Code>
              <Text fontSize={'sm'} color={'gray.500'} fontStyle={'italic'}>
                {experience.description}
              </Text>
            </Flex>
            <HStack>
              <Button
                _hover={{
                  bg: 'transparent',
                }}
                _focus={{
                  boxShadow: 'none',
                }}
                bg={'transparent'}
                size={'xs'}
                onClick={onOpen}
                color={'beige'}
              >
                <BsFillPencilFill />
              </Button>
            </HStack>
          </Flex>
        </Flex>
        {isOpen && (
          <EditExperienceModal
            onClose={onClose}
            isOpen={isOpen}
            experience={experience}
          />
        )}
      </Box>
    </>
  );
};

export default SingleExperience;
