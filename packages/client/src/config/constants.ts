import {Languages} from 'client/src/stores/reducers/userSettings/typing';

export const VOLUMES = (new Array(11)).fill(0).map((_value, index) => `${index}`);

export const LANGUAGES = [
	Languages.Russian, Languages.English,
];

export const KEY_ENTER = 'Enter';

// Кнопка переключения полноэкранного режима
export const KEY_F = 'KeyF';

// Возможные типы реакций
export enum REACTIONS {
	ANGRY = 1,
	DISBELIEF = 2,
	LAUGHING = 3,
	LOVE = 4,
	PUKE = 5,
	SAD = 6,
	THUMB_DOWN = 7,
	THUMB_UP = 8,
}

export const DATE_FORMAT = 'DD.MM.YYYY HH:mm:ss';
