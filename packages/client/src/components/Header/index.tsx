import {FC, ReactNode} from 'react';
import './header.scss';

// Тип компонента заголовок окна
type HeaderProps = {
	children: ReactNode;
};

// Компонент заголовок окна
export const Header: FC<HeaderProps> = ({children}) => {
	return <div className='header 1115'>{children}</div>;
};
