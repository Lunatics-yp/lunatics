import {useRef, useEffect} from 'react';
import {CanvasContainer} from './canvasContainer';
import {PrepareGame} from './prepareGame';

export const GamePage = () => {
	const canvasRef = useRef(null);

	useEffect(() => {
		if (!canvasRef.current) return;

		const canvasContainer = new CanvasContainer(canvasRef.current);
		const prepareGame = new PrepareGame(canvasContainer);
		prepareGame.prepareBoard();
		prepareGame.prepareShips();
	}, []);

	return (
		<div>
			<canvas ref={canvasRef}/>
		</div>
	);
};
