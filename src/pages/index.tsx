import About from '@/components/main/About';
import DefaultMainSection from '@/components/main/DefaultMainSection';
import Experiences from '@/components/main/Experiences';
import Projects from '@/components/main/Projects';
import TechStack from '@/components/main/TechStack';
import TopUserProfile from '@/components/main/TopUserProfile';
import { useAppDispatch, useAppSelector } from '@/hooks/redux';
import { axiosClient } from '@/lib/utils/axiosInstance';
import { ExperienceDoc } from '@/models/experience.model';
import { ProjectDoc } from '@/models/project.model';
import { SocialDoc } from '@/models/social.model';
import { TechDoc } from '@/models/tech.model';
import { UserDoc } from '@/models/user.model';
import { setExperiences } from '@/store/experiences.slice';
import { setProjects } from '@/store/projects.slice';
import { setSocialLinks } from '@/store/socials.slice';
import { setTechStack } from '@/store/tech.slice';
import { setCurrentUser } from '@/store/user.slice';
import { Box, Flex, Heading, Spinner } from '@chakra-ui/react';
import {
  SignIn,
  SignedIn,
  SignedOut,
  UserButton,
  useAuth,
} from '@clerk/nextjs';
import { useEffect } from 'react';

export default function Home() {
  const { isSignedIn } = useAuth();
  const dispatch = useAppDispatch();

  const localUserState = useAppSelector((state) => state.currentUser.user);
  const localExperienceState = useAppSelector(
    (state) => state.experiences.experiences
  );
  const localTechStack = useAppSelector((state) => state.techStack.techStack);
  const localProjectsState = useAppSelector((state) => state.projects.projects);

  useEffect(() => {
    if (!isSignedIn) return;
    const fetchUser = async () => {
      try {
        const { data: fetchedUser } = await axiosClient.get<UserDoc>(
          `/user/user`
        );
        const { data: fetchedExperiences } = await axiosClient.get<{
          experiences: ExperienceDoc[];
        }>(`/user/experience`);
        const { data: fetchedTechStack } = await axiosClient.get<
          TechDoc[] | null
        >(`/user/tech`);
        const { data: fetchedProjects } = await axiosClient.get<{
          projects: ProjectDoc[];
        }>(`/user/project`);
        const { data: fetchedSocials } = await axiosClient.get<
          SocialDoc[] | null
        >('/user/socials');
        dispatch(setSocialLinks(fetchedSocials ? fetchedSocials : []));
        dispatch(setCurrentUser(fetchedUser));
        dispatch(setExperiences(fetchedExperiences.experiences));
        dispatch(setTechStack(fetchedTechStack ? fetchedTechStack : []));
        dispatch(setProjects(fetchedProjects.projects));
      } catch (err: any) {
        console.log(err);
      }
    };
    fetchUser();
  }, [dispatch, isSignedIn]);

  return (
    <>
      <SignedOut>
        <Flex
          minH={'full'}
          flexDir={'column'}
          gap={8}
          justifyContent={'flex-start'}
          alignItems={'center'}
          py={16}
        >
          <SignIn />
        </Flex>
      </SignedOut>

      <SignedIn>
        <Flex
          px={4}
          pt={4}
          gap={4}
          alignItems={'center'}
          justifyContent={'space-between'}
        >
          <Heading
            fontSize={['3xl', '4xl']}
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

        <Flex
          minH={'full'}
          flexDir={'column'}
          gap={8}
          justifyContent={'flex-start'}
          alignItems={'center'}
          py={16}
        >
          {isSignedIn && (
            <Flex
              flexDir={'column'}
              gap={12}
              fontSize={'lg'}
              minW={['100%', '2xl']}
              maxW={['100%', '3xl']}
              px={[4, 8]}
            >
              {localUserState ? <TopUserProfile /> : null}
              {localUserState?.about !== '' ? (
                <About />
              ) : (
                <DefaultMainSection sectionTitle={'About'} />
              )}
              {localExperienceState.length > 0 ? (
                <Experiences />
              ) : (
                <DefaultMainSection sectionTitle={'Experiences'} />
              )}
              {localTechStack?.length > 0 ? (
                <TechStack />
              ) : (
                <DefaultMainSection sectionTitle={'Tech Stack'} />
              )}
              {localProjectsState?.length > 0 ? (
                <Projects />
              ) : (
                <DefaultMainSection sectionTitle={'Projects'} />
              )}
            </Flex>
          )}
        </Flex>
      </SignedIn>
    </>
  );
}
