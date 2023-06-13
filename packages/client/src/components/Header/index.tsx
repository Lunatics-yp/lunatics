import {FC, ReactNode} from 'react';
import './header.scss';
import {Geolocation} from '../Geolocation';
// Тип компонента заголовок окна
type HeaderProps = {
	children: ReactNode;
};

// Компонент заголовок окна
export const Header: FC<HeaderProps> = ({children}) => {
	return (
		<div className="header">
			{children}
			<Geolocation initialFlagUrl="" initialRegion=""/>
		</div>
	);
};
