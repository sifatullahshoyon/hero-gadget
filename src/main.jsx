import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import {  createBrowserRouter,  RouterProvider, } from "react-router-dom";
import App from './App';
import About from './components/About';
import Home from './components/Home';
import ErrorPage from './components/ErrorPage';
import Shop from './components/Shop';
import Cart from './components/Cards/Cart';
import { productAndCartData } from './loaders/getCart&ProductsData';
import { Toaster } from 'react-hot-toast';



const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    errorElement: <ErrorPage />,
    loader: productAndCartData,
    children: [
      {
        path: '/',
        element: <Home />,
      },
      {
        path: '/shop',
        element: <Shop />,
        loader: () => fetch('products.json'),
      },
      {
        path: '/cart',
        element: <Cart />,
      },
      {
        path: '/about',
        element: <About />,
      },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <Toaster />
    <RouterProvider router={router} />
  </React.StrictMode>,
)
