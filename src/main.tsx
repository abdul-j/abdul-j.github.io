import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import {
  createBrowserRouter,
  RouterProvider,
} from 'react-router';

import './index.css';
import Home from './home';
import Contact from './contact';
import About from './about';
import { ErrorBoundary } from './404';

// Create the router
const router = createBrowserRouter(
  [
    {
      path: '/',
      Component: Home,
      errorElement: <ErrorBoundary error={404}/>,
    },
    {
      path: '/about',
      Component: About
    },
    {
      path: '/contact',
      Component: Contact
    },
  ],
  {
    basename: '/',
  }
);

// Render your app
createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>
);
