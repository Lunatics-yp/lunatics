
import {createBrowserRouter} from 'react-router-dom';
import {PageExample} from 'client/src/pages/Example';
//import {MainMenu, mainMenuLoader} from 'client/src/pages/MainMenu';
import {MainMenu} from 'client/src/pages/MainMenu';
import {MainMenuMain} from '../pages/MainMenu/pages/main';
import {MainMenuPlayAgainstAI} from '../pages/MainMenu/pages/playAgainstAI';
import {MainMenuPlayOnline} from '../pages/MainMenu/pages/playOnline';
import {MainMenuSettings} from '../pages/MainMenu/pages/settings';
import {TestPage} from 'client/src/pages/TestPage';
import {PATHS} from 'client/src/routers/name';
import {Page500} from 'client/src/pages/500';
import {Page404} from 'client/src/pages/404';
import {PageRegister} from 'client/src/pages/Register';
import {PageAuth} from 'client/src/pages/Auth';

export const router = createBrowserRouter([
	{
		path: PATHS.home,
		element: <PageExample />
	},
	{
		path: PATHS.test,
		element: <TestPage />
	},
	{
		path: PATHS.mainMenu,
		element: <MainMenu />,
		children: [
			{
				path: PATHS.mainMenu,
				element: <MainMenuMain/>
			},
			{
				path: PATHS.mainMenuPlayAgainstAI,
				element: <MainMenuPlayAgainstAI/>
			},
			{
				path: PATHS.mainMenuPlayOnline,
				element: <MainMenuPlayOnline/>
			},
			{
				path: PATHS.mainMenuSettings,
				element: <MainMenuSettings/>
			}
		]
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
	},
	{
		path: PATHS.auth,
		element: <PageAuth />
	}
]);
