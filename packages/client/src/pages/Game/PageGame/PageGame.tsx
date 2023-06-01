import {GameBattle} from 'client/src/game/battle';
// import {modesData} from 'client/src/game/constants/modes';
import {TCoordinates} from 'client/src/game/typing';
import {useNavigate} from 'react-router-dom';
import {FC, useEffect, useState} from 'react';
import {PATHS} from 'client/src/routers/name';
import {Background} from 'client/src/components/Background';
import {Header} from 'client/src/components/Header';
import {Button} from 'client/src/components/Button';
import {Footer} from 'client/src/components/Footer';
import {Avatar} from 'client/src/components/Avatar';
import {ModalGameActions} from 'client/src/pages/Game/Modals/modalGameActions';
import {Modal} from 'client/src/components/Modal/modal';
import {ModalGameover} from 'client/src/pages/Game/Modals/components/modalGameover/modalGameover';
import {ModalGameoverButtons}
	from 'client/src/pages/Game/Modals/components/modalGameover/modalGameoverButtons';
import {useFadeModal} from 'client/src/hooks/useFadeModal';
import {Timer} from 'client/src/components/timer/timer';
import {SoundsList} from 'client/src/components/Sound/sounds';
import {Sound} from 'client/src/components/Sound';
import {SoundManager, soundNames} from 'client/src/utils/soundManager';

import styles from './pageGame.module.scss';

import {Canvas} from 'client/src/game/canvas';
import {TShootRespond} from 'client/src/game/typing';

// const test = () => {
// 	const modeData = modesData['Необычный'];
// 	const battle = new GameBattle(modeData);
// 	battle.placement.randomLocateAllModulesToGround();
// };
// test();

