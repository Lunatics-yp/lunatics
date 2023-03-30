import {Avatar} from 'client/src/components/Avatar';
import {FC, Fragment} from 'react';
import styles from './playersList.module.scss';
import {playerListProps} from './typing';

export const PlayersList:FC<playerListProps> = ({data, showIndex=false}) => {

	const PlayersListTable = () => {
		const lobbyDataItems = data.map((playerData, index) => {
			const key = index+1;
			return (
				<Fragment key={key}>
					<div data-column={'index'} >{(key)}</div>
					<div data-column={'nickname'}>
						<Avatar alt={'player'} size={'small'}/>
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
			<div data-column={'whiteline'}></div>
			<div className={styles.table} data-showindex={showIndex}>
				<div data-column={'index'}>Место</div>
				<div>Игрок</div>
				<div>Побед онлайн</div>
				<div>Побед оффлайн</div>
				<PlayersListTable/>
			</div>
		</div>
	);
};
