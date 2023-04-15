import {FC, useEffect, useState} from 'react';

type TProps = {
	isGameOver: boolean;
};
let timerId: NodeJS.Timer;

export const Timer: FC<TProps> = (props) => {
	const [time, setTime] = useState('');
	let sec = 0;
	let min = 0;
	let hrs = 0;

	useEffect( () => {
		timer();
	}, [props.isGameOver]);
	function tick(){
		sec++;
		if (sec >= 60) {
			sec = 0;
			min++;
			if (min >= 60) {
				min = 0;
				hrs++;
			}
		}
	}
	function add() {
		tick();
		const textContent = (hrs > 9 ? hrs : '0' + hrs)
			+ ':' + (min > 9 ? min : '0' + min)
			+ ':' + (sec > 9 ? sec : '0' + sec);
		setTime(textContent);
		timer();
	}
	function timer() {
		if(!props.isGameOver) {
			timerId = setTimeout(add, 1000);
		} else {
			clearTimeout(timerId);
		}
	}
	return (
		<p id='timer'>{time}</p>
	);
};
