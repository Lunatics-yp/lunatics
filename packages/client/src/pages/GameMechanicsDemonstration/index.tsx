// Импорт react
import {ChangeEventHandler, FC, useState} from 'react';
// Импорт компонентов
import {Button} from 'client/src/components/Button';
import {Footer} from 'client/src/components/Footer';
import {Header} from 'client/src/components/Header';
import {Input} from 'client/src/components/Input';
// Импорт игровых механик
import {Shooting} from 'client/src/game/shooting';
import {MoonGround} from 'client/src/game/moonGround';
import {Placement} from 'client/src/game/placement';
import {
	MoonGroundCellStatus,
	TMoonGroundDisplayProps,
	TLunarModulesTypesToBePlacement,
} from 'client/src/game/typing';
// Локальные импорты
import {shape1, shape2, shape3, shape4} from './shapes';
import styles from './styles.module.scss';

// ВРЕМЕННЫЙ метод для отображения текущего состояния карты на странице
// В дальнейшем будет заменён на canvas
const convertMapStatusToSymbol = (status: MoonGroundCellStatus) => {
	switch (status) {
	case MoonGroundCellStatus.UNKNOWN:
		return '[?]';
	case MoonGroundCellStatus.EMPTY:
		return '[ ]';
	case MoonGroundCellStatus.OCCUPIED:
		return '[▒]';
	case MoonGroundCellStatus.MISSED:
		return '[·]';
	case MoonGroundCellStatus.BURNING:
		return '[v]';
	case MoonGroundCellStatus.DESTROYED:
		return '[Χ]';
	default:
		return ' E ';
	}
};

// Список форм лунных модулей для расстановки (зависит от режима игры)
const lunarModulesTypesToBePlacement: TLunarModulesTypesToBePlacement = [
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

// ВРЕМЕННЫЙ метод для отрисовки текущего состояния карты на страницу
// В дальнейшем будет заменён на "игровые механики на canvas"
const MoonGroundDisplay: FC<TMoonGroundDisplayProps> = (props) => {
	const {map} = props;
	let mapDisplayView = '';

	for (let x = 0; x < map.length; x++) {
		for (let y = 0; y < map[x].length; y++) {
			const mapCell = map[x][y];
			mapDisplayView += convertMapStatusToSymbol(mapCell.status);
		}
		mapDisplayView += '\n';
	}

	mapDisplayView += '\n';
	mapDisplayView += `${convertMapStatusToSymbol(MoonGroundCellStatus.OCCUPIED)}Лунный модуль, `;
	mapDisplayView += `${convertMapStatusToSymbol(MoonGroundCellStatus.BURNING)}Ранен, `;
	mapDisplayView += `${convertMapStatusToSymbol(MoonGroundCellStatus.DESTROYED)}Уничтожен, `;
	mapDisplayView += `${convertMapStatusToSymbol(MoonGroundCellStatus.MISSED)}Промах\n\n`;

	return (
		<div>
			<div dangerouslySetInnerHTML={{__html: `<pre>${mapDisplayView}</pre>`}}></div>
		</div>
	);
};

export const PageGameMechanicsDemonstration = () => {
	// стейт для ререндера страрички
	// В режиме работы с canvas вместо него будет requestAnimationFrame
	const [rerender, setRerender] = useState(false);

	// Стейт для выбранных координат выстрела
	// В режиме работы с canvas координаты будут приходить от класса курсора мышки
	const [cursorX, setCursorX] = useState(0);
	const [cursorY, setCursorY] = useState(0);

	// Игровое поле заданного размера
	const [playerMoonGround] = useState(new MoonGround({
		width: 10,
		height: 10,
	}));

	// Экземпляр класса Расстановки лунных модулей
	const [playerPlacement] = useState(new Placement(
		playerMoonGround,
		lunarModulesTypesToBePlacement,
	));

	// Экземпляр класса Стрельбы по игровому полю
	const [playerShooting] = useState(new Shooting(
		playerMoonGround,
		playerPlacement.getLunarModules(),
	));

	// Метод для принудительного ререндера игрового поля на странице
	const rerenderMap = () => {
		setRerender(!rerender);
	};

	// Метод для очистки игрового поля
	const clearHandle = () => {
		playerPlacement.clear();
		rerenderMap();
	};

	// Метод для рандомной расстановки лунных модулей на игровом поле
	const randomHandle = () => {
		playerPlacement.randomLocateAllModulesToGround();
		rerenderMap();
	};

	// Метод будет использован для ручной расстановки лунных модулей
	// const positionHandle = () => {
	// 	playerPlacement.locateModuleToGround(playerPlacement.getLunarModules()[0], {x:2, y:2});
	// };

	// Каллбек для позиции курсора X
	const cursorXHandle: ChangeEventHandler<HTMLInputElement> = (e) => {
		const value = e.target.value;
		setCursorX(parseInt(value));
	};

	// Каллбек для позиции курсора Y
	const cursorYHandle: ChangeEventHandler<HTMLInputElement> = (e) => {
		const value = e.target.value;
		setCursorY(parseInt(value));
	};

	// Метод выстрела по игровому полю
	const shotHandle = () => {
		const shotInfo = playerShooting.shoot({x: cursorX, y: cursorY});
		console.log(shotInfo);
		rerenderMap();
	};

	return (
		<>
			<div className={styles.pageGameMechanicsDemonstration}>
				<Header>Демонстрация игровых механик</Header>
				<div className={styles.content}>
					pageGameMechanicsDemonstration
					<MoonGroundDisplay map={playerMoonGround.getMap()} rerender={rerender}/>
					<div className={styles.menu}>
						<Button
							text='Очистить игровое поле'
							onClick={clearHandle}
						/>
						<Button
							text='Рандомно расставить лунные модули'
							onClick={randomHandle}
						/>
						<div className={styles.inputsBlock}>
							<Input
								label='Координата X'
								value={cursorX.toString()}
								onChange={cursorXHandle}
							/>
							<Input
								label='Координата Y'
								value={cursorY.toString()}
								onChange={cursorYHandle}
							/>
						</div>
						<Button
							text='Выстрелить'
							onClick={shotHandle}
						/>
					</div>
				</div>
				<Footer>Подвал</Footer>
			</div>
		</>
	);
};
