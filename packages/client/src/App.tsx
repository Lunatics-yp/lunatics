// import {Background} from 'client/src/components/Background';
// import React from 'react';
// import {router} from 'client/src/routers';
import {setupStore} from 'client/src/stores/store';
// import {registerServiceWorker, unregisterServiceWorker} from 'client/src/utils/serviceWorker';
// import {RouterProvider} from 'react-router-dom';
import {Provider} from 'react-redux';
import 'client/src/styles/errorsPages.scss';

// if (process.env.NODE_ENV === 'production') {
// 	registerServiceWorker();
// } else {
// 	unregisterServiceWorker();
// }

const store = setupStore();

import {PATHS} from 'client/src/routers/name';
import {PageLanding} from 'client/src/pages/Landing';
import {Page404} from 'client/src/pages/404';

import {Routes, Route} from 'react-router-dom';

export const App = () => {
	return (
		<Provider store={store}>
			<Routes>
				<Route
					path={PATHS.home}
					element={<PageLanding/>}
				/>
				<Route
					path={PATHS.forum}
					element={<Page404/>}
				/>
				<Route
					path={PATHS.mainMenu}
					element={<Page404/>}
				/>
			</Routes>
		</Provider>
	);
};
