import {Header} from 'client/src/components/Header';
import {Menu} from 'client/src/components/Menu';
import {Switch} from 'client/src/components/Switch';
import {Button} from 'client/src/components/Button';
import {Input} from 'client/src/components/Input';
import {Footer} from 'client/src/components/Footer';
import './example.scss';
import {Link, useNavigate} from 'react-router-dom';

export const PageExample = () => {
	const navigate = useNavigate();

	const buttonCallback = () => {
		console.log('Клик');
	};

	// Тест работы гит

	const switchCallback = (value: number) => {
		console.log('Свич', value);
	};

	return (
		<div className='pageExample'>
			<Header>Заголовок</Header>
			<Menu>
				<Button
					text='Открыть главное меню'
					onClick={() => {
						navigate('/mainmenu');
					}}
				/>
				<Switch
					label='Селектор'
					list={['Альфа', 'Бетта', 'Гамма']}
					onSwitch={switchCallback}
				></Switch>
				<Input
					value='Инпут'
				/>
				<Button
					text='Кнопка 1'
					onClick={buttonCallback}
				/>
				<Button
					text='Кнопка 2'
					onClick={buttonCallback}
				/>
				<Button
					text='Переход на страницу test'
					onClick={() => {
						navigate('/test');
					}}
				/>
				<Link to='/test'>Переход на страницу test</Link>
			</Menu>
			<Footer>Подвал</Footer>
		</div>
	);
};
