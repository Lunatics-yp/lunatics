import {RATING_FIELD_NAME} from 'client/src/api/constants';
import {Avatar} from 'client/src/components/Avatar';
import {TLeaderboardResponse} from 'client/src/api/typing';

export const LeadersElement = (
	{leader, index}: {leader: TLeaderboardResponse; index: number},
) => {
	const {data = {}} = leader || {};
	const {name, victories}: {name?: string; victories?: number} = data;

	return (
		<tr className='leaderboard__list'>
			<td className='leaderboard__list-cell'>{index + 1}</td>
			<td className='leaderboard__list-cell'>
				<div className='leaderboard__list-avatar'>
					<Avatar size='small'/>
					<span>{name}</span>
				</div>
			</td>
			<td className='leaderboard__list-cell'>{data[RATING_FIELD_NAME] || 0}</td>
			<td className='leaderboard__list-cell'>{victories || 0}</td>
		</tr>
	);
};
