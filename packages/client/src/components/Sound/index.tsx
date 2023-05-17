import soundOn from 'client/src/assets/images/soundOn.png';
import soundOff from 'client/src/assets/images/soundOff.png';

import styles from './styles.module.scss';
import {MouseEventHandler} from 'react';

type TSoundProps = {
	play: MouseEventHandler<HTMLImageElement> | undefined;
	isOn: boolean;
};
export const Sound = (props: TSoundProps) => {
	const {play, isOn} = props;
	return (
		<img
			alt="sound"
			src={isOn ? `${soundOn}` : `${soundOff}`}
			className={styles.img}
			onClick={play}
		/>
	);
};
