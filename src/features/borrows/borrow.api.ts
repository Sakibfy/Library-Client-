import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import type { IBorrow, IBorrowSummary } from './borrow.tyoes';


export const borrowApi = createApi({
  reducerPath: 'borrowApi',
  baseQuery: fetchBaseQuery({ baseUrl: 'http://localhost:5000/api/' }),
  tagTypes: ['Borrow'],
  endpoints: (builder) => ({
    borrowBook: builder.mutation<IBorrow, { bookId: string; data: { quantity: number; dueDate: string } }>({
      query: ({ bookId, data }) => ({
        url: `borrow/${bookId}`, // ✅ Correct route
        method: 'POST',
        body: data,
      }),
      invalidatesTags: ['Borrow'],
    }),

    getBorrowSummary: builder.query<IBorrowSummary[], void>({
      query: () => 'borrow/summary/all',
      providesTags: ['Borrow'],
    }),
  }),
});

export const { useBorrowBookMutation, useGetBorrowSummaryQuery } = borrowApi;
