import {FC, ReactNode} from 'react';
import {ThemesToggle} from 'client/src/components/ThemesToggle';
import {useAppSelector} from 'client/src/hooks/redux';
import {Geolocation} from '../Geolocation';
import {authSelectors} from 'client/src/stores/reducers/auth/authSlice';
import './header.scss';

// Тип компонента заголовок окна
type HeaderProps = {
	children: ReactNode;
};

// Компонент заголовок окна
export const Header: FC<HeaderProps> = ({children}) => {
	const themeName = useAppSelector(authSelectors.theme);
	return <div className='header' data-theme={themeName}>
		{children}
		<Geolocation/>
		<ThemesToggle/>
	</div>;
};