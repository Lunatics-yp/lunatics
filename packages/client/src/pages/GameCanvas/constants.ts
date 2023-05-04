/* eslint-disable no-unused-vars */
const CANVAS_WIDTH = 350;
const CANVAS_HEIGHT = 800;
const CELL_SIZE = 30;
const RADIUS = 10;
const BATTLEFIELD_WIDTH = CELL_SIZE * 10;
const BATTLEFIELD_HEIGHT = CELL_SIZE * 10;

const PREPARATION_SCREEN_START_FIELD_COORD_X = 10;
const PREPARATION_SCREEN_START_FIELD_COORD_Y = 300;

const BACKGROUND_COLOR_SHIP = '#B3B3B3';
const UNKNOWN_COLOR = '#f29e1f';
const BORDER_COLOR_SHIP = '#818181';
const EMPTY_COLOR = '#19d470';
const OCCUPIED_COLOR = '#1938d4';
const MISSED_COLOR = '#8c19d4';
const BURNING_COLOR = '#b31569';
const DESTROYED_COLOR = '#e33232';
const CELL_GAP = 5;
const direction = 'row';
const turnButton = 'KeyF';
const column = 'column';
const row = 'row';

//координаты кораблей будут другими в финальной версии
//сейчас просто отображаю их под сеткой с полем игры
const shipDatas = [
	{
		id: 1,
		size: 4,
		startPosition: {
			x: 65 + PREPARATION_SCREEN_START_FIELD_COORD_X,
			y: 190 + PREPARATION_SCREEN_START_FIELD_COORD_Y,
		},
		position: {
			x: 65 + PREPARATION_SCREEN_START_FIELD_COORD_X,
			y: 190 + PREPARATION_SCREEN_START_FIELD_COORD_Y,
		},
		cells: [],
		color: BACKGROUND_COLOR_SHIP,
		borderColor: BORDER_COLOR_SHIP,
	},
	{
		id: 2,
		size: 3,
		startPosition: {
			x: 15 + PREPARATION_SCREEN_START_FIELD_COORD_X,
			y: 135 + PREPARATION_SCREEN_START_FIELD_COORD_Y,
		},
		position: {
			x: 15 + PREPARATION_SCREEN_START_FIELD_COORD_X,
			y: 135 + PREPARATION_SCREEN_START_FIELD_COORD_Y,
		},
		cells: [],
		color: BACKGROUND_COLOR_SHIP,
		borderColor: BORDER_COLOR_SHIP,
	},
	{
		id: 3,
		size: 3,
		startPosition: {
			x: 155 + PREPARATION_SCREEN_START_FIELD_COORD_X,
			y: 135 + PREPARATION_SCREEN_START_FIELD_COORD_Y,
		},
		position: {
			x: 155 + PREPARATION_SCREEN_START_FIELD_COORD_X,
			y: 135 + PREPARATION_SCREEN_START_FIELD_COORD_Y,
		},
		cells: [],
		color: BACKGROUND_COLOR_SHIP,
		borderColor: BORDER_COLOR_SHIP,
	},
	{
		id: 4,
		size: 2,
		startPosition: {
			x: PREPARATION_SCREEN_START_FIELD_COORD_X,
			y: 80 + PREPARATION_SCREEN_START_FIELD_COORD_Y,
		},
		position: {
			x: PREPARATION_SCREEN_START_FIELD_COORD_X,
			y: 80 + PREPARATION_SCREEN_START_FIELD_COORD_Y,
		},
		cells: [],
		color: BACKGROUND_COLOR_SHIP,
		borderColor: BORDER_COLOR_SHIP,
	},
	{
		id: 5,
		size: 2,
		startPosition: {
			x: 105 + PREPARATION_SCREEN_START_FIELD_COORD_X,
			y: 80 + PREPARATION_SCREEN_START_FIELD_COORD_Y,
		},
		position: {
			x: 105 + PREPARATION_SCREEN_START_FIELD_COORD_X,
			y: 80 + PREPARATION_SCREEN_START_FIELD_COORD_Y,
		},
		cells: [],
		color: BACKGROUND_COLOR_SHIP,
		borderColor: BORDER_COLOR_SHIP,

	},
	{
		id: 6,
		size: 2,
		startPosition: {
			x: 210 + PREPARATION_SCREEN_START_FIELD_COORD_X,
			y: 80 + PREPARATION_SCREEN_START_FIELD_COORD_Y,
		},
		position: {
			x: 210 + PREPARATION_SCREEN_START_FIELD_COORD_X,
			y: 80 + PREPARATION_SCREEN_START_FIELD_COORD_Y,
		},
		cells: [],
		color: BACKGROUND_COLOR_SHIP,
		borderColor: BORDER_COLOR_SHIP,
	},
	{
		id: 8,
		size: 1,
		startPosition: {
			x: 25 + PREPARATION_SCREEN_START_FIELD_COORD_X,
			y: 25 + PREPARATION_SCREEN_START_FIELD_COORD_Y,
		},
		position: {
			x: 25 + PREPARATION_SCREEN_START_FIELD_COORD_X,
			y: 25 + PREPARATION_SCREEN_START_FIELD_COORD_Y,
		},
		cells: [],
		color: BACKGROUND_COLOR_SHIP,
		borderColor: BORDER_COLOR_SHIP,

	},
	{
		id: 9,
		size: 1,
		startPosition: {
			x: 85 + PREPARATION_SCREEN_START_FIELD_COORD_X,
			y: 25 + PREPARATION_SCREEN_START_FIELD_COORD_Y,
		},
		position: {
			x: 85 + PREPARATION_SCREEN_START_FIELD_COORD_X,
			y: 25 + PREPARATION_SCREEN_START_FIELD_COORD_Y,
		},
		cells: [],
		color: BACKGROUND_COLOR_SHIP,
		borderColor: BORDER_COLOR_SHIP,

	},
	{
		id: 10,
		size: 1,
		startPosition: {
			x: 145 + PREPARATION_SCREEN_START_FIELD_COORD_X,
			y: 25 + PREPARATION_SCREEN_START_FIELD_COORD_Y,
		},
		position: {
			x: 145 + PREPARATION_SCREEN_START_FIELD_COORD_X,
			y: 25 + PREPARATION_SCREEN_START_FIELD_COORD_Y,
		},
		cells: [],
		color: BACKGROUND_COLOR_SHIP,
		borderColor: BORDER_COLOR_SHIP,

	},
	{
		id: 7,
		size: 1,
		startPosition: {
			x: 205 + PREPARATION_SCREEN_START_FIELD_COORD_X,
			y: 25 + PREPARATION_SCREEN_START_FIELD_COORD_Y,
		},
		position: {
			x: 205 + PREPARATION_SCREEN_START_FIELD_COORD_X,
			y: 25 + PREPARATION_SCREEN_START_FIELD_COORD_Y,
		},
		cells: [],
		color: BACKGROUND_COLOR_SHIP,
		borderColor: BORDER_COLOR_SHIP,
	},
];

const MoonGroundCellStatus = {
	UNKNOWN: 'UNKNOWN',
	EMPTY: 'EMPTY',
	OCCUPIED: 'OCCUPIED',
	MISSED: 'MISSED',
	BURNING: 'BURNING',
	DESTROYED: 'DESTROYED',
};

export {
	CANVAS_WIDTH,
	CANVAS_HEIGHT,
	CELL_SIZE,
	shipDatas,
	CELL_GAP,
	BATTLEFIELD_WIDTH,
	BATTLEFIELD_HEIGHT,
	EMPTY_COLOR,
	OCCUPIED_COLOR,
	MISSED_COLOR,
	BURNING_COLOR,
	DESTROYED_COLOR,
	RADIUS,
	PREPARATION_SCREEN_START_FIELD_COORD_X,
	PREPARATION_SCREEN_START_FIELD_COORD_Y,
	BORDER_COLOR_SHIP,
	UNKNOWN_COLOR,
	direction,
	turnButton,
	column,
	row,
	MoonGroundCellStatus,
};
