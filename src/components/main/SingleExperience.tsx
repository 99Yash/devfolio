import { ExperienceDoc } from '@/models/experience.model';
import {
  Box,
  Button,
  Code,
  Flex,
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
      <Box gap={4} py={4} cursor={'default'} my={2}>
        <Flex flexDirection={['column', 'row']} alignItems={['flex-start']}>
          <Flex
            h={'full'}
            w={'full'}
            alignItems={'flex-start'}
            justifyContent={'flex-start'}
          >
            <Heading
              color={'gray.300'}
              bgClip={'text'}
              bgGradient="linear(to-r, gray.500, gray.200)"
              fontWeight={'bold'}
              alignSelf={['flex-start']}
              fontSize={['lg', 'xl']}
              width={['100%', 'auto']}
              mr={[0, 8]}
            >
              {experience.companyName}
            </Heading>
            <Button
              _hover={{
                bg: 'transparent',
              }}
              _focus={{
                boxShadow: 'none',
              }}
              bg={'transparent'}
              size={['sm']}
              onClick={onOpen}
              color={'beige'}
            >
              <BsFillPencilFill />
            </Button>
          </Flex>
          <Flex
            flexDir={'column'}
            alignItems={['flex-start']}
            justifyContent={['flex-start']}
            width={['100%', 'auto']}
            textAlign={['left']}
          >
            <Heading
              color={'gray.400'}
              fontSize={['md', 'lg']}
              textAlign={['left']}
            >
              {experience.position}
            </Heading>
            <Code
              color={'teal.300'}
              bg={'transparent'}
              fontSize={['md', 'lg']}
              textAlign={['left']}
            >
              {startDate}-{endDate}
            </Code>
            <Text
              fontSize={['md', 'lg']}
              color={'gray.500'}
              fontStyle={'italic'}
              textAlign={['left']}
            >
              {experience.description}
            </Text>
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
