import { useAppDispatch, useAppSelector } from '@/hooks/redux';
import { axiosClient } from '@/lib/utils/axiosInstance';
import { ExperienceDoc } from '@/models/experience.model';
import { ProjectDoc } from '@/models/project.model';
import { SocialDoc } from '@/models/social.model';
import { TechDoc } from '@/models/tech.model';
import { UserDoc } from '@/models/user.model';
import { setCurrentUser } from '@/store/user.slice';
import { Box, Skeleton } from '@chakra-ui/react';
import Head from 'next/head';
import { useEffect } from 'react';

import AboutSection from '@/components/portfolio/AboutSection';
import ExperienceSection from '@/components/portfolio/ExperienceSection';
import ProjectsSection from '@/components/portfolio/ProjectsSection';
import TopSection from '@/components/portfolio/TopSection';
import { setExperiences } from '@/store/experiences.slice';
import { setProjects } from '@/store/projects.slice';
import { setSocialLinks } from '@/store/socials.slice';
import { setTechStack } from '@/store/tech.slice';
import { useRouter } from 'next/router';
import { useState } from 'react';
import Socials from '@/components/portfolio/components/Socials';
import { Inter } from 'next/font/google';

const inter = Inter({
  weight: ['400', '500', '700'],
  display: 'swap',
  subsets: ['latin'],
});

const Portfolio = () => {
  const router = useRouter();

  const dispatch = useAppDispatch();
  const localUserState = useAppSelector((state) => state.currentUser.user);
  const experiencesState = useAppSelector(
    (state) => state.experiences.experiences
  );
  const socialLinksState = useAppSelector((state) => state.socials.socials);
  const projectsState = useAppSelector((state) => state.projects.projects);
  const [profileImgUrl, setProfileImageUrl] = useState('');

  useEffect(() => {
    if (!router.query.userId) return;
    const fetchUserData = async () => {
      try {
        const { data } = await axiosClient.get<{
          mongoUser: UserDoc | null;
          projects: ProjectDoc[];
          experiences: ExperienceDoc[];
          socials: SocialDoc[];
          techStack: TechDoc[];
          clerkUserImage: string;
        }>(`/user/${router.query.userId}`);
        if (!data.mongoUser) return;
        if (data.mongoUser) dispatch(setCurrentUser(data.mongoUser));
        if (data.projects) dispatch(setProjects(data.projects));
        if (data.experiences) dispatch(setExperiences(data.experiences));
        if (data.socials) dispatch(setSocialLinks(data.socials));
        if (data.techStack) dispatch(setTechStack(data.techStack));
        if (data.clerkUserImage) setProfileImageUrl(data.clerkUserImage);
      } catch (err: any) {
        console.log(err);
      }
    };
    fetchUserData();
  }, [dispatch, router.query.userId]);

  return (
    <>
      <Head>
        <title>{`Portfolio ${
          router.query.userId
            ? `| ${localUserState ? localUserState?.fullName : ''}`
            : ''
        }`}</title>
        <meta
          name="Devfolio"
          content="Portfolio generator for developers.Powered by devfolio."
        />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Box
        className={`bg-gradient-to-r from-black via-black to-emerald-950 ${inter.className} `}
        overflow="hidden"
      >
        {!localUserState ? (
          <Skeleton className={`h-1/2 w-2/3`}></Skeleton>
        ) : (
          <TopSection />
        )}
        {!localUserState ? (
          <Skeleton className={`h-2/3 w-3/4`}></Skeleton>
        ) : (
          <AboutSection imageSrc={profileImgUrl} />
        )}
        {!experiencesState ? (
          <Skeleton className={`h-2/3 w-3/4`}></Skeleton>
        ) : (
          <ExperienceSection />
        )}
        {!projectsState ? (
          <Skeleton className={`h-2/3 w-3/4`}></Skeleton>
        ) : (
          <ProjectsSection />
        )}
        {!socialLinksState ? (
          <Skeleton className={`h-2/3 w-3/4`}></Skeleton>
        ) : (
          <Socials />
        )}
      </Box>
    </>
  );
};
export default Portfolio;
