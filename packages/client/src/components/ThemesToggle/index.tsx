import {useEffect, useState} from 'react';
import {useAppDispatch, useAppSelector} from 'client/src/hooks/redux';
import {authSelectors} from 'client/src/stores/reducers/auth/authSlice';
import {themesActions} from 'client/src/stores/reducers/auth/authSlice';
import {Theme} from 'client/src/stores/reducers/userSettings/typing';
import {themesApi} from 'client/src/api/themes';
import styles from './styles.module.scss';

export const ThemesToggle = () => {
	const dispatch = useAppDispatch();
	const user = useAppSelector(authSelectors.user);
	const themeName: string | null | undefined = useAppSelector(authSelectors.theme);
	const [themeLocal, setThemeLocal] = useState('');

	useEffect( () => {
		const userId = user.user?.id;
		if(userId && themeName && user.isLoading === false) {
			console.log('if(userId && themeName && user.isLoading === false)', themeName);
			themesApi.changeUserTheme(themeName);
			document.documentElement.dataset.theme = themeName;
			localStorage.setItem('theme', themeName);
		}
		if (!userId && themeName === null) {
			const localTheme = window.localStorage.getItem('theme');
			if (localTheme === null) {
				document.documentElement.dataset.theme = Theme.Light;
				localStorage.setItem('theme', Theme.Light);
			} else {
				setThemeLocal(localTheme);
				document.documentElement.dataset.theme = localTheme;
				localStorage.setItem('theme', localTheme);
				dispatch(themesActions
					.changeTheme(localTheme));
			}
		}
		if(themeName !== null) {
			document.documentElement.dataset.theme = themeName;
			if (typeof themeName === 'string') {
				localStorage.setItem('theme', themeName);
			}
		}
	},[themeName, themeLocal]);

	const changeTheme = async () => {
		await dispatch(themesActions
			.changeTheme(themeName === Theme.Light ? Theme.Dark : Theme.Light));
	};
	return (
		<>
			<input
				checked={themeName === Theme.Dark}
				type='checkbox'
				id='toggle_checkbox'
				className={styles.toggleCheckBox}
				onChange={changeTheme}
			/>
			<label htmlFor='toggle_checkbox'>
				<div className={styles.starContainer}>
					<div className={`${styles.star} ${styles.star1}`}>★</div>
					<div className={`${styles.star} ${styles.star2}`}>★</div>
				</div>
				<div className={styles.moon}></div>
			</label>
		</>
	);
};
