
import {createBrowserRouter} from 'react-router-dom';
import {PageExample} from 'client/src/pages/Example';
import {MainMenu, mainMenuLoader} from 'client/src/pages/MainMenu';
import {TestPage} from 'client/src/pages/TestPage';
import {PATHS} from 'client/src/routers/name';
import {Page500} from 'client/src/pages/500';
import {Page404} from 'client/src/pages/404';
import {PageRegister} from 'client/src/pages/Register';
import {Forum} from 'client/src/pages/Forum';

export const router = createBrowserRouter([
	{
		path: PATHS.home,
		element: <PageExample />
	},
	{
		path: PATHS.forum,
		element: <Forum />
	},
	{
		path: PATHS.test,
		element: <TestPage />
	},
	{
		path: PATHS.mainMenu,
		element: <MainMenu />,
		loader: mainMenuLoader(PATHS.mainMenu)
	},
	{
		path: `${PATHS.mainMenu}/:subPageId`,
		element: <MainMenu />,
		loader: mainMenuLoader(PATHS.mainMenu)
	},
	{
		path: PATHS.page500,
		element: <Page500 />
	},
	{
		path: PATHS.page404,
		element: <Page404 />
	},
	{
		path: PATHS.register,
		element: <PageRegister />
	}
]);
