import './mainMenu.scss';
import {LoaderFunction, useLoaderData, useNavigate} from 'react-router-dom';
import {MainMenuAlfa} from './submenus/alfa';
import {MainMenuBetta} from './submenus/betta';
import {MainMenuGamma} from './submenus/gamma';
import {Menu} from '../../components/Menu';
import {Button} from '../../components/Button';

const subPagesPaths = {
	alfa: 'alfa',
	betta: 'betta',
	gamma: 'gamma'
};
const defaultSubPagePath = subPagesPaths.alfa;

type loaderDataType = {
	subPageId: string;
	parentUrl: string;
};

export const mainMenuLoader = (parentUrl: string): LoaderFunction => {
	return ({params}): loaderDataType => {
		const subPageId = params['subPageId'] as string;
		return {
			subPageId: subPagesPaths[subPageId]!==undefined ? subPageId : defaultSubPagePath,
			parentUrl: parentUrl
		};
	};
};

// Возможные роуты для главного меню
const subPages = {
	[subPagesPaths.alfa]: <MainMenuAlfa/>,
	[subPagesPaths.betta]: <MainMenuBetta/>,
	[subPagesPaths.gamma]: <MainMenuGamma/>
} as const;

// Компонент главного меню
export const MainMenu = () => {
	const {
		subPageId,
		parentUrl
	} = useLoaderData() as loaderDataType;

	const navigate = useNavigate();

	return (
		<div className="pageMainMenu">
			{subPages[subPageId]}
			<Menu>
				<Button
					text="Alfa"
					onClick={() => {
						navigate(`${parentUrl}/${subPagesPaths.alfa}`);
					}}/>
				<Button
					text="Betta"
					onClick={() => {
						navigate(`${parentUrl}/${subPagesPaths.betta}`);
					}}/>
				<Button
					text="Gamma"
					onClick={() => {
						navigate(`${parentUrl}/${subPagesPaths.gamma}`);
					}}/>
			</Menu>
		</div>
	);
};
