import {PATHS} from 'client/src/routers/name';
import {useNavigate} from 'react-router-dom';
import {Button} from 'client/src/components/Button';
import styles from 'client/src/pages/Game/Modals/modals.module.scss';

export const ModalGameoverButtons = () => {
	const navigate = useNavigate();

	return (
		<>
			<Button
				className={`${styles.buttonModalGameOver} ${styles.button}`}
				text='Статистика игры'
				onClick={()=> navigate(PATHS.gameResults)}/>
			<Button
				className={`${styles.buttonModalGameOver} ${styles.button}`}
				text='Играть заново'
				onClick={()=> navigate(PATHS.placement)}
			/>
		</>
	);
};
