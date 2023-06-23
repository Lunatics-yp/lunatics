import {App} from 'client/src/App';
import {renderToString} from 'react-dom/server';
import {StaticRouter} from 'react-router-dom/server';
import {Provider} from 'react-redux';
import {setupStore} from 'client/src/stores/store';
import {TSsrRenderProps} from './typing';

export const render: TSsrRenderProps = (url) => {
	const store = setupStore();
	const initialState = store.getState();
	const renderResult = renderToString(
		<Provider store={store}>
			<StaticRouter location={url}>
				<App/>
			</StaticRouter>
		</Provider>,
	);
	return [initialState, renderResult];
};
