import {useRef, useEffect} from 'react';
import {CanvasContainer} from './canvasContainer';
import {CELL_WIDTH, CELL_HEIGHT, shipDatas} from './constants';

export const GamePage = () => {
	const canvasRef = useRef(null);

	useEffect(() => {
		if (!canvasRef.current) return;

		const canvasContainer = new CanvasContainer(canvasRef.current);
		//cellArray переменная для отрисовки поля создаем массив 10 на 10
		//начальные координаты по x и у 0. 0, каждый шаг плюс 30px 
		//дойдя по оси x до 270 переходим на следующий ряд к координатам 0, 30
		const cellArray = Array(10 * 10).fill(1).map((_value, index) => {
			return {
				x: (index % 10) * CELL_WIDTH,
				y: Math.floor(index / 10) * CELL_WIDTH,
			};
		});
		// один квадрат отрисовка 
		cellArray.forEach(cell => {
			canvasContainer.update({
				x: cell.x, y: cell.y, width: CELL_WIDTH,
				height: CELL_WIDTH, borderColor: '#cccc',
			});
		});
		//отрисовка кораблей 
		shipDatas.forEach(ship => {
			canvasContainer.update({
				x: ship.startPosition.x,
				y: ship.startPosition.y,
				width: ship.size * CELL_WIDTH,
				height: CELL_HEIGHT,
				color: ship.color,
				borderColor: ship.borderColor,
			});
		});
	}, []);

	return (
		<div>
			<canvas ref={canvasRef}/>
		</div>
	);
};
