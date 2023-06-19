import {FC, useEffect, useState} from 'react';
import {MyTimer} from './timerClass';

type TProps = {
	isGameOver: boolean;
	updateTime: (newTime: string) => void;
};

export const Timer: FC<TProps> = (props) => {

	const {isGameOver, updateTime} = props;

	const [timer, setTimer] = useState<MyTimer>();

	const timerCallback = (timeString: string) => {
		if (!isGameOver) {
			setTime(timeString);
			updateTime(timeString);
		}
	};

	const [time, setTime] = useState('');

	const stop = () => {
		if (timer) {
			timer.stop();
		}
	};

	const start = () => {
		if (!timer) {
			setTimer(new MyTimer(timerCallback));
		} else {
			timer.start(timerCallback);
		}
	};

	useEffect(() => {
		isGameOver
			? stop()
			: start();
	}, [isGameOver]);

	return (
		<p data-testid='time'>{time}</p>
	);
};
