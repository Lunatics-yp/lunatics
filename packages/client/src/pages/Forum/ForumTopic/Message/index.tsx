import {Avatar} from 'client/src/components/Avatar';
import styles from './Message.module.scss';
import {TMessageProps} from './typing';

export const Message = ({message}: TMessageProps) => {
	const {isOwner} = message;
	const messageTest = message.text;
	return (
		<div className={styles.wrapper}>
			{!isOwner && <Avatar size='medium'/>}
			<div className={`${styles.message} ${styles.message_text}
				${isOwner && styles.message_me}`}
			>
				<div className={styles.message__info}>
					<span className={styles.message__author}>
						{isOwner ? 'Вы' : 'Trevor'}
					</span>
					<span className={styles.message__date}>23 мар 2023 в 21:31</span>
				</div>
				<p>{messageTest}</p>
				{/* Чтобы сделать цвет красным нужно добавить класс ${styles.like} */}
				<div className={`${styles.message__reaction}`}>
					<svg
						fill='none'
						viewBox='0 0 24 24'
						strokeWidth={1.5}
						stroke='currentColor'
					>
						<path
							strokeLinecap='round'
							strokeLinejoin='round'
							d='M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935
							0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1
							3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12z'
						/>
					</svg>
					<span>1</span>
				</div>
			</div>
		</div>
	);
};
