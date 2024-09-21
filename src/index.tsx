import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import Login from './Login';
import Browse from './Browse';
import Favorites from './Favorites';
import { Provider } from 'react-redux';
import store from './redux/store';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import NotificationSnackbar from './components/NotificationSnackbar';
const router = createBrowserRouter([
  {
    path:"/dashboard",
    element:<App/>,
    children:[
      {
        path:"/dashboard/browse",
        element:<Browse/>
      },
      {
        path:"/dashboard/favorites",
        element:<Favorites/>
      }
    ]
  },
  {
    path:"/",
    element: <Login/>
  },
])

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
const queryClient = new QueryClient();
root.render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      <Provider store={store}>
        <RouterProvider router={router}/>
        <NotificationSnackbar/>
      </Provider>
    </QueryClientProvider>
  </React.StrictMode>
);

reportWebVitals();
