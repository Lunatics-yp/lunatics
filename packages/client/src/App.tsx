import {Provider} from 'react-redux';
import {Background} from 'client/src/components/Background';
import {setupStore} from 'client/src/stores/store';
import {registerServiceWorker} from 'client/src/utils/serviceWorker';
import {SSRRouter} from 'client/src/routers/SSRRouter';
import 'client/src/styles/errorsPages.scss';

if (process.env.NODE_ENV === 'production') {
	registerServiceWorker();
}

const store = setupStore();

export const App = () => {
	return (
		<Provider store={store}>
			<SSRRouter/>
			<Background/>
		</Provider>
	);
};
