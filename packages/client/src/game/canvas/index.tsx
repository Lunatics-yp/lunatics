import image1 from 'client/src/assets/images/game/1.png';
import image2 from 'client/src/assets/images/game/2.png';
import image3 from 'client/src/assets/images/game/3.png';
import image4 from 'client/src/assets/images/game/4.png';
import imageMoon from 'client/src/assets/images/game/moon.png';
import imageBurn from 'client/src/assets/images/game/burn.png';
import imageDestroyed from 'client/src/assets/images/game/destroyed.png';
import imageMiss from 'client/src/assets/images/game/miss.png';
import {CellStatus} from 'client/src/game/typing';
import styles from 'client/src/pages/Game/PageSetShips/pageSetShips.module.scss';
import {useState, useEffect, useRef, MouseEvent, useLayoutEffect} from 'react';

import type {TCanvas, TDrawnCell, TSprites} from './typing';

const rectSizeCoefficient = 2; // Коэффициент для разрешения реднера

export const Canvas = (props: TCanvas) => {

	const {
		battle,
		owner,
		redraw,
		clear = 0,
		clickCallback,
	} = props;

	if (!battle) {
		return <></>;
	}

	const ground = owner === 'player'
		? battle.playerGround
		: battle.enemyGround;

	const {
		width,
		height,
	} = ground.map.size;

	const [sprites, setSprites] = useState<TSprites>();
	const [ctx, setCtx] = useState<CanvasRenderingContext2D>();

	const [rectSize, setRectSize] = useState(0);

	const [canvasWidth, setCanvasWidth] = useState(0);
	const [canvasHeight, setCanvasHeight] = useState(0);

	useEffect(() => {
		setCanvasWidth(rectSize * width);
		setCanvasHeight(rectSize * height);
	}, [rectSize]);

	const [selfRedraw, setSelfRedraw] = useState(0);

	const [drawnCells, setDrawnCells] = useState<TDrawnCell[]>([]);

	const canvas = useRef<HTMLCanvasElement>(null);
	useEffect(() => {
		if (canvas.current) {
			setCtx(canvas.current.getContext('2d') as CanvasRenderingContext2D);
		}
	}, []);

	useLayoutEffect(() => {
		if (canvas.current) {
			const rect = canvas.current.getBoundingClientRect();
			setRectSize(rect.height / height * rectSizeCoefficient);
		}
	}, [canvas]);

	useEffect(() => {
		if (!ctx) {
			return;
		}
		printLoading(ctx);
		loadImageAndSplitImage(ctx);
	}, [ctx]);

	const loadImageAndSplitImage = async (ctx: CanvasRenderingContext2D) => {
		const background = new Image();
		const burn = new Image();
		const destroyed = new Image();
		const miss = new Image();

		await new Promise((resolve) => {
			background.src = imageMoon;
			burn.src = imageBurn;
			destroyed.src = imageDestroyed;
			miss.src = imageMiss;
			let counter = 4;
			const loaded = () => {
				counter--;
				if (!counter) {
					resolve(true);
				}
			};
			background.onload = loaded;
			burn.onload = loaded;
			destroyed.onload = loaded;
			miss.onload = loaded;
		});

		const modules = [];
		modules[1] = await splitImage(image1, 1);
		modules[2] = await splitImage(image2, 2);
		modules[3] = await splitImage(image3, 3);
		modules[4] = await splitImage(image4, 4);
		setSprites({background, burn, miss, destroyed, modules});
		setSelfRedraw(selfRedraw + 1);
		clearCanvas(ctx);
		drawBackground(ctx, background);
	};

	useEffect(() => {
		if (!ctx || !sprites) {
			return;
		}
		clearCanvas(ctx);
		drawBackground(ctx, sprites.background);
	}, [clear]);

	useEffect(() => {
		if (!ctx || !sprites) {
			return;
		}
		drawSprites(ctx);
	}, [redraw, selfRedraw, drawnCells]);

	const handleClick = (event: MouseEvent<HTMLCanvasElement>) => {
		if (canvas.current && clickCallback) {
			const rect = canvas.current.getBoundingClientRect();
			const pxX = event.clientX - rect.left;
			const pxY = event.clientY - rect.top;
			const rectX = Math.floor((pxX / rect.width) * width);
			const rectY = Math.floor((pxY / rect.height) * height);
			const coordinates = {x: rectX, y: rectY};
			clickCallback(coordinates);
		}
	};

	const clearCanvas = (ctx: CanvasRenderingContext2D) => {
		ctx.clearRect(0, 0, canvasWidth, canvasHeight);
		setDrawnCells([]);
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
		if (!sprites) {
			return;
		}

		for (let y = 0; y < height; y++) {
			for (let x = 0; x < width; x++) {
				const coordinates = {x, y};
				const status = ground.getCellStatus(coordinates);

				// Пишем массив отрисованных клеток и запоминаем их статус
				// Отрисовываем только клетки с отличающимся статусом
				let drawnCell = drawnCells.find(cell => cell.x === x && cell.y === y);
				if(drawnCell && drawnCell.status==status){
					continue;
				}
				if(!drawnCell){
					drawnCell = {x, y, status} as TDrawnCell;
					// Тут TS почему-то ругался, пришлось добавить ! и отлк правило
					// eslint-disable-next-line @typescript-eslint/no-non-null-assertion
					setDrawnCells((prev) => [...prev, drawnCell!]);
				}
				drawnCell.status=status;

				let module, size, spriteIndex, sprite;
				switch (status) {
					case CellStatus.OCCUPIED:
						if (owner === 'player') {
							module = battle.findSpaceModule(coordinates);
							if (!module) {
								throw new Error('Ошибка отрисовки графики');
							}
							size = module.size;
							spriteIndex = module.getCellIndex(coordinates);
							sprite = module.vertical
								? sprites.modules[size][spriteIndex].vertical
								: sprites.modules[size][spriteIndex].horizontal;
						} else {
							sprite = sprites.modules[1][0].vertical;
						}
						break;
					case CellStatus.BURNING:
						sprite = sprites.burn;
						break;
					case CellStatus.DESTROYED:
						sprite = sprites.destroyed;
						break;
					case CellStatus.MISSED:
						sprite = sprites.miss;
						break;
					default:
						continue;
				}
				ctx.drawImage(
					sprite,
					x * rectSize,
					y * rectSize,
					rectSize,
					rectSize,
				);
			}
		}
	};

	const drawBackground = (ctx: CanvasRenderingContext2D, background: HTMLImageElement) => {
		ctx.drawImage(background, 0, 0, canvasWidth, canvasHeight);
		drawMesh(ctx);
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
