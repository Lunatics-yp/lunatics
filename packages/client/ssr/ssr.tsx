import {App} from 'client/src/App';
import {renderToString} from 'react-dom/server';
import {Provider} from 'react-redux';

import {setupStore} from 'client/src/stores/store';
import {TSsrRenderProps} from './typing';

export const render: TSsrRenderProps = (url: string) => {
	const store = setupStore();
	const initialState = store.getState();
	const appHtml = renderToString(
		<Provider store={store}>
			<App/>
		</Provider>,
	);
	return {initialState, appHtml};
};
