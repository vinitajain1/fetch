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
root.render(
  
  <React.StrictMode>
      <Provider store={store}>
        <RouterProvider router={router}/>
      </Provider>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
