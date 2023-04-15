import React, {RefObject, useState} from 'react';
import {useNavigate} from 'react-router-dom';
import {PATHS} from 'client/src/routers/name';
import {Background} from 'client/src/components/Background';
import {Header} from 'client/src/components/Header';
import {Button} from 'client/src/components/Button';
import {Footer} from 'client/src/components/Footer';
import './styles.scss';

//Canvas будет из реализации команды, это просто временно добавила
export const Canvas = () => {
	const canvas = React.useRef() as RefObject<HTMLCanvasElement> ;
	React.useEffect(() => {
		// @ts-ignore
		const ctx = canvas.current.getContext('2d');
		draw(ctx);
	});
	const x = 500;
	const y = 500;
	const widthRect = 50;

	const draw = (ctx: any) => {
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
			className='canvas'
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
			<div className='placementPageContainer'>
				<div className='shipsContainer'>
				</div>
				<Canvas/>
			</div>
			<div className='buttonsContainer'>
				<Button text='Начать бой' className='button'
					disabled={!isShipsOnBoard}
					onClick={() => navigate(PATHS.game)}/>
				<Button text='Очистить поле' onClick={clearBoard}/>
				<Button text='Расставить корабли произвольно' onClick={setShipsOnBoard}/>
				<Button text='Покинуть игру' onClick={() => navigate(PATHS.mainMenu)}/>
			</div>
			<Footer className='footerPlacement'>
				Расположите свои лунные модули на игровом поле
			</Footer>
			<Background/>
		</>
	);
};
