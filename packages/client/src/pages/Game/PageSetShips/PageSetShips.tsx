import {shape1, shape2, shape3, shape4} from 'client/src/pages/GameMechanicsDemonstration/shapes';
import React, {useState} from 'react';
import {useNavigate} from 'react-router-dom';
import {PATHS} from 'client/src/routers/name';
import {Background} from 'client/src/components/Background';
import {Header} from 'client/src/components/Header';
import {Button} from 'client/src/components/Button';
import {Footer} from 'client/src/components/Footer';
import styles from './pageSetShips.module.scss';

import imageMoon from 'client/src/assets/images/game/moon.png';
import image1 from 'client/src/assets/images/game/1.png';
import image2 from 'client/src/assets/images/game/2.png';
import image3 from 'client/src/assets/images/game/3.png';
import image4 from 'client/src/assets/images/game/4.png';

import {GameBattle} from 'client/src/game/battle';
import {CellStatus, TShapesList} from 'client/src/game/typing';

const lunarModulesTypesToBePlacement: TShapesList = [
	{
		name: 'Четверной',
		shape: shape4,
		count: 1,
	},
	{
		name: 'Тройной',
		shape: shape3,
		count: 2,
	},
	{
		name: 'Двойной',
		shape: shape2,
		count: 3,
	},
	{
		name: 'Одиночный',
		shape: shape1,
		count: 4,
	},
];

const battle = new GameBattle(lunarModulesTypesToBePlacement);

