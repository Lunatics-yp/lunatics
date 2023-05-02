import {ButtonHTMLAttributes, FC} from 'react';
import styles from './fullScreen.module.scss';
import {useFullscreen} from 'client/src/hooks/useFullscreen';

export const FullScreen:FC<ButtonHTMLAttributes<HTMLButtonElement>> = (props) => {
	const {...attrs} = props;
	const {isFullscreen} = useFullscreen();
	return (
		<button
			className={styles.fullScreen}
			title={!isFullscreen ? 'Полноэкранный режим' : 'Выход из полноэкранного режима'}
			{...attrs}
		>
			{!isFullscreen ?
				(<svg fill='none' viewBox='0 0 24 24'strokeWidth={1.5} stroke='currentColor'
					className={`${styles.fullScreen__icon} ${styles.iconOpen}`}>
					<path strokeLinecap='round' strokeLinejoin='round'
						d='M3.75 3.75v4.5m0-4.5h4.5m-4.5 0L9 9M3.75 20.25v-4.5m0
						4.5h4.5m-4.5 0L9 15M20.25 3.75h-4.5m4.5 0v4.5m0-4.5L15 9m5.25
						11.25h-4.5m4.5 0v-4.5m0 4.5L15 15'
					/>
				</svg>) :
				(<svg fill='none' viewBox='0 0 24 24' strokeWidth={1.5} stroke='currentColor'
					className={`${styles.fullScreen__icon} ${styles.iconClose}`}>
					<path strokeLinecap='round' strokeLinejoin='round'
						d='M9 9V4.5M9 9H4.5M9 9L3.75 3.75M9 15v4.5M9 15H4.5M9
						15l-5.25 5.25M15 9h4.5M15 9V4.5M15 9l5.25-5.25M15 15h4.5M15
						15v4.5m0-4.5l5.25 5.25'
					/>
				</svg>)
			}
		</button>
	);
};
