import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export  const charAPI = createApi({
    reducerPath: 'charAPI',
    baseQuery: fetchBaseQuery({ baseUrl: 'https://rickandmortyapi.com/api' }),
    endpoints: (builder) => ({
        getLists: builder.query({
            query: (pageNumber) => `character?page=${pageNumber}`,
            providesTags: ['character'],
        }),
    }),
});

export const {  useGetListsQuery, } = charAPI;