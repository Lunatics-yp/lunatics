import {forwardRef} from 'react';
import {Avatar} from 'client/src/components/Avatar';
import {Answer} from 'client/src/components/images/Answer';
import {Like} from 'client/src/components/images/Like';
import styles from './Message.module.scss';
import {TMessageProps} from './typing';
import {Submassage} from './Submassage';

export const Message = forwardRef<HTMLDivElement, TMessageProps>(
	function Message(props, ref) {
		const {message, messages, setSelectedParent} = props;
		const {isOwner, text, id} = message;
		const childrenMassage = messages.filter((el) => el.parentid === id);

		const newSubmassage = () => {
			setSelectedParent(id);
		};

		return (
			<div className={styles.wrapper} ref={ref}>
				{!isOwner && <Avatar size='medium'/>}
				<div
					className={`${styles.message}
					 ${styles.message_text} 
					${isOwner && styles.message_me
			}`}
				>
					<div className={styles.message__info}>
						<span className={styles.message__author}>{isOwner ? 'Вы' : 'Trevor'}</span>
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
						{childrenMassage.map((submessage, index) => (
							<Submassage key={index} message={submessage}/>
						))}
					</div>
				</div>
			</div>
		);
	},
);
