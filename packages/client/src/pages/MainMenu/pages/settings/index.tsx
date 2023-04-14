import {useNavigate} from 'react-router-dom';
import {PATHS} from 'client/src/routers/name';
import {useAppDispatch, useAppSelector} from 'client/src/hooks/redux';
import {
	userSettingsActions,
	userSettingsSelectors,
} from 'client/src/stores/reducers/userSettings/userSettingsSlice';
import {Languages} from 'client/src/stores/reducers/userSettings/typing';
import {Header} from 'client/src/components/Header';
import {Menu} from 'client/src/components/Menu';
import {Footer} from 'client/src/components/Footer';
import {Button} from 'client/src/components/Button';
import {Switch} from 'client/src/components/Switch';

// Компонент меню настройки
export const MainMenuSettings = () => {
	const navigate = useNavigate();
	const goToMainMenu = () => {
		navigate(PATHS.mainMenu);
	};

	const dispatch = useAppDispatch();
	const {language, soundVolume, musicVolume} = useAppSelector(userSettingsSelectors.settings);

	// Язык
	const onLanguageSwitch = (i: number) => {
		dispatch(userSettingsActions.toggleLanguage(i));
	};

	// Громкость
	const volumes = (new Array(11)).fill(0).map((_value, index) => `${index}`);
	const onSoundVolumeSwitch = (i: number) => {
		dispatch(userSettingsActions.changeSoundVolume(i));
	};
	const onMusicVolumeSwitch = (i: number) => {
		dispatch(userSettingsActions.changeSoundMusic(i));
	};

	return (
		<>
			<Header>Настройки</Header>
			<Menu>
				<Switch
					value={language}
					list={[Languages.Russian, Languages.English]}
					label='Язык'
					onSwitch={onLanguageSwitch}/>
				<Switch
					value={soundVolume*10 + '%'}
					list={volumes}
					defaultValue={soundVolume}
					label='Громкость звуков'
					onSwitch={onSoundVolumeSwitch}
					looped={false}/>
				<Switch
					value={musicVolume*10 + '%'}
					list={volumes}
					defaultValue={musicVolume}
					label='Громкость музыки'
					onSwitch={onMusicVolumeSwitch}
					looped={false}/>
				<Button
					text='Назад'
					onClick={goToMainMenu}/>
			</Menu>
			<Footer>Подвал</Footer>
		</>
	);
};
