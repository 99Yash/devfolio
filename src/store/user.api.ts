import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

const userApi = createApi({
  reducerPath: 'user',
  baseQuery: fetchBaseQuery({ baseUrl: 'http://localhost:5000' }),
  endpoints: (builder) => ({
    fetchUser: builder.query({
      query: (user) => {
        return {
          url: '/api/auth',
          params: { userId: user.user.id },
          method: 'GET',
        };
      },
    }),
  }),
});

export const { useFetchUserQuery } = userApi;
export { userApi };
