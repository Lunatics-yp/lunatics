import {App} from 'client/src/App';
import {renderToString} from 'react-dom/server';
import {TSsrRenderProps} from './typing';

export const render: TSsrRenderProps = (url) => {
	return renderToString(
		<App/>,
	);
};
