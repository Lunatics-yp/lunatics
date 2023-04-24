import {useRef, useEffect} from 'react';
import {CanvasContainer} from './canvasContainer';
import {PrepareGame} from './prepareGame';
import {Button} from 'client/src/components/Button';

import './GameCanvas.scss';

export const GameCanvasPage = () => {

	const canvasRef = useRef<HTMLCanvasElement>(null!);
	const canvasRef2 = useRef<HTMLCanvasElement>(null!);
	const gameRef = useRef<{
		player1: PrepareGame | null;
	}>({
		player1: null,
	});

	const onClick = () => {
		console.log('test', gameRef.current);
		if (gameRef.current.player1) {
			gameRef.current.player1.randomSetPosition();
		}
	};

	useEffect(() => {
		if (!canvasRef.current) return;

		const canvasContainer = new CanvasContainer(canvasRef.current);
		const player1 = new PrepareGame(canvasContainer, false);

		gameRef.current.player1 = player1;

		const canvasContainer2 = new CanvasContainer(canvasRef2.current);
		const player2 = new PrepareGame(canvasContainer2, true);
		player2;

		return () => {
			if (player1) {
				player1.removeAllEvents();
			}
		};
	}, []);

	return (
		<div>
			<div className='canvas_container'>
				<canvas ref={canvasRef}/>
				<canvas ref={canvasRef2}/>
			</div>
			<Button
				text='Рандомная расстановка кораблей'
				onClick={onClick}
			/>
		</div>
	);
};
