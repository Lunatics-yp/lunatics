import {PATHS} from 'client/src/routers/name';
import 'client/src/styles/errorsPages.scss';
import {Button} from 'client/src/components/Button';
import {useNavigate} from 'react-router-dom';

export const Page500 = () => {
	const navigate = useNavigate();

	return (
		<div className='page500'>
			<div className='page500Container'>
				<div>500</div>
				<p>Внутренняя ошибка сервера</p>
				<p>Мы о ней знаем и скоро её исправим</p>
				<div className='buttonContainer'>
					<Button
						text='Вернуться на главную'
						onClick={() => navigate(PATHS.home)}
					/>
				</div>
			</div>
		</div>
	);
};
