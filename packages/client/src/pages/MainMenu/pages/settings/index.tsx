// Импорт других компонентов
import {Header} from 'client/src/components/Header';
import {Menu} from 'client/src/components/Menu';
import {Footer} from 'client/src/components/Footer';
import {Button} from 'client/src/components/Button';
import {Switch} from 'client/src/components/Switch';
import {PATHS} from 'client/src/routers/name';
// Импорт реката
import {useState} from 'react';
import {useNavigate} from 'react-router-dom';

// Компонент меню настройки
export const MainMenuSettings = () => {
	const [language, setLanguage] = useState(0);
	const [soundVolume, setSoundVolume] = useState(10);
	const [musicVolume, setMusicVolume] = useState(10);
	const navigate = useNavigate();

	// Язык
	const languages = [
		'Русский',
		'English'
	];
	const onLanguageSwitch = (i: number) => setLanguage(i);

	// Громкость
	const volumes = (new Array(11)).fill(0).map((_value, index) => `${index * 10}%`);
	const onSoundVolumeSwitch = (i: number) => setSoundVolume(i);
	const onMusicVolumeSwitch = (i: number) => setMusicVolume(i);

	return (
		<>
			<Header>Настройки</Header>
			<Menu>
				<Switch
					list={languages}
					defaultValue={language}
					label={'Язык'}
					onSwitch={onLanguageSwitch}/>
				<Switch
					list={volumes}
					defaultValue={soundVolume}
					label={'Громкость звуков'}
					onSwitch={onSoundVolumeSwitch}
					looped={false}/>
				<Switch
					list={volumes}
					defaultValue={musicVolume}
					label={'Громкость звуков'}
					onSwitch={onMusicVolumeSwitch}
					looped={false}/>
				<Button
					text="Назад"
					onClick={() => {
						navigate(PATHS.mainMenu);
					}}/>
			</Menu>
			<Footer>Подвал</Footer>
		</>
	);
};
