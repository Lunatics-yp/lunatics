import React from 'react';
import ReactDOM from 'react-dom/client';
import {RouterProvider} from 'react-router-dom';
import {Provider} from 'react-redux';
import {registerServiceWorker, unregisterServiceWorker} from 'client/src/utils/serviceWorker';
import {setupStore} from 'client/src/stores/store';
import {router} from 'client/src/routers';
import {Background} from 'client/src/components/Background';
import 'client/src/styles/root.scss';
import 'client/src/styles/app.scss';

if (process.env.NODE_ENV === 'production') {
	registerServiceWorker();
} else {
	unregisterServiceWorker();
}

const store = setupStore();

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(

	<React.StrictMode>
		<Provider store={store}>
			<RouterProvider router={router}/>
			<Background/>
		</Provider>
	</React.StrictMode>,

);
