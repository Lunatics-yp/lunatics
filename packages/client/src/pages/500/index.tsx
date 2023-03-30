import './500.scss';
import {Button} from '../../components/Button';
import {useNavigate} from 'react-router-dom';
export const Page500 = () => {
	const navigate = useNavigate();

	return (
		<div className='page500'>
			<div className='page500Conteiner'>
				<div>500</div>
				<p>Внутренняя ошибка сервера</p>
				<p>Мы о ней знаем и скоро ее исправим</p>
				<div className='buttonConteiner'>
					<Button
						text='Вернуться в игру'
						onClick={() => navigate('/')}
					/>
				</div>
			</div>
		</div>
	);
};
