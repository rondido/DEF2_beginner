//페이지 관리
import { RouterProvider, createBrowserRouter } from 'react-router-dom'
import Home from './pages/Home.tsx'
import About from './pages/About.tsx'
import MovieDetails from './pages/MovieDetails.tsx'
import DefaultLayout from './layouts/Default.tsx'
import Movies from './pages/Movies.tsx'
import NotFound from './pages/NotFound.tsx'
import SignIn from './pages/SignIn.tsx'

const router = createBrowserRouter([
  {
    element: <DefaultLayout />,
    children: [
      {
        path: '/',
        element: <Home />
      },
      {
        path: '/about',
        element: <About />
      },
      {
        path: '/movies',
        element: <Movies />,
        children: [
          {
            path: '/movies/:movieId',
            element: <MovieDetails />
          }
        ]
      },
      {
        path: '/signin',
        element: <SignIn />
      }
    ]
  },

  {
    path: '*',
    element: <NotFound />
  }
])

export default function Router() {
  return <RouterProvider router={router} />
}

//http://localhost:5173/about - BrowserRouter
//http://localhost:5173/#/about - HashRouter
//http://localhost:5173/        - Main
//http://localhost:5173/about   - about
