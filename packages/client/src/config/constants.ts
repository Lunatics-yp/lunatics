import {Languages} from 'client/src/stores/reducers/userSettings/typing';

export const VOLUMES = (new Array(11)).fill(0).map((_value, index) => `${index}`);

export const LANGUAGES = [
	Languages.Russian, Languages.English,
];
