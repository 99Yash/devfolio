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
import { useAppDispatch, useAppSelector } from '@/hooks/redux';

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
        const { data: fetchedUser } = await axiosClient.get<{
          user: UserDoc;
          clerkUserImage: string;
        }>(`/user/user`);
        dispatch(setCurrentUser(fetchedUser.user));
        setProfileImageUrl(fetchedUser.clerkUserImage);
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
        const error: AxiosError = err;
        if (error.response?.status === 404) {
          router.push('/404');
        }
      }
    };
    fetchUserData();
  }, [dispatch, router, router.query.userId]);

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
export default Portfolio;
