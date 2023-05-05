import {App} from 'client/src/App';
import {renderToString} from 'react-dom/server';

import {StaticRouter} from 'react-router-dom/server';

export function render(url: string) {
	return renderToString(
		<StaticRouter location={url}>
			<App/>
		</StaticRouter>,
	);
}
