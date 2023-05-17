import background from 'client/src/assets/sounds/gameBackground.mp3';
import explosion from 'client/src/assets/sounds/explosion.mp3';
import gameOver from 'client/src/assets/sounds/game-over.mp3';

export const SoundsList = {
	background: {
		src: background,
		volume: 0.1,
		loop: true,
	},
	explosion: {
		src: explosion,
		volume: 1,
		loop: false,
	},
	gameOver: {
		src: gameOver,
		volume: 0.5,
		loop: false,
	},
};
