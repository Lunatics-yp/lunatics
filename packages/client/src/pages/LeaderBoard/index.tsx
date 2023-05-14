/* eslint-disable max-len */
import {useNavigate} from 'react-router-dom';
import {PATHS} from 'client/src/routers/name';
import {Button} from 'client/src/components/Button';
import {Header} from 'client/src/components/Header';
import {useLeaderBoard} from 'client/src/hooks/useLeaderBoard';
import {LEADER_LIMIT_USERS} from 'client/src/api/constants';
import {LeadersElement} from './LeadersElement';
import './leaderBoard.scss';

export const LeaderboardPage = () => {
	const {leaderBoardState: {isLoading, leaders = [], error}, setPage, page} = useLeaderBoard();
	const navigate = useNavigate();
	const goToMainMenu = () => {
		navigate(PATHS.mainMenu);
	};

	const nextLeaders = () => {
		setPage(__prevPage => ++__prevPage);
	};

	const backLeaders = () => {
		setPage(__prevPage => --__prevPage);
	};
	if (isLoading) return <div className='leaderboard__loading'>Loading ...</div>;
	if (error) return <div className='leaderboard__loading'> Возникла ошибка</div>;
	return (
		<div className='leaderboard'>
			<Header>Лидерборд</Header>
			<Button
				text='Назад'
				className='buttonBack'
				onClick={goToMainMenu}
			/>
			<div className='leaderboard__container'>
				<table className='leaderboard__table'>
					<thead>
						<tr className='leaderboard__list-row'>
							<th className='leaderboard__list-header-cell'>Номер</th>
							<th className='leaderboard__list-header-cell'>Никнейм</th>
							<th className='leaderboard__list-header-cell'>Бои</th>
							<th className='leaderboard__list-header-cell'>Победы</th>
						</tr>
					</thead>
					<tbody className='leaderboard__list-bottom'>
						{leaders.map((leader, index) => {
							const {data} = leader;
							const {id} = data;
							return (<LeadersElement key={id} leader={leader} index={index}/>);
						})}
					</tbody>
				</table>
				<div className='leaderboard__btns'>
					{page > 0 && (
						<Button
							text='Назад'
							onClick={backLeaders}
						/>
					)}
					{leaders.length > 0 && leaders.length % LEADER_LIMIT_USERS === 0 && (
						<Button
							text='Далее'
							onClick={nextLeaders}
						/>
					)}
				</div>
			</div>
		</div>
	);
};
