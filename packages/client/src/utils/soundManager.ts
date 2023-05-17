import {useState} from 'react';
import {SoundsList} from 'client/src/components/Sound/sounds';

export const SoundManager = () => {
	const [audioList, setAudioList] = useState<Record<string, Record<string, HTMLAudioElement>>>(
		{},
	);
	const [isOn, setIsOn] = useState<boolean>(false);
	const [isMuted, setIsMuted] = useState<boolean>(true);
	const createSound = (name: string) => {
		const src = SoundsList[name].src;
		const audio = new Audio(src);
		audio.muted = isMuted;
		audio.volume = SoundsList[name].volume;
		audio.loop = SoundsList[name].loop;

		audio.addEventListener('loadeddata', () => {
			const list = audioList;
			list[name] = {};
			list[name].audio = audio;
			setAudioList(list);
		});
	};
	const play = (name: string) => {
		if (!Object.keys(audioList).length || !audioList[name]) {
			return;
		}
		audioList[name].audio.play().catch((e: Error) => {
			console.error(e.message);
		});
	};
	const playSound = (name: string) => {
		if (!Object.keys(audioList).length || !audioList[name]) {
			return;
		}
		if (isMuted) return;
		play(name);
	};
	const soundToggle = (name: string) => {
		if (!Object.keys(audioList).length || !audioList[name]) {
			return;
		}
		if (!isOn) {
			play(name);
		} else {
			audioList[name].audio.pause();
		}
		setIsMuted(!isMuted);
		setIsOn(!isOn);
		mute(!isMuted);
	};
	const mute = (mute: boolean) => {
		for (const audio in audioList) {
			audioList[audio].audio.muted = mute;
		}
	};
	const playGameOver = () => {
		for (const audio in audioList) {
			if (isOn) {
				audioList[audio].audio.pause();
				audioList[audio].audio.currentTime = 0;
				setIsOn(false);
			}
		}

		play('gameOver');
	};

	return {
		createSound,
		play,
		soundToggle,
		playSound,
		playGameOver,
		isOn,
	};
};
