import {App} from 'client/src/App';
import React from 'react';
import ReactDOM from 'react-dom/client';
import 'client/src/styles/root.scss';
import 'client/src/styles/app.scss';

ReactDOM.hydrateRoot(
	document.getElementById('root') as HTMLElement,
	<React.StrictMode>
		<App/>
	</React.StrictMode>,
);
