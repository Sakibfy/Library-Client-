import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';

import { Provider } from 'react-redux';
import { store } from './redux/store.ts';
import { RouterProvider } from 'react-router';
import router from './routes/index.tsx';

import { Toaster } from 'react-hot-toast'; // ✅ Import

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <Provider store={store}>
      <>
        <Toaster position="top-right" reverseOrder={false} /> 
        <RouterProvider router={router} />
      </>
    </Provider>
  </StrictMode>
);
