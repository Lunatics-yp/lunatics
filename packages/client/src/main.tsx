import React from 'react';
import ReactDOM from 'react-dom/client';
import {PageExample} from './pages/Example';
import {TestPage} from './pages/TestPage';
import {Background} from 'client/src/components/Background';
import {createBrowserRouter, RouterProvider,} from 'react-router-dom';

import 'client/src/styles/root.scss';
import 'client/src/styles/app.scss';

const router = createBrowserRouter([
	{
		path: '/',
		element: <PageExample/>,
	},
	{
		path: '/test',
		element: <TestPage/>,
	},
]);


ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
	<React.StrictMode>
		<RouterProvider router={router}/>
		<Background/>
	</React.StrictMode>
);