export const PageGame: FC = () => {
	const navigate = useNavigate();
	const {soundsList} = SoundsList();
	const {playSound, createSound, soundToggle, isOn, playGameOver, stopMusic} = SoundManager();

	useEffect(() => {
		for (const audio in soundsList) createSound(audio);
		return () => {
			stopMusic();
		};
	}, []);

	const [redraw, setRedraw] = useState(0);
	const [battle] = useState(GameBattle.currentGame);

	//данные из стора
	const [player1Ships, setPlayer1Ships] = useState(battle.modulesCount);
	const [player2Ships, setPlayer2Ships] = useState(battle.modulesCount);

	const players = {
		1: 'Игрок',
		2: 'ИИ',
	};
	const result = {
		win: 'Победа!',
		lose: 'Поражение :(',
	};

	const [winner, setWinner] = useState(0);
	const [whoseTurn, setWhoseTurn] = useState(1);

	const classNamePlayer1 = `${styles.playerName} ${styles.playerName1}
		${whoseTurn === 1 ? `${styles.turn}` : `${styles.wait}`}`;

	const classNamePlayer2 = `${styles.playerName} ${styles.playerName2}
		${whoseTurn !== 1 ? `${styles.turn}` : `${styles.wait}`}`;

	const classNameTurn = `${
		whoseTurn !== 1
			? `${styles.playersTurn} ${styles.playerName2} ${styles.turn}`
			: `${styles.playersTurn} ${styles.playerName1} ${styles.turn}`
	}`;

	//для отображения модального окна с подсказками
	const [gameActions, setGameActions] = useState(false);
	const [actionName, setActionName] = useState('');
	const gameActionsName = {
		turn: `Ходит ${players[whoseTurn]}`,
		miss: 'Мимо',
		hitShip: 'Подбил модуль!',
		destroy: 'Уничтожил модуль!',
	};
	const timeout = 4000;

	//убирает подсказки через 4 сек
	if (gameActions) {
		useFadeModal(timeout, () => setGameActions(false), false);
	}

	useEffect(() => {
		if (winner) {
			return;
		}
		let whoseTurnNext;
		console.log('useEffect', whoseTurn, actionName);
		// Звуки
		switch (actionName) {
			case gameActionsName.hitShip:
			case gameActionsName.destroy:
				playSound(soundNames.explosion);
				break;
			case gameActionsName.miss:
				playSound(soundNames.miss);
				break;
		}
		// Логика игры
		switch (actionName) {
			case gameActionsName.hitShip:
				setActionName(gameActionsName.turn);
				if (whoseTurn === 2) {
					battle.enemyShooting(enemyShootingReceiver);
				}
				break;
			case gameActionsName.destroy:
				if (whoseTurn === 1) {
					setPlayer2Ships(player2Ships - 1);
				} else {
					setPlayer1Ships(player1Ships - 1);
				}
				setActionName(gameActionsName.turn);
				if (whoseTurn === 2) {
					battle.enemyShooting(enemyShootingReceiver);
				}
				break;
			case gameActionsName.miss:
				// Переход хода
				whoseTurnNext = whoseTurn === 1 ? 2 : 1;
				setWhoseTurn(whoseTurnNext);
				setActionName(gameActionsName.turn);
				if (whoseTurnNext === 2) {
					battle.enemyShooting(enemyShootingReceiver);
				}
				break;
		}
	}, [actionName]);

	useEffect(() => {
		if (player1Ships === 0 && player2Ships > 0) {
			setWinner(2);
		}
		if (player2Ships === 0 && player1Ships > 0) {
			setWinner(1);
		}
	}, [player1Ships, player2Ships]);

	useEffect(() => {
		if (winner) {
			playGameOver();
		}
	}, [winner]);

	const doRedraw = () => {
		setRedraw(redraw + 1);
	};

	const playerShooting = (coordinates: TCoordinates) => {
		if (whoseTurn !== 1) {
			console.log('playerShooting не тот игрок ходит', whoseTurn);
			return;
		}
		battle.playerShooting(coordinates, playerShootingReceiver);
	};

	const playerShootingReceiver = (shootRespond: TShootRespond) => {
		if (!shootRespond.hadShoot) {
			return;
		}
		doRedraw();
		if (!shootRespond.hit) {
			setActionName(gameActionsName.miss);
			return;
		}
		if (shootRespond.destroyed) {
			setActionName(gameActionsName.destroy);
		} else {
			setActionName(gameActionsName.hitShip);
		}
	};

	const enemyShootingReceiver = (shootRespond: TShootRespond) => {
		if (!shootRespond.hadShoot) {
			throw new Error('Ошибка выстрела врага');
		}
		doRedraw();
		if (!shootRespond.hit) {
			setActionName(gameActionsName.miss);
			return;
		}
		if (shootRespond.destroyed) {
			setActionName(gameActionsName.destroy);
		} else {
			setActionName(gameActionsName.hitShip);
		}
	};

	return (
		<div>
			<Header>
				Игра
				<Sound play={() => soundToggle(soundNames.background)} isOn={isOn}/>
			</Header>
			<div className={styles.gamePageContainer}>
				<div className={styles.firstPlayer}>
					<div className={classNamePlayer1}>
						<Avatar size='small'/>
						<div>{players[1]}</div>
					</div>
					<Canvas
						battle={battle}
						owner={'player'}
						redraw={redraw}
					/>
					<div className={styles.restShips}>
						Оставшиеся модули
						<p>{player1Ships}</p>
					</div>
				</div>
				<div>
					<div className={classNamePlayer2}>
						<Avatar size='small'/>
						<div>{players[2]}</div>
					</div>
					<Canvas
						battle={battle}
						owner={'enemy'}
						redraw={redraw}
						clickCallback={playerShooting}
					/>
					<div className={styles.restShips}>
						Оставшиеся модули
						<p>{player2Ships}</p>
					</div>
				</div>
			</div>
			<div className={classNameTurn}>
				Ходит
				<p>{players[whoseTurn]}</p>
			</div>
			<Button
				className={`${styles.buttonExitGame} ${styles.button}`}
				text='Покинуть игру'
				onClick={() => {
					navigate(PATHS.mainMenu);
					stopMusic();
				}}
			/>
			<Footer className={styles.footerPlacement}>
				<Timer isGameOver={winner > 0}/>
			</Footer>
			{winner > 0 && (
				<Modal>
					<ModalGameover
						winner={players[winner]}
						result={winner == 1 ? result.win : result.lose}
					/>
					<ModalGameoverButtons/>
				</Modal>
			)}
			{gameActions && <ModalGameActions text={gameActionsName.hitShip}/>}
			<Background/>
		</div>
	);
};
