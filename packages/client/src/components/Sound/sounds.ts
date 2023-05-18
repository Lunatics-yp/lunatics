import {useAppSelector} from 'client/src/hooks/redux';

import background from 'client/src/assets/sounds/gameBackground.mp3';
import explosion from 'client/src/assets/sounds/explosion.mp3';
import gameOver from 'client/src/assets/sounds/game-over.mp3';
import {userSettingsSelectors} from 'client/src/stores/reducers/userSettings/userSettingsSlice';

export const SoundsList = () => {
	const {musicVolume, soundVolume} = useAppSelector(userSettingsSelectors.settings);

	const soundsList = {
		background: {
			src: background,
			volume: musicVolume / 10,
			loop: true,
		},
		explosion: {
			src: explosion,
			volume: soundVolume / 10,
			loop: false,
		},
		gameOver: {
			src: gameOver,
			volume: soundVolume / 10,
			loop: false,
		},
	};

	return {
		soundsList,
	};
};
