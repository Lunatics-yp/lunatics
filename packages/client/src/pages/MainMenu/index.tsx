// Импорты внутри компонента
import './mainMenu.scss';
import {Outlet} from 'react-router-dom';

// Основной компонент главного меню
export const MainMenu = () => {
	return (
		<div className="pageMainMenu">
			<Outlet/>
		</div>
	);
};
