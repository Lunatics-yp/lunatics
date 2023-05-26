import {useNavigate} from 'react-router-dom';
import {PATHS} from 'client/src/routers/name';
import {Button} from 'client/src/components/Button';
import {Header} from 'client/src/components/Header';
import {useLeaderboard} from 'client/src/hooks/useLeaderboard';
import {LEADER_LIMIT_USERS} from 'client/src/api/constants';
import {LeadersElement} from './LeadersElement';
import './leaderboard.scss';

export const LeaderboardPage = () => {
	const {leaderboardState: {isLoading, leaders = [], error}, setPage, page} = useLeaderboard();
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
							const key = `${index}-${id}`;
							return <LeadersElement key={key} leader={leader} index={index}/>;
						})}
					</tbody>

				</table>
				<div className='leaderboard__btns'>

					<Button
						text='⤎'
						onClick={backLeaders}
						className='buttonPage'
						disabled={page === 0}
					/>

					<Button
						text='⤏'
						onClick={nextLeaders}

						className='buttonPage'

						disabled={leaders.length === 0 || leaders.length % LEADER_LIMIT_USERS !== 0}
					/>
				</div>
			</div>
		</div>
	);
};
