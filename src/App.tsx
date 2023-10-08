import React from 'react';
import logo from './logo.svg';
import './App.css';
import AppRoutes from './feature/crm/routes';
import { Provider } from 'react-redux';
import { store } from './store/store';
import { RouterProvider } from 'react-router-dom';

function App() {
  const routes = [
    {
      path: '',
      element: (<App></App>),
      children:[
        {
          
        }
      ]
    }

  ]
  return (
    // <RouterProvider router={ }>

      <Provider store={store}>
        <AppRoutes></AppRoutes>
      </Provider>
    // </RouterProvider>
  )
}

export default App;
