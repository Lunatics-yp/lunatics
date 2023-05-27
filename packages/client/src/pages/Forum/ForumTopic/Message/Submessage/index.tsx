import {forwardRef} from 'react';
import {Like} from 'client/src/components/images/Like';
import styles from './Submessage.module.scss';
import {TSubmessageProps} from './typing';

export const Submessage = forwardRef<HTMLDivElement, TSubmessageProps>(
	function Submessage({message}) {
		const {isOwner, text} = message;

		return (
			<div className={styles.submessage}>
				<span className={styles.message__author}>
					{isOwner ? 'Вы' : 'Trevor'}
				</span>
				<span className={styles.message__date}>23 мар 2023 в 21:31</span>
				<div className={`${styles.submessage__content}
				 ${isOwner && styles.submessage__content_me}`}>
					<p>{text}</p>
					<div className={styles.submessage__reaction}>
						<Like/>
						<span className={styles.submessage__reaction__count}>2</span>
					</div>
				</div>
			</div>
		);
	});
