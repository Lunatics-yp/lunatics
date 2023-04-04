import {FC} from 'react';
import {Avatar} from 'client/src/components/Avatar';
import {Like} from 'client/src/components/images/Like';
import styles from './Message.module.scss';
import {TMessageProps} from './typing';

export const Message: FC<TMessageProps> = ({message}) => {
	const {isOwner, text} = message;
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
				<p>{text}</p>
				{/* Чтобы сделать цвет красным нужно добавить класс ${styles.like} */}
				<div className={`${styles.message__reaction}`}>
					<Like/>
					<span>1</span>
				</div>
			</div>
		</div>
	);
};
