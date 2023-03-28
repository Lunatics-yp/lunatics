import {PageContent} from "../../components/PageContent";
import {Header} from "../../components/Header";
import {Menu} from "../../components/Menu";
import {SwitchButton} from "../../components/SwitchButton";
import {Button} from "../../components/Button";
import {Input} from "../../components/Input";
import {Footer} from "../../components/Footer";
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
		<PageContent className='pageExample'>
			<Header>Заголовок</Header>
			<Menu>
				<SwitchButton
					label='Селектор'
					list={['Альфа', 'Бетта', 'Гамма']}
					callback={switchCallback}
				></SwitchButton>
				<Input
					text='Инпут'
					changeCallback={inputCallback}
					blurCallback={inputCallback}
				/>
				<Button
					text='Кнопка 1'
					callback={buttonCallback}
				/>
				<Button
					text='Кнопка 2'
					callback={buttonCallback}
				/>
				<Button
					text='Кнопка 3'
					callback={buttonCallback}
				/>
			</Menu>
			<Footer>Подвал</Footer>
		</PageContent>
	);
};
