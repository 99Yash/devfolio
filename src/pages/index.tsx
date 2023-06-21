import About from '@/components/main/About';
import DefaultMainSection from '@/components/main/DefaultMainSection';
import Experiences from '@/components/main/Experiences';
import Projects from '@/components/main/Projects';
import TechStack from '@/components/main/TechStack';
import TopUserProfile from '@/components/main/TopUserProfile';
import SignInBtn from '@/components/utils/SignInBtn';
import { useAppDispatch, useAppSelector } from '@/hooks/redux';
import { axiosClient } from '@/lib/utils/axiosInstance';
import { UserDoc } from '@/models/user.model';
import { setCurrentUser } from '@/store/user.slice';
import { Box, Flex, Heading } from '@chakra-ui/react';
import { UserButton, useAuth } from '@clerk/nextjs';
import { useEffect } from 'react';

export default function Home() {
  const { isLoaded, isSignedIn } = useAuth();
  const dispatch = useAppDispatch();
  const localUserState = useAppSelector((state) => state.currentUser.user);

  useEffect(() => {
    if (!isSignedIn) return;
    const fetchUser = async () => {
      try {
        const { data: fetchedUser, status } = await axiosClient.get<UserDoc>(
          `/user/user`
        );
        if (status === 304) {
          console.log('304');
          return;
        }
        dispatch(setCurrentUser(fetchedUser));
      } catch (err: any) {
        console.log(err);
      }
    };
    fetchUser();
  }, [dispatch, isSignedIn]);
  return (
    <>
      {!isSignedIn && (
        <Flex
          minH={'full'}
          flexDir={'column'}
          gap={8}
          justifyContent={'flex-start'}
          alignItems={'center'}
          py={16}
        >
          <SignInBtn />
        </Flex>
      )}
      {isSignedIn && isLoaded && (
        //* header
        <Flex
          px={4}
          pt={4}
          gap={4}
          alignItems={'center'}
          justifyContent={'space-between'}
        >
          <Heading
            fontSize={['2xl', '3xl']}
            bg={
              'linear-gradient(90deg, #2f53b5 0%, #1773ad 35%, rgba(0,212,255,1) 100%)'
            }
            bgClip={'text'}
          >
            Devfolio
          </Heading>
          <Box border={'1px solid gray.100'}>
            <UserButton />
          </Box>
        </Flex>
      )}
      <Flex
        minH={'full'}
        flexDir={'column'}
        gap={8}
        justifyContent={'flex-start'}
        alignItems={'center'}
        py={16}
      >
        {isSignedIn && isLoaded && (
          <>
            <Flex
              flexDir={'column'}
              gap={12}
              minW={['100%', '2xl']}
              maxW={['100%', '3xl']}
              px={[4, 8]}
            >
              {localUserState ? <TopUserProfile /> : null}
              {localUserState?.about && localUserState.about !== '' ? (
                <About />
              ) : (
                <DefaultMainSection sectionTitle={'About'} />
              )}
              {localUserState?.experiences?.length ? (
                <Experiences />
              ) : (
                <DefaultMainSection sectionTitle={'Experiences'} />
              )}
              {localUserState?.techStack?.length > 0 ? (
                <TechStack />
              ) : (
                <DefaultMainSection sectionTitle={'Tech Stack'} />
              )}
              {localUserState?.projects?.length ? (
                <Projects />
              ) : (
                <DefaultMainSection sectionTitle={'Projects'} />
              )}
            </Flex>
          </>
        )}
      </Flex>
    </>
  );
}
