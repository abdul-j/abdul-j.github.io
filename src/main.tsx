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
import Poems from './poems';
import Archive from './archive';
import PoemPage from './poempage';
import Music from './music';
import Tools from './tools';
import Saw from './saw';

import Alana from './alana/home';


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
      path: 'works',
      element: <Outlet />,
      children: [
        {
          index: true,
          Component: Works
        },
        {
          path: 'poems',
          element: <Outlet />,
          children: [
            {
              index: true,
              Component: Poems
            },
            {
              path: 'archive',
              element: <Outlet />,
              children: [
                {
                  index: true,
                  Component: Archive 
                },
                {
                  path: ':slug',   
                  Component: PoemPage
                }
              ]
            }
          ]
        },
        {
          path: 'music',
          element: <Outlet />,
          children: [
            {
              index: true,
              Component: Music
            }
          ]
        },
        {
          path: 'tools',
          element: <Outlet />,
          children: [
            {
              index: true,
              Component: Tools
            },
            {
              path: 'saw',
              Component: Saw
            }
          ]
        }
      ]
    },
    {
      path: '/about',
      Component: About
    },
    {
      path: '/contact',
      Component: Contact
    },
    {
      path: '/alana/*',
      element: <Outlet />,
      children: [
        {
          index: true,
          Component: Alana
        }
      ]   
      
    }
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
