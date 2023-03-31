import {Avatar} from 'client/src/components/Avatar';
import React, {FC, Fragment} from 'react';
import styles from './playersList.module.scss';
import {TPlayersListProps} from './typing';

export const PlayersList: FC<TPlayersListProps> = React.memo((props) => {

	const {data, showIndex = false} = props;

	const PlayersListTable = () => {
		const lobbyDataItems = data.map((playerData, index) => {
			return (
				<Fragment>
					<div data-column="index">{(index)}</div>
					<div data-column="nickname">
						<Avatar alt="player" size="small"/>
						{playerData.nickname}
					</div>
					<div>{playerData.winsOnline}</div>
					<div>{playerData.winsOffline}</div>
				</Fragment>
			);
		});
		return <>{lobbyDataItems}</>;
	};

	return (
		<div className={styles.wrapper}>
			<div data-column="whiteline"></div>
			<div className={styles.table} data-showindex={showIndex}>
				<div data-column="index">Место</div>
				<div>Игрок</div>
				<div>Побед онлайн</div>
				<div>Побед оффлайн</div>
				<PlayersListTable/>
			</div>
		</div>
	);
});
