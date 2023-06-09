import {FC, ReactNode} from 'react';
import './header.scss';
import {ThemesToggle} from 'client/src/components/ThemesToggle';
import {useAppSelector} from 'client/src/hooks/redux';
import {authSelectors} from 'client/src/stores/reducers/auth/authSlice';

// Тип компонента заголовок окна
type HeaderProps = {
	children: ReactNode;
};

// Компонент заголовок окна
export const Header: FC<HeaderProps> = ({children}) => {
	const themeName = useAppSelector(authSelectors.theme);
	return <div className='header' data-theme={themeName}>
		{children}
		<ThemesToggle/>
	</div>;
};
