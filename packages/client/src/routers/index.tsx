import {createBrowserRouter} from 'react-router-dom';
import {PageLanding} from 'client/src/pages/Landing';
import {MainMenu} from 'client/src/pages/MainMenu';
import {MainMenuMain} from '../pages/MainMenu/pages/main';
import {MainMenuPlayAgainstAI} from '../pages/MainMenu/pages/playAgainstAI';
import {MainMenuPlayOnline} from '../pages/MainMenu/pages/playOnline';
import {MainMenuSettings} from '../pages/MainMenu/pages/settings';
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
import {PageSetShips} from 'client/src/pages/Game/PageSetShips/PageSetShips';
import {PageGame} from 'client/src/pages/Game/PageGame/PageGame';
import {PageGameResults} from 'client/src/pages/Game/PageGameResults/PageGameResults';
import {LeaderboardPage} from '../pages/Leaderboard';
import {AuthRoute} from './Routes/AuthRoute';
import {GuestRoute} from './Routes/GuestRoute';
import {ErrorBoundary} from 'client/src/components/ErrorBoundary';

export const router = createBrowserRouter([
	{
		errorElement: <ErrorBoundary/>,
		children: [
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
				path: PATHS.profile,
				element: (
					<AuthRoute>
						<PageProfile/>
					</AuthRoute>
				),
			},
			{
				path: PATHS.profileChangePassword,
				element: (
					<AuthRoute>
						<PageProfileChangePassword/>
					</AuthRoute>
				),
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
				element: (
					<GuestRoute>
						<PageRegister/>
					</GuestRoute>
				),
			},
			{
				path: PATHS.auth,
				element: (
					<GuestRoute>
						<PageAuth/>
					</GuestRoute>
				),
			},
			{
				path: PATHS.placement,
				element: <PageSetShips/>,
			},
			{
				path: PATHS.game,
				element: <PageGame/>,
			},
			{
				path: PATHS.gameResults,
				element: <PageGameResults/>,
			},
			{
				path: PATHS.leaderboard,
				element: <LeaderboardPage/>,
			},
		],
	},
]);
