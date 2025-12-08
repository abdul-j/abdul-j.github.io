import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import {
  createBrowserRouter,
  RouterProvider,
  Outlet
} from 'react-router';

import './index.css';
import Home from './home';
import Contact from './contact';
import About from './about';
import Works from './works';
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
      path: '/works',
      element: <Outlet />,
      children: [
        {
          index: true,
          Component: Works
        },
        {
          path: '/works/poems'
          // Component: Poems
        },
        {
          path: '/works/music'
          // Component: Music
        },
        {
          path: '/works/tools'
          // Component: Tools
        }
      ],
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