//Canvas будет из реализации команды, это просто временно добавила
type TCanvas = {
	battle: GameBattle;
	redraw: number;
};
type TSprites = {
	background?: HTMLImageElement;
	modules?: {
		horizontal: HTMLImageElement;
		vertical: HTMLImageElement;
	}[][];
};
export const Canvas = (props: TCanvas) => {

	const {battle, redraw} = props;

	const {
		width,
		height,
	} = battle.ground.map.size;

	const rectSize = 50;

	const canvasWidth = width * rectSize;
	const canvasHeight = height * rectSize;

	const [sprites, setSprites] = useState<TSprites>({modules: []});
	const [ctx, setCtx] = useState<CanvasRenderingContext2D>();

	const [selfRedraw, setSelfRedraw] = useState(0);

	const canvas = React.useRef<HTMLCanvasElement>(null);
	React.useEffect(() => {
		if (canvas.current) {
			setCtx(canvas.current.getContext('2d') as CanvasRenderingContext2D);
		}
	}, []);

	React.useEffect(() => {
		if (!ctx) {
			return;
		}

		printLoading(ctx);

		const background = new Image();
		background.src = imageMoon;

		const loadImageAndSplitImage = async () => {
			await new Promise((resolve) => {
				background.onload = resolve;
			});

			const modules = [];
			modules[1] = await splitImage(image1, 1);
			modules[2] = await splitImage(image2, 2);
			modules[3] = await splitImage(image3, 3);
			modules[4] = await splitImage(image4, 4);
			setSprites({...sprites, background, modules});
			setSelfRedraw(selfRedraw + 1);
		};

		loadImageAndSplitImage();
	}, [ctx]);

	React.useEffect(() => {
		if (!ctx) {
			return;
		}
		clearCanvas(ctx);
		drawSprites(ctx);
	}, [redraw, selfRedraw]);

	const handleClick = (event: React.MouseEvent<HTMLCanvasElement>) => {
		if (canvas.current) {
			const rect = canvas.current.getBoundingClientRect();
			const pxX = event.clientX - rect.left;
			const pxY = event.clientY - rect.top;
			const rectX = Math.floor((pxX / rect.width) * width);
			const rectY = Math.floor((pxY / rect.height) * height);
			console.log('Координаты клика:', rectX, rectY);
		}
	};

	const clearCanvas = (ctx: CanvasRenderingContext2D) => {
		ctx.clearRect(0, 0, canvasWidth, canvasHeight);
		drawBackground(ctx);
		drawMesh(ctx);
	};

	const printLoading = (ctx: CanvasRenderingContext2D) => {
		ctx.font = '24px Arial';
		ctx.fillStyle = 'black';
		ctx.textAlign = 'center';
		ctx.fillText('Загрузка спрайтов', canvasWidth / 2, canvasHeight / 2);
	};

	const splitImage = (
		imgSrc: string,
		parts: number,
	): Promise<{
		horizontal: HTMLImageElement;
		vertical: HTMLImageElement;
	}[]> => {
		return new Promise((resolve) => {
			const image = new Image();
			image.src = imgSrc;
			image.onload = () => {
				const {width, height} = image;

				const partWidth = Math.floor(width / parts);
				const sprites = [] as {
					horizontal: HTMLImageElement;
					vertical: HTMLImageElement;
				}[];

				for (let i = 0; i < parts; i++) {
					const startX = i * partWidth;

					const toSprite = (vertical: boolean = false) => {
						const canvas = document.createElement('canvas');
						const canvasCtx = canvas.getContext('2d') as CanvasRenderingContext2D;
						canvas.width = partWidth;
						canvas.height = height;

						if (vertical) {
							canvasCtx.translate(partWidth / 2, height / 2);
							canvasCtx.rotate((90 * Math.PI) / 180);
							canvasCtx.drawImage(
								image,
								startX,
								0,
								partWidth,
								height,
								-partWidth / 2,
								-height / 2,
								partWidth,
								height,
							);
						} else {
							canvasCtx.drawImage(
								image,
								startX,
								0,
								partWidth,
								height,
								0,
								0,
								partWidth,
								height,
							);
						}

						const spriteImage = new Image();
						spriteImage.src = canvas.toDataURL();
						return spriteImage;
					};
					sprites.push({
						horizontal: toSprite(false),
						vertical: toSprite(true),
					});
				}
				resolve(sprites);
			};
		});
	};

	const drawMesh = (ctx: CanvasRenderingContext2D) => {
		for (let i = 0; i < width; i++) {
			for (let j = 0; j < height; j++) {
				ctx.rect(i * rectSize, j * rectSize, rectSize, rectSize);
				ctx.stroke();
			}
		}
	};

	const drawSprites = (ctx: CanvasRenderingContext2D) => {
		if (!sprites.modules) {
			return;
		}
		for (let y = 0; y < width; y++) {
			for (let x = 0; x < height; x++) {
				const coordinates = {x, y};
				const status = battle.ground.getCellStatus(coordinates);
				let module, size, spriteIndex, sprite;
				switch (status) {
					case CellStatus.OCCUPIED:
						module = battle.findSpaceModule(coordinates);
						if(!module){
							throw new Error('Ошибка отрисовки графики');
						}
						size = module.size;
						spriteIndex = module.getCellIndex(coordinates);
						sprite = module.vertical
							? sprites.modules[size][spriteIndex].vertical
							: sprites.modules[size][spriteIndex].horizontal;
						ctx.drawImage(
							sprite,
							x * rectSize,
							y * rectSize,
							rectSize,
							rectSize);
						break;
				}
			}
		}
		// }
	};

	const drawBackground = (ctx: CanvasRenderingContext2D) => {
		if (sprites.background) {
			ctx.drawImage(sprites.background, 0, 0, canvasWidth, canvasHeight);
		}
	};

	return (
		<canvas
			ref={canvas}
			width={canvasWidth}
			height={canvasHeight}
			className={styles.canvas}
			onClick={handleClick}
		/>
	);
};
export const PageSetShips = () => {
	const navigate = useNavigate();
	const [isShipsOnBoard, setIsShipsOnBoard] = useState(false);
	const [redraw, setRedraw] = useState(0);
	const setShipsOnBoard = () => {
		battle.placement.randomLocateAllModulesToGround();
		setRedraw(redraw + 1);
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
				<Canvas battle={battle} redraw={redraw}/>
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
