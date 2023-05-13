import { sectionsData } from '@/data/defaultSectionsData';
import {
  Button,
  Flex,
  HStack,
  Heading,
  Text,
  VStack,
  useDisclosure,
} from '@chakra-ui/react';
import { FC } from 'react';
import { IoMdAdd } from 'react-icons/io';
import { MdModeEdit } from 'react-icons/md';
import ExpModal from '../modals/ExpModal';
import AboutModal from '../modals/AboutModal';
import TechStackModal from '../modals/TechStackModal';
import ProjectModal from '../modals/ProjectModal';

interface DefaultMainSectionProps {
  sectionTitle: string;
  isOpen?: boolean;
  onClose?: () => void;

  //todo add a data prop
}

const getDataBySectionTitle = (sectionTitle: string) => {
  return sectionsData.find((section) => section.sectionTitle === sectionTitle);
};

//todo add onClicks to buttons for respective modals
const DefaultMainSection: FC<DefaultMainSectionProps> = (props) => {
  const { isOpen, onClose, onOpen } = useDisclosure();
  const MainSectionModal: FC = () => {
    if (props.sectionTitle === 'Experiences')
      return <ExpModal isOpen={isOpen} onClose={onClose} />;
    if (props.sectionTitle === 'About')
      return <AboutModal isOpen={isOpen} onClose={onClose} />;
    if (props.sectionTitle === 'Tech Stack')
      return <TechStackModal isOpen={isOpen} onClose={onClose} />;
    if (props.sectionTitle === 'Projects') {
      return <ProjectModal isOpen={isOpen} onClose={onClose} />;
    } else {
      return <></>;
    }
  };

  return (
    <Flex flexDir={'column'}>
      <HStack
        display={'flex'}
        gap={2}
        justifyContent={'space-between'}
        alignItems={'center'}
      >
        <Heading size={'md'}>{props.sectionTitle}</Heading>
        <Button onClick={onOpen}>
          {props.sectionTitle === 'About' ? <MdModeEdit /> : <IoMdAdd />}
        </Button>
      </HStack>
      <VStack
        display={'flex'}
        gap={2}
        justifyContent={'center'}
        alignItems={'center'}
      >
        <Heading size={'sm'}>
          {getDataBySectionTitle(props.sectionTitle)?.sectionDescription.title}
        </Heading>
        <Text size={'sm'} color={'gray.500'}>
          {getDataBySectionTitle(props.sectionTitle)?.sectionDescription.body}
        </Text>
        <Button onClick={onOpen} variant={'outline'} color={'teal'}>
          {getDataBySectionTitle(props.sectionTitle)?.buttonText}
        </Button>
      </VStack>
      {isOpen && <MainSectionModal />}
    </Flex>
  );
};
export default DefaultMainSection;
