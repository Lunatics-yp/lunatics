import {useNavigate} from 'react-router-dom';
import {useState} from 'react';
import {Background} from 'client/src/components/Background';
import {Header} from 'client/src/components/Header';
import {Button} from 'client/src/components/Button';
// @ts-ignore
import {Canvas} from 'client/src/pages/Game/setShipsPage';
import {Footer} from 'client/src/components/Footer';
import {Avatar} from 'client/src/components/Avatar';
import {Timer} from 'client/src/utils/timer';
import {ModalGameover} from 'client/src/pages/Game/Modals/modalGameover';
import {ModalGameActions} from 'client/src/pages/Game/Modals/modalGameActions';
import './style.css';

export const GamePage = () => {

	const navigate = useNavigate();
	//данные из стора
	const player1Ships= 10;
	const player2Ships = 10;
	const players  = {
		player1: 'Jack',
		player2: 'Jon',
	};
	const isWinner =  true;
	const whoseTurn = 1;
	//для отображения модального окна с подсказками
	const [gameAction, setGameActions] = useState(true);
	const gameActionName = {
		whoseTurn: `Ходит ${players.player1}`,
		miss: 'Мимо',
		hitShip: 'Подбил модуль!',
		destroy: 'Уничтожил модуль!',
	};

	//убирает подсказки через 4 сек
	const timeOut = () => {
		setTimeout( () => {
			setGameActions(false);
		}, 4000);
	};
	if(gameAction) timeOut();

	return (
		<div className='gameOverOpacity'>
			<Header>Игра</Header>
			<div className='gamePageContainer'>
				<div className='firstPlayer'>
					<div
						className= {whoseTurn === 1 ? ' playerName playerName1 turn'
							: ' playerName playerName1 wait'}>
						<Avatar size='small'/>
						<div >{players.player1}</div>
					</div>
					<Canvas/>
					<div className='restShips'>Оставшиеся модули
						<p>{player1Ships}</p>
					</div>
				</div>
				<div>
					<div className={whoseTurn !== 1 ? ' playerName playerName2 turn  '
						: ' playerName playerName2 wait'}>
						<Avatar size='small'/>
						<div >{players.player2}</div>
					</div>
					<Canvas/>
					<div className='restShips'>Оставшиеся модули
						<p>{player2Ships}</p>
					</div>
				</div>
			</div>
			<div className={whoseTurn !== 1 ? ' playersTurn playerName2 turn '
				: ' playersTurn playerName1 turn'} >Ходит
				<p>{players.player1}</p>
			</div>
			<Button
				className='buttonExitGame button'
				text='Покинуть игру'
				onClick={() => navigate('/mainmenu')}
			/>
			<Footer className='footerPlacement footer'>
				<Timer isGameOver={isWinner}/>
			</Footer>
			{ isWinner  &&
				<ModalGameover/>
			}
			{ gameAction &&
				<ModalGameActions text={gameActionName.hitShip}/>
			}
			<Background/>
		</div>
	);
};
