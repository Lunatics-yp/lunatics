import {Header} from 'client/src/components/Header';
import {Menu} from 'client/src/components/Menu';
import {Switch} from 'client/src/components/Switch';
import {Button} from 'client/src/components/Button';
import {Input} from 'client/src/components/Input';
import {Footer} from 'client/src/components/Footer';
import './example.scss';

export const PageExample = () => {

	const buttonCallback = () => {
		console.log('Клик');
	};

	const switchCallback = (value: number) => {
		console.log('Свич', value);
	};

	const inputCallback = (text: string) => {
		console.log('Инпут', text);
	};

	return (
		<div className='pageExample'>
			<Header>Заголовок</Header>
			<Menu>
				<Switch
					label='Селектор'
					list={['Альфа', 'Бетта', 'Гамма']}
					onSwitch={switchCallback}
				></Switch>
				<Input
					text='Инпут'
					onChange={inputCallback}
					onBlur={inputCallback}
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
					text='Кнопка 3'
					onClick={buttonCallback}
				/>
			</Menu>
			<Footer>Подвал</Footer>
		</div>
	);
};
