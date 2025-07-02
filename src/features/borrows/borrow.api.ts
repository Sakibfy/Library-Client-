import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import type { IBorrow, IBorrowSummary } from './borrow.tyoes';


export const borrowApi = createApi({
  reducerPath: 'borrowApi',
  baseQuery: fetchBaseQuery({ baseUrl: 'http://localhost:5000/api/' }),
  tagTypes: ['Borrow'],
  endpoints: (builder) => ({
    // ১. একটি বই borrow করা
    borrowBook: builder.mutation<IBorrow, { bookId: string; data: { quantity: number; dueDate: string } }>({
      query: ({ bookId, data }) => ({
        url: `borrows/${bookId}`,
        method: 'POST',
        body: data,
      }),
      invalidatesTags: ['Borrow'],
    }),

    // ২. borrow summary পাওয়া
    getBorrowSummary: builder.query<IBorrowSummary[], void>({
      query: () => 'borrows/summary',
      providesTags: ['Borrow'],
    }),
  }),
});

export const {
  useBorrowBookMutation,
  useGetBorrowSummaryQuery,
} = borrowApi;
