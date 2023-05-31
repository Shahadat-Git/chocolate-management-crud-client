import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
import {
  createBrowserRouter,
  RouterProvider
} from 'react-router-dom';
import Main from './layouts/Main';
import Home from './components/home';
import AddChocolate from './components/AddChocolate';
import UpdateChocolate from './components/UpdateChocolate';

const router = createBrowserRouter([
  {
    path: '/',
    element: <Main></Main>,
    children: [
      {
        path: '/',
        element: <Home></Home>,
        loader: () => fetch('http://localhost:5000/chocolates')
      },
      {
        path: '/add-chocolate',
        element: <AddChocolate></AddChocolate>
      },
      {
        path: '/update-chocolate/:id',
        element: <UpdateChocolate></UpdateChocolate>,
        loader: ({ params }) => fetch(`http://localhost:5000/chocolates/${params.id}`)
      }
    ]
  }
])

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <RouterProvider router={router}>

    </RouterProvider>
  </React.StrictMode>,
)
