// Импорт других компонентов
import {MainMenuMain} from './pages/main';
import {MainMenuPlayOnline} from './pages/playOnline';
import {MainMenuSettings} from './pages/settings';
import {MainMenuPlayOffline} from './pages/playOffline';
// Импорт реката
import {LoaderFunction, useLoaderData} from 'react-router-dom';
// Импорты внутри компонента
import './mainMenu.scss';

// Пути в подпапки компонента
export const subPagesPaths = {
	main: 'main',
	playOffline: 'playOffline',
	playOnline: 'playOnline',
	settings: 'settings'
} as const;
const defaultSubPagePath = subPagesPaths.main;

// Тип лоадера для роутера
type loaderDataType = {
	subPageId: string;
	parentUrl: string;
};

// Лоадер для роутера
export const mainMenuLoader = (parentUrl: string): LoaderFunction => {
	return ({params}): loaderDataType => {
		const subPageId = params['subPageId'] as string;
		return {
			subPageId: subPagesPaths[subPageId] !== undefined ? subPageId : defaultSubPagePath,
			parentUrl: parentUrl
		};
	};
};

// Тип компонента подстраницы
export type subMenuType = {
	parentUrl: string;
};

// Псевдороутинг для меню
const subPage = (subPageId: string, parentUrl: string) => {
	switch (subPageId) {
	case subPagesPaths.main:
		return <MainMenuMain parentUrl={parentUrl}/>;
	case subPagesPaths.playOffline:
		return <MainMenuPlayOffline parentUrl={parentUrl}/>;
	case subPagesPaths.playOnline:
		return <MainMenuPlayOnline parentUrl={parentUrl}/>;
	case subPagesPaths.settings:
		return <MainMenuSettings parentUrl={parentUrl}/>;
	}
};

// Основной компонент главного меню
export const MainMenu = () => {
	const {
		subPageId,
		parentUrl
	} = useLoaderData() as loaderDataType;

	return (
		<div className="pageMainMenu">
			{subPage(subPageId, parentUrl)}
		</div>
	);
};
