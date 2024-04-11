import React from 'react'
import ReactDOM from 'react-dom/client'
import { RouterProvider, createBrowserRouter } from 'react-router-dom'
import './index.css'
import './services';

import Home from './routes/Home'
import Movie, { loader as movieLoader } from './routes/Movie'
import Admin from './routes/Admin'
import Root from './routes/Root';

const router = createBrowserRouter([
  {
    path: '/',
    element: <Root />,
    children: [
      {
        path: '/',
        element: <Home />,
      },
      {
        path: '/movies/:movieId',
        element: <Movie />,
        loader: movieLoader,
      },
      {
        path: '/admin',
        element: <Admin />,
      },
    ],
  },
])

ReactDOM.createRoot(document.getElementById('root')).render(
  <RouterProvider router={router} />
)
