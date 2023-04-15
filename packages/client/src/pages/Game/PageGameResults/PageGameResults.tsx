import {useNavigate} from 'react-router-dom';
import {PATHS} from 'client/src/routers/name';
import {Background} from 'client/src/components/Background';
import {Header} from 'client/src/components/Header';
import {Button} from 'client/src/components/Button';
import {Footer} from 'client/src/components/Footer';
import './styles.scss';

export const PageGameResults = () => {
	const navigate = useNavigate();

	//данные из стора
	const players  = {
		player1: 'Jack',
		player2: 'Jon',
	};
	const gameTime = '00:05:30';
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

	return (
		<>
			<Header>Результаты игры</Header>
			<div className='winnerIs'>{result.win}</div>
			<div className='tableWrapper'>
				<table>
					<thead>
						<tr>
							<th></th>
							<th>{players.player1}</th>
							<th>{players.player2}</th>
						</tr>
						<tr className='underline'></tr>
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
				className='buttonResultsGame button'
				text='Играть заново'
				onClick={() => navigate(PATHS.placement)}
			/>
			<Button
				className='buttonResultsGame button'
				text='В главное меню'
				onClick={() => navigate(PATHS.mainMenu)}
			/>
			<Footer className='footerPlacement'>
				<p>
					Длительность игры:  {gameTime}
				</p>
			</Footer>
			<Background/>
		</>
	);
};
