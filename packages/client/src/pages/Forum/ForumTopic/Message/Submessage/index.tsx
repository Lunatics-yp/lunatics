import {forwardRef} from 'react';
import moment from 'moment';
import {Like} from 'client/src/components/images/Like';
import {DATE_FORMAT} from 'client/src/config/constants';
import styles from './Submessage.module.scss';
import {TSubmessageProps} from './typing';

export const Submessage = forwardRef<HTMLDivElement, TSubmessageProps>(
	function Submessage({message}) {
		const {isOwner, text} = message;
		const time = moment(message.created_at).format(DATE_FORMAT);

		return (
			<div className={styles.submessage}>
				<span className={styles.message__author}>
					{message.User.display_name}
				</span>
				<span className={styles.message__date}>{time}</span>
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
