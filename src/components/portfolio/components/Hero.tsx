import { getIconByLinkName } from '@/components/utils/getIconsByLink';
import { useAppSelector } from '@/hooks/redux';
import { ACCENT_COLOR } from '@/styles/styles';
import { Box, Button, Flex, Heading, Text } from '@chakra-ui/react';
import { Fade } from 'react-awesome-reveal';

const Hero = () => {
  const localUserState = useAppSelector((state) => state.currentUser.user);
  const socials = useAppSelector((state) => state.socials.socials);

  return (
    <Flex
      mx={'auto'}
      maxW={['90%', '80%', '70%']}
      flexDirection={'column'}
      justifyContent={'center'}
      alignItems={'flex-start'}
      h="90vh"
    >
      <Fade cascade={true} direction="up" duration={500}>
        <Box ml={[1, 1, 2, 2]}>
          <Heading
            fontFamily={'mono'}
            color={ACCENT_COLOR}
            fontSize={['md', 'md', 'lg', 'xl']}
            fontWeight={'light'}
            lineHeight={1.2}
          >
            Hi, my name is
          </Heading>
        </Box>
        <Box>
          <Heading
            fontSize={['5xl', '6xl', '7xl', '8xl']}
            bgGradient={`linear(to-l, ${ACCENT_COLOR}, #ffffff)`}
            bgClip="text"
            letterSpacing={'tighter'}
            fontWeight={'semibold'}
            lineHeight={1.2}
          >
            {localUserState?.fullName}
          </Heading>
        </Box>
        <Box>
          <Heading
            fontSize={['3xl', '5xl', '6xl', '7xl']}
            fontWeight={'semibold'}
            lineHeight={1.2}
            color="gray.400"
          >
            I love building things for the web.
          </Heading>
        </Box>

        <Box
          my={6}
          maxW={['80%', '70%', '60%', '50%']}
          lineHeight={1.5}
          fontSize={['md', 'lg']}
          color={'gray.400'}
          letterSpacing={1.1}
          fontWeight={'light'}
        >
          <Text>{localUserState?.oneLiner} </Text>
        </Box>
        <Box my={4}>
          {socials.map((social) => {
            return (
              <Button
                key={social.id}
                as={'a'}
                href={social.url}
                variant={'link'}
                size={'lg'}
                colorScheme={'cyan'}
                fontWeight={'semibold'}
                target="_blank"
                rel="noopener noreferrer"
              >
                {getIconByLinkName(social.name)}
              </Button>
            );
          })}
        </Box>
      </Fade>
    </Flex>
  );
};

export default Hero;
