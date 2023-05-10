import {App} from 'client/src/App';
import {renderToString} from 'react-dom/server';
import {Provider} from 'react-redux';

import {TSsrRenderProps} from './typing';

export const render: TSsrRenderProps = (url, store) => {
	return renderToString(
		<Provider store={store}>
			<App/>
		</Provider>,
	);
};
