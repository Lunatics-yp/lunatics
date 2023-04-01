import {FC, Fragment} from 'react';
import {Avatar} from 'src/components/Avatar';
import {TPlayersListProps} from 'src/components/PlayersList/typing';

export const PlayersListTable: FC<TPlayersListProps> = ({data}) => {
	const lobbyDataItems = data.map((playerData, index) => {
		return (
			<Fragment>
				<div data-column='index'>{(index)}</div>
				<div data-column='nickname'>
					<Avatar alt='player' size='small'/>
					{playerData.nickname}
				</div>
				<div>{playerData.winsOnline}</div>
				<div>{playerData.winsOffline}</div>
			</Fragment>
		);
	});
	return <>{lobbyDataItems}</>;
};
