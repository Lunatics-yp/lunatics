import {forwardRef} from 'react';
import {Avatar} from 'client/src/components/Avatar';
import {Answer} from 'client/src/components/images/Answer';
import {Like} from 'client/src/components/images/Like';
import {TMessageProps} from './typing';
import {Submessage} from './Submessage';
import styles from './Message.module.scss';

export const Message = forwardRef<HTMLDivElement, TMessageProps>(function Message(props, ref) {
	const {message, messages, setSelectedParent} = props;
	const {isOwner, text, id} = message;

	const childrenMassage = messages.filter(el => el.parent_message_id === id);

	const newSubmassage = () => {
		setSelectedParent(id);
	};

	return (
		<div className={styles.wrapper} ref={ref}>
			{!isOwner && <Avatar size="medium"/>}
			<div
				// eslint-disable-next-line max-len
				className={`${styles.message}  ${styles.message_text} ${
					isOwner && styles.message_me
				}`}>
				<div className={styles.message__info}>
					<span className={styles.message__author}></span>
					<span className={styles.message__date}>23 мар 2023 в 21:31</span>
				</div>
				<p>{text}</p>
				<button className={styles.message__dell} onClick={newSubmassage}>
					<Answer/>
				</button>
				<div className={`${styles.message__reaction}`}>
					<Like/>
					<span className={`${styles.reaction__count}`}>1</span>
				</div>
				<div className={styles.message__sub}>
					{childrenMassage.map((_submessage, index) => (
						<Submessage key={index} message={_submessage}/>
					))}
				</div>
			</div>
		</div>
	);
});
