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
import { SignedIn, SignedOut, UserButton, useAuth } from '@clerk/nextjs';
import { useEffect, useState } from 'react';
import Marketing from '@/components/main/Marketing';

export default function Home({
  data,
}: {
  data: {
    opening: {
      heading: string;
      subheading: string;
    };
    middle: {
      highlight: string;
      heading: string;
      subTitle: string;
      text: string;
      endText: string;
    };
    end: {
      highlight: string;
      heading: string;
      subheading: string;
    };
  };
}) {
  const { isSignedIn } = useAuth();
  const dispatch = useAppDispatch();

  const localUserState = useAppSelector((state) => state.currentUser.user);
  const localExperienceState = useAppSelector(
    (state) => state.experiences.experiences
  );
  const localTechStack = useAppSelector((state) => state.techStack.techStack);
  const localProjectsState = useAppSelector((state) => state.projects.projects);
  const [profilePic, setProfilePic] = useState('');

  useEffect(() => {
    if (!isSignedIn) return;
    const fetchUser = async () => {
      try {
        const { data: fetchedUser } = await axiosClient.get<{
          user: UserDoc;
          clerkUserImage: string;
        }>(`/user/user`);
        dispatch(setCurrentUser(fetchedUser.user));
        setProfilePic(fetchedUser.clerkUserImage);
        const { data: fetchedSocials } = await axiosClient.get<
          SocialDoc[] | null
        >('/user/socials');

        dispatch(setSocialLinks(fetchedSocials ? fetchedSocials : []));
        const { data: fetchedExperiences } = await axiosClient.get<{
          experiences: ExperienceDoc[];
        }>(`/user/experience`);
        dispatch(setExperiences(fetchedExperiences.experiences));

        const { data: fetchedTechStack } = await axiosClient.get<
          TechDoc[] | null
        >(`/user/tech`);
        dispatch(setTechStack(fetchedTechStack ? fetchedTechStack : []));

        const { data: fetchedProjects } = await axiosClient.get<{
          projects: ProjectDoc[];
        }>(`/user/project`);
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
        <Marketing data={data} />
      </SignedOut>

      <SignedIn>
        <Flex
          px={4}
          pt={4}
          gap={4}
          display={'flex'}
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
              {localUserState ? (
                <TopUserProfile profilePic={profilePic} />
              ) : (
                <Spinner color="green.400" />
              )}
              {localUserState && localUserState?.about !== '' ? (
                <About />
              ) : (
                <DefaultMainSection sectionTitle={'About'} />
              )}

              {localExperienceState && localExperienceState.length > 0 ? (
                <Experiences />
              ) : (
                <DefaultMainSection sectionTitle={'Experiences'} />
              )}

              {localTechStack && localTechStack?.length > 0 ? (
                <TechStack />
              ) : (
                <DefaultMainSection sectionTitle={'Tech Stack'} />
              )}

              {localProjectsState && localProjectsState.length > 0 ? (
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

export async function getServerSideProps(ctx: any) {
  const data = {
    opening: {
      heading: "Share your work,we'll do the rest.",
      subheading:
        'Showcase your skills and achievements  Create a stunning online presence.',
    },
    middle: {
      highlight: 'Focus on what you love.',
      heading: 'Catapult your Online Presence',
      subTitle:
        " Don't venture outside your expertise if it's not your passion.",
      text: 'Show your skills as a backend or a junior developer in the best possible light. Devfolio was purposefully designed for you to create a captivating online presence without friction. Include links to your LinkedIn, Twitter, and GitHub profiles to connect seamlessly with potential employers and collaborators. Do not settle for a lackluster online presence.',
      endText: 'Elevate your game.',
    },
    end: {
      highlight: 'Cut the Clutter.',
      heading: 'Take Control.',
      subheading: 'Keep your sites seen without spending a cent.',
    },
  };

  return {
    props: {
      data,
    },
  };
}
