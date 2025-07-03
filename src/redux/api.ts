import { fetchBaseQuery } from '@reduxjs/toolkit/query/react';

import { borrowApi } from '../features/borrows/borrow.api';
import { bookApi } from '../features/books/book.api';

export const baseQuery = fetchBaseQuery({
  baseUrl: 'http://localhost:5000/api/books',
});

export const apiReducers = {
  [bookApi.reducerPath]: bookApi.reducer,
  [borrowApi.reducerPath]: borrowApi.reducer,
};

export const apiMiddlewares = [
  bookApi.middleware,
  borrowApi.middleware,
];
