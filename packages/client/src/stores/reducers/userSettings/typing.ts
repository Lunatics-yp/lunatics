
export type TUserSettingState = {
	settings: {
		language: Languages;
		soundVolume: number;
		musicVolume: number;
	};
	theme: Theme;
};

/* eslint-disable no-unused-vars */
export enum Languages {
	Russian = 'Русский',
	English = 'English',
}

export enum Theme {
	Dark = 'dark',
	Light = 'light',
}
