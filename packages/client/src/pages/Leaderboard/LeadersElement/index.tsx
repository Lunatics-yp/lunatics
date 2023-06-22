import {Avatar} from 'client/src/components/Avatar';
import {TLeaderboardResponse} from 'client/src/api/typing';

export const LeadersElement = (
	{data, index}: {data: TLeaderboardResponse; index: number},
) => {

	const {
		games,
		wins,
		User: user,
	} = data;

	return (
		<tr className='leaderboard__list'>
			<td className='leaderboard__list-cell'>{index + 1}</td>
			<td className='leaderboard__list-cell'>
				<div className='leaderboard__list-avatar'>
					<Avatar size='small' src={user.avatar}/>
					<span>{user.display_name}</span>
				</div>
			</td>
			<td className='leaderboard__list-cell'>{games || 0}</td>
			<td className='leaderboard__list-cell'>{wins || 0}</td>
		</tr>
	);
};
