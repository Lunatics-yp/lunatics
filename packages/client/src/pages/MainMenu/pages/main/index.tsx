import {useEffect, useState} from 'react';
import {useNavigate} from 'react-router-dom';
import {useAppDispatch} from 'client/src/hooks/redux';
import {useAuth} from 'client/src/hooks/useAuth';
import {logout} from 'client/src/stores/reducers/auth/authThunks';
import {PATHS} from 'client/src/routers/name';
import {Header} from 'client/src/components/Header';
import {Menu} from 'client/src/components/Menu';
import {Footer} from 'client/src/components/Footer';
import {Button} from 'client/src/components/Button';
import {Home} from 'client/src/components/images/Home';

// Компонент меню Главное меню
export const MainMenuMain = () => {
	const navigate = useNavigate();
	const dispatch = useAppDispatch();
	const user = useAuth();

	const [country, setCountry] = useState('');
	const [flagUrl, setFlagUrl] = useState('');

	useEffect(() => {
		if (navigator.geolocation) {
			navigator.geolocation.getCurrentPosition(
				position => {
					const {latitude, longitude} = position.coords;
					fetch(
						// eslint-disable-next-line max-len
						`https://api.bigdatacloud.net/data/reverse-geocode-client?latitude=${latitude}&longitude=${longitude}&localityLanguage=en`,
					)
						.then(response => response.json())
						.then(data => {
							setCountry(data.countryName);
							setFlagUrl(
								// eslint-disable-next-line max-len
								`https://purecatamphetamine.github.io/country-flag-icons/3x2/${data.countryCode.toUpperCase()}.svg`,
							);
						})
						.catch(error => console.log(error));
				},
				error => console.log(error),
			);
		} else {
			console.log('Геолокация не поддерживается');
		}
	}, []);

	// Временный каллбек для нерабочих кнопок
	const callbackNull = () => {
		console.log('Клик по кнопке');
	};

	const handleLogout = async () => {
		if (user) {
			await dispatch(logout());
		}
		navigate(PATHS.home);
	};

	const goToForum = () => {
		navigate(`${PATHS.forum}`);
	};

	const goToProfile = () => {
		navigate(PATHS.profile);
	};

	return (
		<>
			<div>
				{flagUrl && <img className='flag-style' src={flagUrl} alt={`${country} flag`}/>}
				<h2>Страна: {country}</h2>
			</div>

			<Header>
				<Home/>
				<div>Главное меню</div>
			</Header>
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
					text='Профиль'
					disabled={!user}
					onClick={goToProfile}/>
				<Button
					text='Форум'
					onClick={goToForum}/>
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
