import {FC} from 'react';
import {Avatar} from 'client/src/components/Avatar';
import styles from 'client/src/pages/Game/Modals/modals.module.scss';

type TProps = {
	player: string;
};
export const ModalRepeatGame: FC<TProps> = (props) => {
	const {player} = props;
	return (
		<div>
			<div className={styles.playerName}>
				<Avatar size='small'/>
				<div>{player}</div>
			</div>
			<div className={styles.repeatText}>предложил сыграть еще раз</div>
		</div>
	);
};
