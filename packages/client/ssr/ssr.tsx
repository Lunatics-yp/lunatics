import {App} from 'client/src/App';
import {renderToString} from 'react-dom/server';
import {StaticRouter} from 'react-router-dom/server';
import {TSsrRenderProps} from './typing';

export const render: TSsrRenderProps = (url: string, data: unknown) => {
	console.log('data for redux:', data);
	return renderToString(
		<StaticRouter location={url}>
			<App/>
		</StaticRouter>,
	);
};
