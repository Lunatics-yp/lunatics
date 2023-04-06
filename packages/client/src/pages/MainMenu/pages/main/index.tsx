// Импорт других компонентов
import {Header} from 'client/src/components/Header';
import {Menu} from 'client/src/components/Menu';
import {Footer} from 'client/src/components/Footer';
import {Button} from 'client/src/components/Button';
import {PATHS} from 'client/src/routers/name';
// Импорт реката
import {useNavigate} from 'react-router-dom';
import {authAPI} from 'client/src/api/auth';

// Компонент меню Главное меню
export const MainMenuMain = () => {
	const navigate = useNavigate();

	// Временный каллбек для нерабочих кнопок
	const callbackNull = () => {
		console.log('Клик по кнопке');
	};

	const handleLogout = async () => {
		await authAPI.logout();
		navigate(PATHS.auth);
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
					onClick={callbackNull}/>
				<Button
					text='Авторы'
					onClick={callbackNull}/>
				<Button
					text='Выйти'
					onClick={handleLogout}/>
			</Menu>
			<Footer>Подвал</Footer>
		</>
	);
};
