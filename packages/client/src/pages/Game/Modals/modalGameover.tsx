import {useNavigate} from 'react-router-dom';
import {Button} from 'client/src/components/Button';
import {Avatar} from 'client/src/components/Avatar';
import 'client/src/pages/Game/style.css';

export const ModalGameover = () => {
	const navigate = useNavigate();
	//данные из стора
	const winner = 'Jack';
	const result = {
		win: 'Победа!',
		lose: 'Поражение :(',
	};

	return (
		<div className='gameOverModal'>
			<div className='modalGameOverHeader'>
				<div className='underline'></div>
			</div>
			<div>
				<div className='playerName'>
					<Avatar size='small'/>
					<div >{winner}</div>
				</div>
				<div className='modalGameOverResult'>{result.win}</div>
				<div className=' underlineBottom'></div>
			</div>
			<div className='buttonsModalGameOver'>
				<Button
					className='button buttonModalGameOver'
					text='Статистика игры'
					onClick={()=> navigate('/gameResults')}/>
				<Button
					className='button buttonModalGameOver'
					text='Играть заново'
					onClick={()=> navigate('/placement')}/>

			</div>
		</div>
	);
};
