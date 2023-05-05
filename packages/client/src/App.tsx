import {Background} from 'client/src/components/Background';
import {router} from 'client/src/routers';
import {setupStore} from 'client/src/stores/store';
import {registerServiceWorker, unregisterServiceWorker} from 'client/src/utils/serviceWorker';
import {RouterProvider} from 'react-router-dom';
import {Provider} from 'react-redux';
import 'client/src/styles/errorsPages.scss';

if (process.env.NODE_ENV === 'production') {
	registerServiceWorker();
} else {
	unregisterServiceWorker();
}

const store = setupStore();

export const App = () => {
	return (
		<>
			<Provider store={store}>
				<RouterProvider router={router}/>
				<Background/>
			</Provider>
		</>
	);
};
