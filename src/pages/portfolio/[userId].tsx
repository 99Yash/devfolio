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
import Socials from '@/components/portfolio/components/Socials';
import { setExperiences } from '@/store/experiences.slice';
import { setProjects } from '@/store/projects.slice';
import { setSocialLinks } from '@/store/socials.slice';
import { setTechStack } from '@/store/tech.slice';
import { Inter } from 'next/font/google';
import { useRouter } from 'next/router';
import { useState } from 'react';
import { AxiosError } from 'axios';

const inter = Inter({
  weight: ['400', '500', '700'],
  display: 'swap',
  subsets: ['latin'],
});

type InitialData = {
  user: UserDoc;
  clerkUserImage: string;
  socials: SocialDoc[];
  experiences: ExperienceDoc[];
  techStack: TechDoc[];
  projects: ProjectDoc[];
};

const Portfolio = ({ initialData }: { initialData: InitialData }) => {
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
    dispatch(setCurrentUser(initialData.user));
    setProfileImageUrl(initialData.clerkUserImage);
    dispatch(setSocialLinks(initialData.socials ? initialData.socials : []));
    dispatch(
      setExperiences(initialData.experiences ? initialData.experiences : [])
    );
    dispatch(setTechStack(initialData.techStack ? initialData.techStack : []));
    dispatch(setProjects(initialData.projects ? initialData.projects : []));
  }, [dispatch, initialData]);

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
        {localUserState?.fullName || localUserState?.oneLiner ? (
          <TopSection />
        ) : (
          <Skeleton className={`h-1/2 w-2/3`}></Skeleton>
        )}
        {localUserState?.about ? (
          <AboutSection imageSrc={profileImgUrl} />
        ) : (
          <Skeleton className={`h-2/3 w-3/4`}></Skeleton>
        )}
        {experiencesState.length > 0 ? (
          <ExperienceSection />
        ) : (
          <Skeleton className={`h-2/3 w-3/4`}></Skeleton>
        )}
        {projectsState.length > 0 ? (
          <ProjectsSection />
        ) : (
          <Skeleton className={`h-2/3 w-3/4`}></Skeleton>
        )}
        {socialLinksState.length > 0 ? (
          <Socials />
        ) : (
          <Skeleton className={`h-2/3 w-3/4`}></Skeleton>
        )}
      </Box>
    </>
  );
};

export async function getServerSideProps() {
  try {
    const { data: fetchedUser } = await axiosClient.get<{
      user: UserDoc;
      clerkUserImage: string;
    }>(`/user/user`);

    const { data: fetchedSocials } = await axiosClient.get<SocialDoc[] | null>(
      '/user/socials'
    );
    const { data: fetchedExperiences } = await axiosClient.get<{
      experiences: ExperienceDoc[];
    }>(`/user/experience`);

    const { data: fetchedTechStack } = await axiosClient.get<TechDoc[] | null>(
      `/user/tech`
    );

    const { data: fetchedProjects } = await axiosClient.get<{
      projects: ProjectDoc[];
    }>(`/user/project`);

    return {
      props: {
        initialData: {
          user: fetchedUser.user,
          clerkUserImage: fetchedUser.clerkUserImage,
          socials: fetchedSocials ? fetchedSocials : [],
          experiences: fetchedExperiences.experiences,
          techStack: fetchedTechStack ? fetchedTechStack : [],
          projects: fetchedProjects.projects,
        },
      },
    };
  } catch (err: any) {
    const error: AxiosError = err;
    if (error.response?.status === 404) {
      return {
        redirect: {
          destination: '/404',
          permanent: false,
        },
      };
    }

    return {
      props: {
        initialData: {} as InitialData,
      },
    };
  }
}

export default Portfolio;
