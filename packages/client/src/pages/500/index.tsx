import './500.scss';
import {Button} from '../../components/Button';

export const Page500 = () => {

	const backToGame = () => {
		console.log('Переход');
	};

	return (
		<div className='page500'>
			<div className='page500Conteiner'>
				<div>500</div>
				<p>Внутренняя ошибка сервера</p>
				<p>Мы о ней знаем и скоро ее исправим</p>
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
