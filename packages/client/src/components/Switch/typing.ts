import {Fn} from 'client/src/types';

export type TSwitch = {
	// Список значений
	list: string[];
	// Индекс дефолтного значения
	defaultValue?: number;
	// Заголовок для селектора
	label?: string;
	// Метод, вызываемый при изменении значения селектора
	onSwitch: Fn<void, number>;
	// Зациклить список
	looped?: boolean;
	// Значение из store
	value?: string | number;
};
