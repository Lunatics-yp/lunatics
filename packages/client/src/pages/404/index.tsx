import '../500/500.scss';
import {Button} from '../../components/Button';
import {useNavigate} from 'react-router-dom';

export const Page404 = () => {
	const navigate = useNavigate();

	return (
		<div className='page500'>
			<div className='page500Conteiner'>
				<div>404</div>
				<p>Страница не найдена</p>
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
