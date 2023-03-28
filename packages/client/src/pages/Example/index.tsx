import {Header} from 'client/src/components/Header';
import {Menu} from 'client/src/components/Menu';
import {SwitchButton} from 'client/src/components/SwitchButton';
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
				<SwitchButton
					label='Селектор'
					list={['Альфа', 'Бетта', 'Гамма']}
					onChange={switchCallback}
				></SwitchButton>
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
