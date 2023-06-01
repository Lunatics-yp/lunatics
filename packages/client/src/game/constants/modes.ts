import {shape1, shape2, shape3, shape4} from './shapes';

import type {TModes, TModesData} from './typing';

export const modes: TModes[] = [
	'Обычный',
	'Необычный',
];

export const modesData: TModesData = {
	'Обычный' : {
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
	'Необычный' : {
		map: {
			width: 3,
			height: 3,
		},
		ships: [
			{
				shape: shape2,
				count: 2,
			},
		],
	},
};
