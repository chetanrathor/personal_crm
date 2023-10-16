import React from 'react';
import logo from './logo.svg';
import './App.css';
import AppRoutes from './feature/crm/routes';
import { Provider } from 'react-redux';
import { store } from './store/store';
import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import Crm from './feature/crm/routes/Crm';
import Notes from './feature/crm/routes/Notes';

function App() {
  const routes = createBrowserRouter([
    {
      path: '/',
      element: (<AppRoutes></AppRoutes>),
      children:[
        {
          path:'/crm',
          element:(<Crm></Crm>)
        },
        {
          path:'/notes',
          element:(<Notes></Notes>)
        }
      ]

    }
  ])
  return (

    <Provider store={store}>
      <RouterProvider router={routes}></RouterProvider>
    </Provider>

  )
}

export default App;
