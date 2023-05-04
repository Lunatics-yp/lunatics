import {PATHS} from 'client/src/routers/name';
import {useNavigate} from 'react-router-dom';
import {Button} from 'client/src/components/Button';
import styles from 'client/src/pages/Game/Modals/modals.module.scss';

export const ModalRepeatGameButtons = () => {
	const navigate = useNavigate();

	return (
		<>
			<Button
				className={`${styles.buttonModalGameOver} ${styles.button}`}
				text='Играть'
				onClick={()=> navigate(PATHS.placement)}/>
			<Button
				className={`${styles.buttonModalGameOver} ${styles.button}`}
				text='Отказаться'
				onClick={()=> navigate(PATHS.mainMenu)}
			/>
		</>
	);
};
