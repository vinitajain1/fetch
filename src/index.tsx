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
import { setupStore } from './redux/store';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import NotificationSnackbar from './components/NotificationSnackbar';
export const routes = [
  {
    path:"/dashboard",
    element:<App/>,
    children:[
      {
        path:"browse",
        element:<Browse/>
      },
      {
        path:"favorites",
        element:<Favorites/>
      }
    ]
  },
  {
    path:"/",
    element: <Login/>
  },
]
const router = createBrowserRouter(routes)

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
const store = setupStore();
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
