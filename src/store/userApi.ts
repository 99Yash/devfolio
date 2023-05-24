import { UserDoc } from '@/models/user.model';
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { ProjectDoc } from '../models/project.model';
import { ExperienceDoc } from '@/models/experience.model';

const userApi = createApi({
  reducerPath: 'user',
  baseQuery: fetchBaseQuery({ baseUrl: '/api' }),
  tagTypes: ['User'],
  endpoints: (builder) => {
    return {
      fetchUser: builder.query<{ user: UserDoc }, null>({
        query: () => {
          return {
            url: `/user/user`,
            method: 'GET',
          };
        },
        providesTags: [{ type: 'User', id: `User` }],
      }),
      fetchUserAbout: builder.query<{ about: string }, null>({
        query: () => {
          return {
            url: `/user/about`,
            method: 'GET',
          };
        },
      }),
      updateAbout: builder.mutation<string, string>({
        query: (about: string) => {
          return {
            url: `/user/about`,
            method: 'PATCH',
            body: {
              about,
            },
          };
        },
        invalidatesTags: [{ type: 'User', id: `User` }],
      }),
      addProject: builder.mutation<
        string,
        {
          project: {
            title: string;
            description?: string;
            techStack: string;
            githubLink: string;
            demoLink?: string;
          };
        }
      >({
        query: ({ project }) => {
          return {
            url: `/user/project`,
            method: 'POST',
            body: {
              project,
            },
          };
        },
        invalidatesTags: [{ type: 'User', id: `User` }],
      }),
      fetchUserProjects: builder.query<{ projects: ProjectDoc[] }, null>({
        query: () => {
          return {
            url: `/user/project`,
            method: 'GET',
          };
        },
      }),
      deleteProject: builder.mutation<string, string>({
        query: (projectId: string) => {
          return {
            url: `/user/project`,
            body: {
              projectId,
            },
            method: 'DELETE',
          };
        },
        invalidatesTags: [{ type: 'User', id: `User` }],
      }),
      fetchUserExperiences: builder.query<
        { experiences: ExperienceDoc[] },
        null
      >({
        query: () => ({
          url: `/user/experience`,
          method: 'GET',
        }),
      }),
      fetchUserTechStack: builder.query<{ techStack: string[] }, null>({
        query: () => ({
          url: `/user/tech`,
          method: 'GET',
        }),
      }),
      updateTechStack: builder.mutation<string, { techStack: string }>({
        query: ({ techStack }) => ({
          url: `/user/tech`,
          method: 'POST',
          body: {
            techStack,
          },
        }),
        invalidatesTags: [{ type: 'User', id: `User` }],
      }),
      addExperience: builder.mutation<
        string,
        {
          experience: {
            position: string;
            companyName: string;
            startDate: {
              month: string;
              year: string;
            };
            endDate: {
              month: string;
              year: string;
            };
            description: string;
          };
        }
      >({
        query: ({ experience }) => ({
          url: `/user/experience`,
          method: 'POST',
          body: {
            experience,
          },
        }),
      }),
    };
  },
});

export const {
  useFetchUserQuery,
  useUpdateAboutMutation,
  useFetchUserAboutQuery,
  useAddProjectMutation,
  useFetchUserProjectsQuery,
  useDeleteProjectMutation,
  useFetchUserExperiencesQuery,
  useFetchUserTechStackQuery,
  useUpdateTechStackMutation,
  useAddExperienceMutation,
} = userApi;
export { userApi };
