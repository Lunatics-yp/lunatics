import {useNavigate} from 'react-router-dom';
import {useState} from 'react';
import {PATHS} from 'client/src/routers/name';
import {Background} from 'client/src/components/Background';
import {Header} from 'client/src/components/Header';
import {Button} from 'client/src/components/Button';
import {Footer} from 'client/src/components/Footer';
import {Modal} from 'client/src/components/Modal/modal';
import {ModalRepeatGame}
	from 'client/src/pages/Game/Modals/components/modalRepeatGame/modalRepeatGame';
import {ModalRepeatGameButtons}
	from 'client/src/pages/Game/Modals/components/modalRepeatGame/modalRepeatGameButtons';
import styles from './pageGameResults.module.scss';

export const PageGameResults = () => {
	const navigate = useNavigate();
	//данные из стора
	const players  = {
		player1: 'Jack',
		player2: 'Jon',
	};
	//время игры в секундах
	const gameTime = 302;

	const gameTimeString = () => {
		const hours = (Math.floor(gameTime / 3600)).toString().padStart(2, '0');
		const minutes = (Math.floor(gameTime / 60)).toString().padStart(2, '0');
		const seconds = (gameTime % 60).toString().padStart(2, '0');
		return `${hours}:${minutes}:${seconds}`;
	};
	const playersStatistic = {
		player1: {
			destroyedModules: 7,
			missMotion: 20,
			points: 47,
		},
		player2: {
			destroyedModules: 3,
			missMotion: 32,
			points: 22,
		},
	};
	const result = {
		win: 'Победа!',
		lose: 'Поражение :(',
	};
	const [isRepeatGame, setIsRepeatGame] = useState(false);

	return (
		<>
			<Header>Результаты игры</Header>
			<div className={styles.winnerIs}>{result.win}</div>
			<div className={styles.tableWrapper}>
				<table>
					<thead>
						<tr>
							<th></th>
							<th>{players.player1}</th>
							<th>{players.player2}</th>
						</tr>
						<tr className={styles.underline}></tr>
					</thead>
					<tbody>
						<tr>
							<td>Уничтожено модулей</td>
							<td>{playersStatistic.player1.destroyedModules}</td>
							<td>{playersStatistic.player2.destroyedModules}</td>
						</tr>
						<tr>
							<td>Промахов</td>
							<td>{playersStatistic.player1.missMotion}</td>
							<td>{playersStatistic.player2.missMotion}</td>
						</tr>
						<tr>
							<td>Набрано очков</td>
							<td>{playersStatistic.player1.points}</td>
							<td>{playersStatistic.player2.points}</td>
						</tr>
					</tbody>
				</table>
			</div>
			<Button
				className={`${styles.buttonResultsGame} ${styles.button}`}
				text='Играть заново'
				onClick={() => navigate(PATHS.placement)}
			/>
			<Button
				className={`${styles.buttonResultsGame} ${styles.button}`}
				text='В главное меню'
				onClick={() => navigate(PATHS.mainMenu)}
			/>
			<Button
				className={`${styles.buttonResultsGame} ${styles.button}`}
				text='Реванш'
				onClick={() => setIsRepeatGame(true)}
			/>
			{ isRepeatGame  &&
				<Modal>
					<ModalRepeatGame player={players.player1}></ModalRepeatGame>
					<ModalRepeatGameButtons/>
				</Modal>
			}
			<Footer className={styles.footerPlacement}>
				<p>
					Длительность игры: {gameTimeString()}
				</p>
			</Footer>
			<Background/>
		</>
	);
};
