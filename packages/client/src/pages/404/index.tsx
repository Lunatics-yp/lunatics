import '../500/500.scss';
import {Button} from '../../components/Button';

export const Page404 = () => {

	const backToGame = () => {
		console.log('Переход');
	};

	return (
		<div className='page500'>
			<div className='page500Conteiner'>
				<div>404</div>
				<p>Страница не найдена</p>
				<div className='buttonConteiner'>
					<Button
						text='Вернуться в игру'
						onClick={backToGame}
					/>
				</div>

			</div>
		</div>
	);
};
