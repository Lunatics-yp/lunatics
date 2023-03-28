import {FC, ReactNode} from "react";
import './menu.scss';

// Тип компонента меню
type MenuProps = {
	children: ReactNode;
};

// Компонент меню.
export const Menu: FC<MenuProps> = ({children}) => {
	return (
		<div className="menu">
			{children}
		</div>
	);
};
