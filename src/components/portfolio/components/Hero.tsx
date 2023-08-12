import { useAppSelector } from '@/hooks/redux';
import { ACCENT_COLOR } from '@/styles/styles';
import { Box, Flex, Heading, Text } from '@chakra-ui/react';

const Hero = () => {
  const localUserState = useAppSelector((state) => state.currentUser.user);

  return (
    <Flex
      mx={'auto'}
      maxW={['90%', '80%', '70%']}
      flexDirection={'column'}
      justifyContent={'center'}
      alignItems={'flex-start'}
      h="90vh"
    >
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

      <Heading
        fontSize={['5xl', '6xl', '7xl', '8xl']}
        bgGradient={`linear(to-r, #fff,${ACCENT_COLOR})`}
        bgClip="text"
        letterSpacing={'tighter'}
        fontWeight={'semibold'}
        lineHeight={1.2}
      >
        {localUserState?.fullName}.
      </Heading>

      <Heading
        fontSize={['3xl', '5xl', '6xl', '7xl']}
        fontWeight={'semibold'}
        lineHeight={1.2}
        bgGradient={`linear(to-r, #f4ebeb,#a19c9c,#e5e0e0)`}
        bgClip="text"
      >
        I love building for the web.
      </Heading>

      <Box
        my={6}
        maxW={['90%', '90%', '60%', '50%']}
        lineHeight={1.6}
        fontSize={['md', 'lg']}
        color={'gray.400'}
        letterSpacing={0.9}
        fontWeight={'thin'}
      >
        <Text>{localUserState?.oneLiner} </Text>
      </Box>
    </Flex>
  );
};

export default Hero;
