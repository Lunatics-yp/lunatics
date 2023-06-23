import {FC} from 'react';
import {Avatar} from 'client/src/components/Avatar';
import {TPlayersListProps} from 'client/src/components/PlayersList/typing';

export const PlayersListTable: FC<TPlayersListProps> = ({data}) => {
	const lobbyDataItems = data.map((playerData, index) => {
		return (
			<>
				<div data-column='index'>{(index)}</div>
				<div data-column='nickname'>
					<Avatar alt='player' size='small'/>
					{playerData.nickname}
				</div>
				<div>{playerData.winsOnline}</div>
				<div>{playerData.winsOffline}</div>
			</>
		);
	});
	return <>{lobbyDataItems}</>;
};
