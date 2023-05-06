/* eslint-disable max-len */
import {useNavigate} from 'react-router-dom';
import {PATHS} from 'client/src/routers/name';
import {Avatar} from 'client/src/components/Avatar';
import {Button} from 'client/src/components/Button';
import {Header} from 'client/src/components/Header';
import {useLeaderBoard} from 'client/src/hooks/useLeaderBoard';
// import {TEAM_NAME} from 'client/src/hooks/useLeaderBoard';
import './leaderBoard.scss';

export const LeaderboardPage = () => {
	const {isLoading, liders = []} = useLeaderBoard();
	const navigate = useNavigate();
	const goToMainMenu = () => {
		navigate(PATHS.mainMenu);
	};

	if (isLoading) return <div>Loading ...</div>;

	return (
		<>
			<Header>Лидерборд</Header>
			<Button
				text='Назад'
				className='buttonBack'
				onClick={goToMainMenu}
			/>
			<div className="leaderboard__container">
				<div className="leaderboard__table" >

					<tr className="leaderboard__list">
						<th className="leaderboard__list-el" >Номер</th>
						<th className="leaderboard__list-el">Никнейм</th>
						<th className="leaderboard__list-el">Бои</th>
						<th className="leaderboard__list-el">Победы</th>
					</tr>

					<tbody className='leaderboard__list-bottom'>
						{liders
							.filter(it => !!it.data.name)
							.map((lider, index) => {
								const {data = {}} = lider || {};
								const {id, name} = data;
								return (

									<tr key={id} className="leaderboard__list">
										<td className="leaderboard__list-bottomEl">{index + 1}</td>
										<td className="leaderboard__list-bottomEl">
											<div className="player-info">
												<Avatar
													size='small'
												/>
												<span>{name}</span>
											</div>
										</td>
										<td className="leaderboard__list-bottomEl">{data['score'] || 0}</td>
										<td className="leaderboard__list-bottomEl">{data['score'] || 0}</td>
									</tr>
								);
							},
							)}
					</tbody>
				</div>
			</div>
		</>
	);
};
