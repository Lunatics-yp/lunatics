import {GameBattle} from 'client/src/game/battle';
import {useBattle} from 'client/src/hooks/useBattle';
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

	const [battle] = useState(GameBattle.currentGame);
	const isBattle = useBattle(battle);

	if (!isBattle) {
		return null;
	}

	const [battleStatistic] = useState(GameBattle.currentGame.statistic);

	//данные из стора
	const players = {
		player1: 'Игрок',
		player2: 'ИИ',
	};

	const result = {
		win: 'Победа!',
		lose: 'Поражение :(',
	};

	const [isRepeatGame/*, setIsRepeatGame*/] = useState(false);

	return (
		<>
			<Header>Результаты игры</Header>
			<div className={styles.winnerIs}>{
				battleStatistic.winner == 1
					? result.win
					: result.lose
			}</div>
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
							<td>Выстрелов</td>
							<td>{battleStatistic.player.shoots}</td>
							<td>{battleStatistic.enemy.shoots}</td>
						</tr>
						<tr>
							<td>Попаданий</td>
							<td>{battleStatistic.player.hit}</td>
							<td>{battleStatistic.enemy.hit}</td>
						</tr>
						<tr>
							<td>Промахов</td>
							<td>{battleStatistic.player.miss}</td>
							<td>{battleStatistic.enemy.miss}</td>
						</tr>
						<tr>
							<td>Уничтожено модулей</td>
							<td>{battleStatistic.player.destroyed}</td>
							<td>{battleStatistic.enemy.destroyed}</td>
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
			{/*<Button*/}
			{/*	className={`${styles.buttonResultsGame} ${styles.button}`}*/}
			{/*	text='Реванш'*/}
			{/*	onClick={() => setIsRepeatGame(true)}*/}
			{/*/>*/}
			{isRepeatGame &&
				<Modal>
					<ModalRepeatGame player={players.player1}></ModalRepeatGame>
					<ModalRepeatGameButtons/>
				</Modal>
			}
			<Footer className={styles.footerPlacement}>
				<p>
					Длительность игры: {battleStatistic.time}
				</p>
			</Footer>
			<Background/>
		</>
	);
};
