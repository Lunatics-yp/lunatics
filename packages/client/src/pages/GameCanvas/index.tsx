import {useRef, useEffect} from 'react';
import {CanvasContainer} from './canvasContainer';
import {PrepareGame} from './prepareGame';
import {Button} from 'client/src/components/Button';

import './GameCanvas.scss';

export const GameCanvasPage = () => {

	const canvasRef = useRef(null);
	const canvasRef2 = useRef(null);
	const gameRef = useRef({
		prepareGame: null,
	});

	const onClick = () => {
		console.log('test', gameRef.current);
		gameRef.current.prepareGame.randomSetPosition();
	};

	useEffect(() => {
		if (!canvasRef.current) return;

		const canvasContainer = new CanvasContainer(canvasRef.current);
		const prepareGame = new PrepareGame(canvasContainer);
		prepareGame.prepareBoard();
		prepareGame.prepareShips();

		gameRef.current.prepareGame = prepareGame;

		// const canvasContainer2 = new CanvasContainer(canvasRef2.current);
		// const prepareGame2 = new PrepareGame(canvasContainer2);
		// prepareGame2.prepareBoard();

		// setTimeout(() => {
		// 	prepareGame.randomSetPosition();
		// }, 1000);

		return () => {
			if (prepareGame) {
				prepareGame.removeAllEvents();
			}
		};
	}, []);

	return (
		<div>
			<div className='canvas_container'>
				<canvas ref={canvasRef}/>
				{/* <canvas ref={canvasRef2} /> */}
			</div>
			<Button
				text='Рандомная расстановка кораблей'
				onClick={onClick}
			/>
		</div>
	);
};
