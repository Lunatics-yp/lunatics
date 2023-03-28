import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import { TestPage } from './pages/TestPage';
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";

import 'client/src/styles/root.scss';
import 'client/src/styles/app.scss';

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
  },
  {
    path: "/test",
    element: <TestPage />,
  },
]);

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
