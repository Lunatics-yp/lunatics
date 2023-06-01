import './background.scss';
import {useAppSelector} from 'client/src/hooks/redux';
import {authSelectors} from 'client/src/stores/reducers/auth/authSlice';

// Компонент фона странички
export const Background = () => {
	const themeName = useAppSelector(authSelectors.theme);
	return (
		<div className='background' data-theme={themeName}></div>
	);
};
