// Импорт других компонентов
import {Header} from 'client/src/components/Header';
import {Menu} from 'client/src/components/Menu';
import {Footer} from 'client/src/components/Footer';
import {Button} from 'client/src/components/Button';
// Импорт реката
import {FC} from 'react';
import {useNavigate} from 'react-router-dom';
// Импорты внутри компонента
import {subMenuType, subPagesPaths} from '../../index';

// Компонент меню Главное меню
export const MainMenuMain: FC<subMenuType> = (/*{parentUrl}*/) => {
	const navigate = useNavigate();

	// Временный каллбек для нерабочих кнопок
	const callbackNull = () => {
		console.log('Клик по кнопке');
	};

	return (
		<>
			<Header>Главное меню</Header>
			<Menu>
				<Button
					text="Играть против ИИ"
					onClick={() => {
						navigate(`${subPagesPaths.playOffline}`);
					}}/>
				<Button
					text="Играть онлайн"
					onClick={() => {
						navigate(`${subPagesPaths.playOnline}`);
					}}/>
				<Button
					text="Настройки"
					onClick={() => {
						navigate(`${subPagesPaths.settings}`);
					}}/>
				<Button
					text="Форум"
					onClick={callbackNull}/>
				<Button
					text="Авторы"
					onClick={callbackNull}/>
				<Button
					text="Выйти"
					onClick={callbackNull}/>
			</Menu>
			<Footer>Подвал</Footer>
		</>
	);
};
