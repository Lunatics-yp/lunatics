import {Languages} from 'client/src/stores/reducers/userSettings/typing';

export const VOLUMES = (new Array(11)).fill(0).map((_value, index) => `${index}`);

export const LANGUAGES = [
	Languages.Russian, Languages.English,
];

export const KEY_ENTER = 'Enter';

// Кнопка переключения полноэкранного режима
export const KEY_F = 'KeyF';
