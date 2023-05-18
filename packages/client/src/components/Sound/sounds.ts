import background from 'client/src/assets/sounds/gameBackground.mp3';
import explosion from 'client/src/assets/sounds/explosion.mp3';
import gameOver from 'client/src/assets/sounds/game-over.mp3';
import {setupStore} from 'client/src/stores/store';

const store = setupStore().getState();
const musicVolume = (store.userSettingsReducer.settings.musicVolume) / 10;
const soundsVolume = (store.userSettingsReducer.settings.soundVolume) / 10;
export const SoundsList = {
	background: {
		src: background,
		volume: musicVolume,
		loop: true,
	},
	explosion: {
		src: explosion,
		volume: soundsVolume,
		loop: false,
	},
	gameOver: {
		src: gameOver,
		volume: soundsVolume,
		loop: false,
	},
};
