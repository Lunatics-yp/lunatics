import {App} from 'client/src/App';
import {StrictMode} from 'react';
import {hydrateRoot} from 'react-dom/client';
import 'client/src/styles/root.scss';
import 'client/src/styles/app.scss';

import {BrowserRouter} from 'react-router-dom';

hydrateRoot(
	document.getElementById('root') as HTMLElement,
	<StrictMode>

		<BrowserRouter>
			<App/>
		</BrowserRouter>
	</StrictMode>,
);
