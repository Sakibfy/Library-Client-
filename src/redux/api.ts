import { fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { borrowApi } from '../features/borrows/borrow.api';
import { bookApi } from '../features/books/book.api';


const baseUrl = import.meta.env.VITE_API_BASE_URL;

export const baseQuery = fetchBaseQuery({
  baseUrl: baseUrl, 
});

export const apiReducers = {
  [bookApi.reducerPath]: bookApi.reducer,
  [borrowApi.reducerPath]: borrowApi.reducer,
};

export const apiMiddlewares = [
  bookApi.middleware,
  borrowApi.middleware,
];
