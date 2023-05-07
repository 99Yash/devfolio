import {
  Button,
  Flex,
  HStack,
  Heading,
  Text,
  VStack,
  useDisclosure,
} from '@chakra-ui/react';
import React, { FC, ReactElement } from 'react';

interface ProfileSectionProps {
  sectionName: string;
  changeIcon: ReactElement;
  headline: string;
  subText: string;
  buttonText: string;
}

const ProfileSection: FC<ProfileSectionProps> = (props) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  return (
    <Flex flexDir={'column'}>
      <HStack
        display={'flex'}
        gap={2}
        justifyContent={'space-between'}
        alignItems={'center'}
      >
        <Heading size={'md'}>{props.sectionName}</Heading>
        <Button>{props.changeIcon}</Button>
      </HStack>
      <VStack
        display={'flex'}
        gap={2}
        justifyContent={'center'}
        alignItems={'center'}
      >
        <Heading size={'sm'}>{props.headline}</Heading>
        <Text size={'sm'} color={'gray.500'}>
          {props.subText}
        </Text>
        <Button onClick={onOpen} variant={'outline'} color={'teal'}>
          {props.buttonText}
        </Button>
      </VStack>
    </Flex>
  );
};

export default ProfileSection;
