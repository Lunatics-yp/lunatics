import {Route, Routes} from 'react-router-dom';
import {PATHS} from 'client/src/routers/name';
import {AuthRoute} from './Routes/AuthRoute';
import {GuestRoute} from './Routes/GuestRoute';
import {ErrorBoundary} from 'client/src/components/ErrorBoundary';
import {PageLanding} from 'client/src/pages/Landing';
import {MainMenu} from 'client/src/pages/MainMenu';
import {MainMenuMain} from 'client/src/pages/MainMenu/pages/main';
import {MainMenuPlayAgainstAI} from 'client/src/pages/MainMenu/pages/playAgainstAI';
import {MainMenuPlayOnline} from 'client/src/pages/MainMenu/pages/playOnline';
import {MainMenuSettings} from 'client/src/pages/MainMenu/pages/settings';
import {TestPage} from 'client/src/pages/TestPage';
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
import {GameCanvasPage} from 'client/src/pages/GameCanvas';
import {PageSetShips} from 'client/src/pages/Game/PageSetShips/PageSetShips';
import {PageGame} from 'client/src/pages/Game/PageGame/PageGame';
import {PageGameResults} from 'client/src/pages/Game/PageGameResults/PageGameResults';
import {PageGameMechanicsDemonstration} from 'client/src/pages/GameMechanicsDemonstration';
import {LeaderboardPage} from 'client/src/pages/Leaderboard';

export const SSRRouter = () => {
	return (
		<Routes>
			<Route
				errorElement={<ErrorBoundary/>}>
				<Route
					path={PATHS.home}
					element={<PageLanding/>}
				/>
				<Route
					path={PATHS.forum}
					element={<Forum/>}
				>
					<Route
						path={PATHS.forum}
						element={<ForumBox/>}
					/>
					<Route
						path={':forumId'}
						element={<ForumDiscussion/>}
					>
						<Route
							path={':topicId'}
							element={<ForumTopic/>}
						/>
					</Route>
				</Route>
				<Route
					path={PATHS.test}
					element={<TestPage/>}
				/>
				<Route
					path={PATHS.profile}
					element={
						<AuthRoute>
							<PageProfile/>
						</AuthRoute>
					}
				/>
				<Route
					path={PATHS.profileChangePassword}
					element={
						<AuthRoute>
							<PageProfileChangePassword/>
						</AuthRoute>
					}
				/>
				<Route
					path={PATHS.mainMenu}
					element={<MainMenu/>}
				>
					<Route
						path={PATHS.mainMenu}
						element={<MainMenuMain/>}
					/>
					<Route
						path={PATHS.mainMenuPlayAgainstAI}
						element={<MainMenuPlayAgainstAI/>}
					/>
					<Route
						path={PATHS.mainMenuPlayOnline}
						element={<MainMenuPlayOnline/>}
					/>
					<Route
						path={PATHS.mainMenuSettings}
						element={<MainMenuSettings/>}
					/>
				</Route>
				<Route
					path={PATHS.page500}
					element={<Page500/>}
				/>
				<Route
					path={PATHS.page404}
					element={<Page404/>}
				/>
				<Route
					path={PATHS.register}
					element={
						<GuestRoute>
							<PageRegister/>
						</GuestRoute>
					}
				/>
				<Route
					path={PATHS.auth}
					element={
						<GuestRoute>
							<PageAuth/>
						</GuestRoute>
					}
				/>
				<Route
					path={PATHS.placement}
					element={<PageSetShips/>}
				/>
				<Route
					path={PATHS.game}
					element={<PageGame/>}
				/>
				<Route
					path={PATHS.gameCanvas}
					element={<GameCanvasPage/>}
				/>
				<Route
					path={PATHS.gameResults}
					element={<PageGameResults/>}
				/>
				<Route
					path={PATHS.gameMechanicsDemonstration}
					element={<PageGameMechanicsDemonstration/>}
				/>
				<Route
					path={PATHS.leaderboard}
					element={<LeaderboardPage/>}
				/>
			</Route>
		</Routes>
	);
};
