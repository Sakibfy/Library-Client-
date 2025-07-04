import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

// ✅ Import .env variable
const baseUrl = import.meta.env.VITE_API_BASE_URL;

export const bookApi = createApi({
  reducerPath: 'bookApi',
  baseQuery: fetchBaseQuery({ baseUrl }), 
  tagTypes: ['Books'],
  endpoints: (builder) => ({
    getBooks: builder.query({
      query: () => 'books',
      providesTags: ['Books'],
    }),

    getBookById: builder.query({
      query: (id: string) => `books/${id}`,
      providesTags: (id) => [{ type: 'Books', id }],
    }),

    addBook: builder.mutation({
      query: (newBook) => ({
        url: 'books',
        method: 'POST',
        body: newBook,
      }),
      invalidatesTags: ['Books'],
    }),

    updateBook: builder.mutation({
      query: ({ id, updatedData }) => ({
        url: `books/${id}`,
        method: 'PUT',
        body: updatedData,
      }),
      invalidatesTags: ['Books'],
    }),

    deleteBook: builder.mutation({
      query: (id: string) => ({
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
