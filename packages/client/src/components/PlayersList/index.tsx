import React, {FC} from 'react';
import styles from './playersList.module.scss';
import {TPlayersListProps} from './typing';
import {PlayersListTable} from './Table';

export const PlayersList: FC<TPlayersListProps> = React.memo((props) => {

	const {data, showIndex = false} = props;

	return (
		<div className={styles.wrapper}>
			<div data-column='whiteline'></div>
			<div className={styles.table} data-showindex={showIndex}>
				<div data-column='index'>Место</div>
				<div>Игрок</div>
				<div>Побед онлайн</div>
				<div>Побед оффлайн</div>
				<PlayersListTable data={data}/>
			</div>
		</div>
	);
});
