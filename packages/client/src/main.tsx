import React from 'react';
import ReactDOM from 'react-dom/client';
import {Background} from 'client/src/components/Background';
import {RouterProvider} from 'react-router-dom';
import {router} from 'client/src/routers';

import 'client/src/styles/root.scss';
import 'client/src/styles/app.scss';

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(

	<React.Fragment>
		<RouterProvider router={router}/>
		<Background/>
	</React.Fragment>,

);
