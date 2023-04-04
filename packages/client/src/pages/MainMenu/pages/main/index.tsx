// Импорт других компонентов
import {Header} from 'client/src/components/Header';
import {Menu} from 'client/src/components/Menu';
import {Footer} from 'client/src/components/Footer';
import {Button} from 'client/src/components/Button';
import {PATHS} from 'client/src/routers/name';
// Импорт реката
import {useNavigate} from 'react-router-dom';

// Компонент меню Главное меню
export const MainMenuMain = () => {
	const navigate = useNavigate();

	// Временный каллбек для нерабочих кнопок
	const callbackNull = () => {
		console.log('Клик по кнопке');
	};

	const goToForum = () => {
		navigate(`${PATHS.forum}`);
	};

	return (
		<>
			<Header>Главное меню</Header>
			<Menu>
				<Button
					text='Играть против ИИ'
					onClick={() => {
						navigate(`${PATHS.mainMenuPlayAgainstAI}`);
					}}/>
				<Button
					text='Играть онлайн'
					onClick={() => {
						navigate(`${PATHS.mainMenuPlayOnline}`);
					}}/>
				<Button
					text='Настройки'
					onClick={() => {
						navigate(`${PATHS.mainMenuSettings}`);
					}}/>
				<Button
					text='Форум'
					onClick={goToForum}/>
				<Button
					text='Авторы'
					onClick={callbackNull}/>
				<Button
					text='Выйти'
					onClick={callbackNull}/>
			</Menu>
			<Footer>Подвал</Footer>
		</>
	);
};
