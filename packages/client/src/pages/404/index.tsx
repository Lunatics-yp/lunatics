import 'client/src/styles/errorsPages.scss';
import {Button} from 'client/src/components/Button';
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
						text='Вернуться на главную'
						onClick={() => navigate('/')}
					/>
				</div>
			</div>
		</div>
	);
};
