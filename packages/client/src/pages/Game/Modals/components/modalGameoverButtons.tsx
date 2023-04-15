import {PATHS} from 'client/src/routers/name';
import {useNavigate} from 'react-router-dom';
import {Button} from 'client/src/components/Button';
import 'client/src/pages/Game/Modals/modals.scss';

export const ModalGameoverButtons = () => {
	const navigate = useNavigate();

	return (
		<>
			<Button
				className='button buttonModalGameOver'
				text='Статистика игры'
				onClick={()=> navigate(PATHS.gameResults)}/>
			<Button
				className='button buttonModalGameOver'
				text='Играть заново'
				onClick={()=> navigate(PATHS.placement)}
			/>
		</>
	);
};
