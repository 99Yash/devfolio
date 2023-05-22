import { UserDoc } from '@/models/user.model';
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { ProjectDoc } from '../models/project.model';

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
        {
          user: UserDoc;
        },
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
    };
  },
});

export const {
  useFetchUserQuery,
  useUpdateAboutMutation,
  useFetchUserAboutQuery,
  useAddProjectMutation,
  useFetchUserProjectsQuery,
} = userApi;
export { userApi };
