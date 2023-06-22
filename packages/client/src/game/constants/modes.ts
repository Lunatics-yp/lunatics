import {shape1, shape2, shape3, shape4} from './shapes';

import type {TModes, TModesData} from './typing';

export const modes: TModes[] = [
	'Стандартный',
	'Лунный кратер',
	'Галактический размах',
];

export const modesData: TModesData = {
	'Стандартный' : {
		map: {
			width: 10,
			height: 10,
		},
		ships: [
			{
				shape: shape4,
				count: 1,
			},
			{
				shape: shape3,
				count: 2,
			},
			{
				shape: shape2,
				count: 3,
			},
			{
				shape: shape1,
				count: 4,
			},
		],
	},
	'Лунный кратер' : {
		map: {
			width: 4,
			height: 4,
		},
		ships: [
			{
				shape: shape2,
				count: 2,
			},
		],
	},
	'Галактический размах' : {
		map: {
			width: 20,
			height: 20,
		},
		ships: [
			{
				shape: shape4,
				count: 4,
			},
			{
				shape: shape3,
				count: 4,
			},
			{
				shape: shape2,
				count: 4,
			},
			{
				shape: shape1,
				count: 4,
			},
		],
	},
};
