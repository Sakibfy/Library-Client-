import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import type { IBook } from './book.types';


export const bookApi = createApi({
  reducerPath: 'bookApi',
  baseQuery: fetchBaseQuery({ baseUrl: 'http://localhost:5000/api/book' }),
  tagTypes: ['Books'],
  endpoints: (builder) => ({
    getBooks: builder.query<IBook[], void>({
      query: () => 'books',
      providesTags: ['Books'],
    }),

    getBookById: builder.query<IBook, string>({
      query: (id) => `books/${id}`,
    }),

    addBook: builder.mutation<IBook, Partial<IBook>>({
      query: (newBook) => ({
        url: 'books',
        method: 'POST',
        body: newBook,
      }),
      invalidatesTags: ['Books'],
    }),

    updateBook: builder.mutation<IBook, { id: string; updatedData: Partial<IBook> }>({
      query: ({ id, updatedData }) => ({
        url: `books/${id}`,
        method: 'PUT',
        body: updatedData,
      }),
      invalidatesTags: ['Books'],
    }),

    deleteBook: builder.mutation<{ success: boolean; id: string }, string>({
      query: (id) => ({
        url: `books/${id}`,
        method: 'DELETE',
      }),
      invalidatesTags: ['Books'],
    }),
  }),
});

export const {
  useGetBooksQuery,
  useGetBookByIdQuery,
  useAddBookMutation,
  useUpdateBookMutation,
  useDeleteBookMutation,
} = bookApi;
