import {useEffect} from 'react';
import {useAppDispatch, useAppSelector} from 'client/src/hooks/redux';
import {authSelectors} from 'client/src/stores/reducers/auth/authSlice';
import {themesActions} from 'client/src/stores/reducers/auth/authSlice';
import {Theme} from 'client/src/stores/reducers/userSettings/typing';
import {themesApi} from 'client/src/api/themes';
import styles from './styles.module.scss';

export const ThemesToggle = () => {
	const dispatch = useAppDispatch();
	const user = useAppSelector(authSelectors.user);
	const themeName = useAppSelector(authSelectors.theme);
	console.log('theme', themeName);
	useEffect( () => {

		const userId = user.user?.id;
		if(userId && themeName && user.isLoading === false) {
			console.log('theme if', themeName);
			themesApi.changeUserTheme(themeName);
		}
		if (themeName && !userId) {
			console.log('theme if !userId', themeName);
			document.documentElement.dataset.theme = themeName;
		}
	},[themeName]);

	const changeTheme = async () => {
		await dispatch(themesActions
			.changeTheme(themeName === Theme.Light ? Theme.Dark : Theme.Light));
		// if(userId && themeName  && user.isLoading === false) {
		// 	console.log('theme if', themeName);
		// 	await themesApi.changeUserTheme(themeName);
		// 	// @ts-ignore
		// 	// dispatch(changeUserTheme(themeName));
		// 	// await themesApi.changeUserTheme(themeName);
		// }
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
