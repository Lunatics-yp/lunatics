/* eslint-disable max-len */
import {useNavigate} from 'react-router-dom';
import {PATHS} from 'client/src/routers/name';
import {Avatar} from 'client/src/components/Avatar';
import {Button} from 'client/src/components/Button';
import {Header} from 'client/src/components/Header';
import {useLeaderBoard} from 'client/src/hooks/useLeaderBoard';
import {LEADER_LIMIT_USERS} from 'client/src/api/constants';
import {RATING_FIELD_NAME} from 'client/src/api/constants';
import './leaderBoard.scss';

export const LeaderboardPage = () => {
	const {leaderBoardState: {isLoading, leaders = []}, setPage, page} = useLeaderBoard();
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

	return (
		<div className='leaderboard'>
			<Header>Лидерборд</Header>
			<Button
				text='Назад'
				className='buttonBack'
				onClick={goToMainMenu}
			/>
			<div className='leaderboard__container'>
				<div className='leaderboard__table'>

					<tr className='leaderboard__list'>
						<th className='leaderboard__list-el'>Номер</th>
						<th className='leaderboard__list-el'>Никнейм</th>
						<th className='leaderboard__list-el'>Бои</th>
						<th className='leaderboard__list-el'>Победы</th>
					</tr>

					<tbody className='leaderboard__list-bottom'>
						{leaders
							.filter(it => !!it.data.name)
							.map((leader, index) => {
								const {data = {}} = leader || {};
								const {id, name} = data;
								return (
									<tr key={id} className='leaderboard__list'>
										<td className='leaderboard__list-bottomEl'>{index + 1}</td>
										<td className='leaderboard__list-bottomEl'>
											<div className='player-info'>
												<Avatar
													size='small'
												/>
												<span>{name}</span>
											</div>
										</td>
										<td className='leaderboard__list-bottomEl'>{data[RATING_FIELD_NAME] || 0}</td>
										<td className='leaderboard__list-bottomEl'>{data[RATING_FIELD_NAME] || 0}</td>
									</tr>
								);
							},
							)}
					</tbody>
				</div>
				{page > 0 && (
					<Button
						text='Назад'
						className='buttonBack'
						onClick={backLeaders}
					/>
				)}
				{leaders.length > 0 && leaders.length % LEADER_LIMIT_USERS === 0 && (
					<Button
						text='Далее'
						className='buttonBack'
						onClick={nextLeaders}
					/>
				)}
			</div>
		</div>
	);
};
