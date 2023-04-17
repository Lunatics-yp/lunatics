import {FC, useEffect, useState} from 'react';
import {MyTimer} from 'client/src/components/timer/timerClass';

type TProps = {
	isGameOver: boolean;
};

export const Timer: FC<TProps> = (props) => {

	const [timer, setTimer] = useState<MyTimer>();
	const timerCallback = (timeString: string) => {
		setTime(timeString);
	};

	const [time, setTime] = useState('');

	const stop = () => {
		if(timer){
			timer.stop();
		}
	};

	const start = () => {
		if(!timer){
			setTimer(new MyTimer(timerCallback));
		}else{
			timer.start(timerCallback);
		}
	};

	useEffect(() => {
		props.isGameOver
			? stop()
			: start();
	}, [props.isGameOver]);

	return (
		<p>{time}</p>
	);
};
