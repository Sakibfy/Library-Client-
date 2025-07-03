import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const bookApi = createApi({
  reducerPath: 'bookApi',
  baseQuery: fetchBaseQuery({ baseUrl: 'http://localhost:5000/api/' }), // তোমার backend base URL
  tagTypes: ['Books'], // cache invalidation-এর জন্য
  endpoints: (builder) => ({
    
    // 📚 1. Get All Books
    getBooks: builder.query({
      query: () => 'books',
      providesTags: ['Books'],
    }),

    // 🔍 2. Get Single Book
    getBookById: builder.query({
      query: (id: string) => `books/${id}`,
      providesTags: (result, error, id) => [{ type: 'Books', id }],
    }),

    // ➕ 3. Add New Book
    addBook: builder.mutation({
      query: (newBook) => ({
        url: 'books',
        method: 'POST',
        body: newBook,
      }),
      invalidatesTags: ['Books'],
    }),

    // ✏️ 4. Update Book
    updateBook: builder.mutation({
      query: ({ id, updatedData }) => ({
        url: `books/${id}`,       // PUT /api/books/:id
        method: 'PUT',
        body: updatedData,
      }),
      invalidatesTags: ['Books'],
    }),
  


    // 🗑️ 5. Delete Book
    deleteBook: builder.mutation({
      query: (id: string) => ({
        url: `books/${id}`,
        method: 'DELETE',
      }),
      invalidatesTags: ['Books'],
    }),
  }),
});

// 🔁 Export auto-generated hooks
export const {
  useGetBooksQuery,
  useGetBookByIdQuery,
  useAddBookMutation,
  useUpdateBookMutation,
  useDeleteBookMutation,
} = bookApi;
