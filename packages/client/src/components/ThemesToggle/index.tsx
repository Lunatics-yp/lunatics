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
	const theme = useAppSelector(authSelectors.theme);

	useEffect( () => {
		console.log('theme', theme);
		const changeThemeData = {
			action: 'theme.change',
			data: {
				userId: user.user?.id,
				themeName: theme,
			},
		};
		if(user.user?.id && theme !== null && user.isLoading === false) {
			console.log('theme if', theme);
			themesApi.changeUserTheme(changeThemeData);
			// @ts-ignore
			// dispatch(changeUserTheme(changeThemeData));
		}
	},[theme]);

	const changeTheme = async () => {
		await dispatch(themesActions.changeTheme(theme === Theme.Light ? Theme.Dark : Theme.Light));
	};
	return (
		<>
			<input
				checked={theme === Theme.Dark}
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
