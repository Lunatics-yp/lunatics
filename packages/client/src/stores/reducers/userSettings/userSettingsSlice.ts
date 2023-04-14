import {PayloadAction, createSlice} from '@reduxjs/toolkit';
import {RootState} from 'client/src/stores/store';
import {Languages, TUserSettingState, Theme} from './typing';

const initialState: TUserSettingState = {
	settings: {
		language: Languages.Russian,
		soundVolume: 10,
		musicVolume: 10,
	},
	theme: Theme.Dark,
};

export const userSettingsSlice = createSlice({
	name: 'settings',
	initialState,
	reducers: {
		toggleLanguage(state,  {payload}: PayloadAction<number>) {
			state.settings.language = (payload === 0) ? Languages.Russian : Languages.English;
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
