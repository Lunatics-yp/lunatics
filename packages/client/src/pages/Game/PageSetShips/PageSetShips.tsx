import React, {useState} from 'react';
import {useNavigate} from 'react-router-dom';
import {PATHS} from 'client/src/routers/name';
import {Background} from 'client/src/components/Background';
import {Header} from 'client/src/components/Header';
import {Button} from 'client/src/components/Button';
import {Footer} from 'client/src/components/Footer';
import styles from './pageSetShips.module.scss';

//Canvas будет из реализации команды, это просто временно добавила
export const Canvas = () => {
	const canvas = React.useRef<HTMLCanvasElement>(null);
	React.useEffect(() => {
		if(canvas.current) {
			const ctx = canvas.current.getContext('2d') as CanvasRenderingContext2D;
			draw(ctx);
		}
	});
	const x = 500;
	const y = 500;
	const widthRect = 50;

	const draw = (ctx: CanvasRenderingContext2D) => {
		for (let i = 0; i < x  ; i+=widthRect) {
			for (let j = 0; j < y; j+=widthRect) {
				ctx.rect(i, j, widthRect, widthRect);
				ctx.stroke();
			}
		}
	};
	return (
		<canvas
			ref={canvas}
			width={x}
			height={y}
			className={styles.canvas}
		/>
	);
};
export const PageSetShips = () => {
	const navigate = useNavigate();
	const [isShipsOnBoard, setIsShipsOnBoard] = useState(false);
	const setShipsOnBoard = () => {
		setIsShipsOnBoard(true);
	};
	const clearBoard = () => {
		console.log('поле очищено');
		setIsShipsOnBoard(false);
	};

	return (
		<>
			<Header>Расстановка лунных модулей</Header>
			<div className={styles.placementPageContainer}>
				<div className={styles.shipsContainer}>
				</div>
				<Canvas/>
			</div>
			<div className={styles.buttonsContainer}>
				<Button text='Начать бой'
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
