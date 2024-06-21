import React from 'react';
import ReactDOM from 'react-dom/client';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import './index.css';

import HomePage from '../pages/HomePage.jsx';
import PostsPage from '../pages/PostsPage.jsx';
import CreatePostPage from '../pages/CreatePostPage.jsx';
import SinglePostPage from '../pages/SinglePostPage.jsx';

// Definizione delle rotte
const routes = [
  {
    path: '/',
    element: <HomePage />
  },
  {
    path: '/posts',
    element: <PostsPage />
  },
  {
    path: '/create',
    element: <CreatePostPage />
  },
  {
    path: '/posts/:slug',
    element: <SinglePostPage />
  },
];

// Creazione del router
const router = createBrowserRouter(routes);

// Renderizzazione dell'applicazione
ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
