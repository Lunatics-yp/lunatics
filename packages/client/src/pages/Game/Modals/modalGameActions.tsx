import {FC} from 'react';
import styles from './modals.module.scss';

type TProps = {
	text: string;
};
export const ModalGameActions: FC<TProps> = (props) => {
	const {text} = props;

	return (
		<div className={styles.modalGameActions}>
			{text}
		</div>
	);
};
