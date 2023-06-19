import {useEffect, useState} from 'react';
import {useNavigate} from 'react-router-dom';
import {PATHS} from 'client/src/routers/name';
import {Background} from 'client/src/components/Background';
import {Header} from 'client/src/components/Header';
import {Button} from 'client/src/components/Button';
import {Footer} from 'client/src/components/Footer';
import styles from './pageSetShips.module.scss';

import {GameBattle} from 'client/src/game/battle';
import {Canvas} from 'client/src/game/canvas';
import {useBattle} from 'client/src/hooks/useBattle';

export const PageSetShips = () => {
	const navigate = useNavigate();
	const [isShipsOnBoard, setIsShipsOnBoard] = useState(false);
	const [redraw, setRedraw] = useState(0);
	const [clear, setClear] = useState(0);

	const [battle] = useState(GameBattle.currentGame);
	const isBattle = useBattle(battle);

	if (!isBattle) {
		return null;
	}

	const doRedraw = () => {
		setRedraw(redraw + 1);
	};

	const doClear = () => {
		setClear(clear + 1);
	};

	const clearBoard = () => {
		battle.reset();
		doClear();
		setIsShipsOnBoard(false);
		doRedraw();
	};

	const setShipsOnBoard = () => {
		clearBoard();
		battle.placement.randomLocateAllModulesToGround();
		setIsShipsOnBoard(battle.placement.isModulesLocated);
		doRedraw();
	};

	useEffect(() => {
		clearBoard();
	}, []);

	return (
		<>
			<Header>Расстановка лунных модулей</Header>
			<div className={styles.placementPageContainer}>
				<Canvas
					battle={battle}
					owner={'player'}
					redraw={redraw}
					clear={clear}
				/>
			</div>
			<div className={styles.buttonsContainer}>
				<Button
					text='Начать бой'
					className={styles.button}
					disabled={!isShipsOnBoard}
					onClick={() => navigate(PATHS.game)}/>
				<Button
					className={styles.button}
					text='Очистить поле'
					onClick={clearBoard}/>
				<Button
					className={styles.button}
					text='Расставить корабли произвольно'
					onClick={setShipsOnBoard}/>
				<Button
					className={styles.button}
					text='Покинуть игру'
					onClick={() => navigate(PATHS.mainMenu)}/>
			</div>
			<Footer className={`${styles.footerPlacement} ${styles.footer}`}>
				Расположите свои лунные модули на игровом поле
			</Footer>
			<Background/>
		</>
	);
};
