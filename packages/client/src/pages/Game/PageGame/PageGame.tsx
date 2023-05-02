import {useNavigate} from 'react-router-dom';
import {FC, useState} from 'react';
import {PATHS} from 'client/src/routers/name';
import {Background} from 'client/src/components/Background';
import {Header} from 'client/src/components/Header';
import {Button} from 'client/src/components/Button';
import {Canvas} from 'client/src/pages/Game/PageSetShips/PageSetShips';
import {Footer} from 'client/src/components/Footer';
import {Avatar} from 'client/src/components/Avatar';
import {ModalGameActions} from 'client/src/pages/Game/Modals/modalGameActions';
import {Modal} from 'client/src/components/Modal/modal';
import {ModalGameover} from 'client/src/pages/Game/Modals/components/modalGameover/modalGameover';
import {ModalGameoverButtons}
	from 'client/src/pages/Game/Modals/components/modalGameover/modalGameoverButtons';
import {useFadeModal} from 'client/src/hooks/useFadeModal';
import {Timer} from 'client/src/components/timer/timer';
import styles from './pageGame.module.scss';

export const PageGame: FC = () => {

	const navigate = useNavigate();

	//данные из стора
	const player1Ships= 10;
	const player2Ships = 10;
	const players  = {
		player1: 'Jack',
		player2: 'Jon',
	};
	const winner = players.player1;
	const result = {
		win: 'Победа!',
		lose: 'Поражение :(',
	};
	const isWinner =  true;
	const whoseTurn = 1;

	const classNamePlayer1 = `${styles.playerName} ${styles.playerName1}
		${whoseTurn === 1 ? `${styles.turn}` : `${styles.wait}`}`;

	const classNamePlayer2 = `${styles.playerName} ${styles.playerName2}
		${whoseTurn !== 1 ? `${styles.turn}` : `${styles.wait}`}`;

	const classNameTurn = `${whoseTurn !== 1 ?
		`${styles.playersTurn} ${styles.playerName2} ${styles.turn}`
		: `${styles.playersTurn} ${styles.playerName1} ${styles.turn}`}`;

	//для отображения модального окна с подсказками
	const [gameActions, setGameActions] = useState(true);
	const gameActionsName = {
		whoseTurn: `Ходит ${players.player1}`,
		miss: 'Мимо',
		hitShip: 'Подбил модуль!',
		destroy: 'Уничтожил модуль!',
	};
	const timeout = 4000;

	//убирает подсказки через 4 сек
	if(gameActions) useFadeModal(timeout,() => setGameActions(false), false);

	return (
		<div>
			<Header>Игра</Header>
			<div className={styles.gamePageContainer}>
				<div className={styles.firstPlayer}>
					<div
						className= {classNamePlayer1}>
						<Avatar size='small'/>
						<div >{players.player1}</div>
					</div>
					<Canvas/>
					<div className={styles.restShips}>Оставшиеся модули
						<p>{player1Ships}</p>
					</div>
				</div>
				<div>
					<div className= {classNamePlayer2}>
						<Avatar size='small'/>
						<div >{players.player2}</div>
					</div>
					<Canvas/>
					<div className={styles.restShips}>Оставшиеся модули
						<p>{player2Ships}</p>
					</div>
				</div>
			</div>
			<div className={classNameTurn} >
				Ходит
				<p>{players.player1}</p>
			</div>
			<Button
				className={`${styles.buttonExitGame} ${styles.button}`}
				text='Покинуть игру'
				onClick={() => navigate(PATHS.mainMenu)}
			/>
			<Footer className={styles.footerPlacement}>
				<Timer isGameOver={isWinner}/>
			</Footer>
			{ isWinner  &&
				<Modal>
					<ModalGameover winner={winner} result={result.win}></ModalGameover>
					<ModalGameoverButtons/>
				</Modal>
			}
			{ gameActions &&
				<ModalGameActions text={gameActionsName.hitShip}/>
			}
			<Background/>
		</div>
	);
};
