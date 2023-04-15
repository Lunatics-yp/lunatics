import {createBrowserRouter} from 'react-router-dom';
import {PageLanding} from 'client/src/pages/Landing';
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
import {Forum} from 'client/src/pages/Forum';
import {ForumTopic} from 'client/src/pages/Forum/ForumTopic';
import {ForumBox} from 'client/src/pages/Forum/compontents/ForumBox';
import {PageAuth} from 'client/src/pages/Auth';
import {PageProfile} from 'client/src/pages/Profile';
import {PageProfileChangePassword} from 'client/src/pages/ProfileChangePassword';
import {ForumDiscussion} from 'client/src/pages/Forum/ForumDiscussion';
import {PageGameMechanicsDemonstration} from 'client/src/pages/GameMechanicsDemonstration';

export const router = createBrowserRouter([
	{
		path: PATHS.home,
		element: <PageLanding/>,
	},
	{
		path: PATHS.forum,
		element: <Forum/>,
		children: [
			{
				path: PATHS.forum,
				element: <ForumBox/>,
			},
			{
				path: ':disccussionTitle',
				element: <ForumDiscussion/>,
				children: [
					{
						path: ':topicTitle',
						element: <ForumTopic/>,
					},
				],
			},
		],
	},
	{
		path: PATHS.test,
		element: <TestPage/>,
	},
	{
		path: PATHS.profile,
		element: <PageProfile/>,
	},
	{
		path: PATHS.profileChangePassword,
		element: <PageProfileChangePassword/>,
	},
	{
		path: PATHS.mainMenu,
		element: <MainMenu/>,
		children: [
			{
				path: PATHS.mainMenu,
				element: <MainMenuMain/>,
			},
			{
				path: PATHS.mainMenuPlayAgainstAI,
				element: <MainMenuPlayAgainstAI/>,
			},
			{
				path: PATHS.mainMenuPlayOnline,
				element: <MainMenuPlayOnline/>,
			},
			{
				path: PATHS.mainMenuSettings,
				element: <MainMenuSettings/>,
			},
		],
	},
	{
		path: PATHS.page500,
		element: <Page500/>,
	},
	{
		path: PATHS.page404,
		element: <Page404/>,
	},
	{
		path: PATHS.register,
		element: <PageRegister/>,
	},
	{
		path: PATHS.auth,
		element: <PageAuth/>,
	},
	{
		path: PATHS.gameMechanicsDemonstration,
		element: <PageGameMechanicsDemonstration/>,
	},
]);
