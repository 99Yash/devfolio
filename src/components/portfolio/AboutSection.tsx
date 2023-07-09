import { ACCENT_COLOR } from '@/styles/styles';
import React from 'react';

import {
  Box,
  Flex,
  Image,
  Link,
  ListIcon,
  ListItem,
  Text,
  UnorderedList,
} from '@chakra-ui/react';
import Tilt from 'react-parallax-tilt';
import Wrapper from '../utils/Wrapper';
import Heading from '../utils/Heading';
import { useAppSelector } from '@/hooks/redux';
import { AiFillCaretRight } from 'react-icons/ai';

const AboutSection = ({ imageSrc }: { imageSrc: string }) => {
  const localTechStack = useAppSelector((state) => state.techStack.techStack);
  const localUserState = useAppSelector((state) => state.currentUser.user);

  return (
    <Wrapper>
      <Box my={10}>
        <Heading sectionHeadingText={'About Me'} />
      </Box>
      <Flex flexDir={['column', 'column', 'column', 'row']}>
        <Box flex={1.3} mr={6}>
          <Text
            my={4}
            fontSize={'lg'}
            lineHeight={1.5}
            letterSpacing={'wide'}
            color={'gray.500'}
          >
            {localUserState?.about}
          </Text>

          <Text
            my={4}
            fontSize={'lg'}
            lineHeight={1.5}
            letterSpacing={'wide'}
            color={'gray.500'}
          >
            Here are few technologies I’ve been working with recently:
          </Text>
          <UnorderedList
            mx={0}
            display={'grid'}
            gridTemplateColumns={'repeat(2, minmax(120px, 180px))'}
            gridRowGap={'2'}
            gridColumnGap={'2'}
            listStyleType="none"
          >
            {localTechStack.map((skill) => {
              return (
                <ListItem key={skill._id}>
                  <ListIcon as={AiFillCaretRight} color={ACCENT_COLOR} />
                  {skill.name}
                </ListItem>
              );
            })}
          </UnorderedList>
        </Box>
        {/* //todo render picture conditionally based on user preference */}
        <Box
          ml={[0, 0, 0, 4]}
          mt={[10, 10, 10, 5]}
          h={'fit-content'}
          w={['full', 'full', 'full', '40%']}
          rounded={'lg'}
          mb={'40'}
          bgColor={ACCENT_COLOR}
          _hover={{ bgColor: 'transparent' }}
        >
          <Tilt
            glareEnable={true}
            glareMaxOpacity={0.9}
            glareColor={'black'}
            glarePosition="all"
          >
            <Image
              opacity={0.86}
              width={['100%']}
              objectFit={'cover'}
              height={['xs', 'xs', 'sm', 'sm']}
              transition={'all 0.2s ease-in-out'}
              _hover={{ opacity: 1 }}
              rounded={'lg'}
              alt="User Profile"
              src={imageSrc}
            />
          </Tilt>
        </Box>
      </Flex>
    </Wrapper>
  );
};

export default AboutSection;
