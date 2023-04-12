import {PayloadAction, createSlice} from '@reduxjs/toolkit';
import {RootState} from 'client/src/stores/store';
import {TUserSettingState} from './typing';

const initialState: TUserSettingState = {
	settings: {
		language: 'Русский',
		soundVolume: 10,
		musicVolume: 10,
	},
	theme: 'dark',
};

export const userSettingsSlice = createSlice({
	name: 'settings',
	initialState,
	reducers: {
		toggleLanguage(state,  {payload}: PayloadAction<number>) {
			payload === 0 ? state.settings.language = 'Русский' :
				state.settings.language = 'English';
		},
		changeSoundVolume(state, {payload}: PayloadAction<number>) {
			state.settings.soundVolume = payload;
		},
		changeSoundMusic(state, {payload}: PayloadAction<number>) {
			state.settings.musicVolume = payload;
		},
	},
});

export const userSettingsSelectors = {
	settings: (state: RootState) => state.userSettingsReducer.settings,
	theme: (state: RootState) => state.userSettingsReducer.theme,
};
export const userSettingsActions = userSettingsSlice.actions;
export default userSettingsSlice.reducer;
