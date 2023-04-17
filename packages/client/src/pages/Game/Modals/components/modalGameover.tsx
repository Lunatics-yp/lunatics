import {FC} from 'react';
import {Avatar} from 'client/src/components/Avatar';
import styles from 'client/src/pages/Game/Modals/modals.module.scss';

type TProps = {
	winner: string;
	result: string;
};
export const ModalGameover: FC<TProps> = (props) => {
	const {winner, result} = props;
	return (
		<div>
			<div className={styles.playerName}>
				<Avatar size='small'/>
				<div>{winner}</div>
			</div>
			<div className={styles.modalGameOverResult}>{result}</div>
		</div>
	);
};
