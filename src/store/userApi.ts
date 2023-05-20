import { UserDoc } from '@/models/user.model';
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

const userApi = createApi({
  reducerPath: 'user',
  baseQuery: fetchBaseQuery({ baseUrl: '/api' }),
  tagTypes: ['User'],
  endpoints: (builder) => {
    return {
      fetchUser: builder.query<UserDoc, string>({
        query: (clerkUserId: string) => {
          return {
            url: `/user/${clerkUserId}`,
            method: 'GET',
          };
        },
        providesTags: [{ type: 'User', id: `User` }],
      }),
    };
  },
});

export const { useFetchUserQuery } = userApi;
export { userApi };
