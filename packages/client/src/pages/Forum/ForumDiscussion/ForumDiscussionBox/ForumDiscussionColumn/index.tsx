import {FC} from 'react';
import {Link} from 'react-router-dom';
import moment from 'moment/moment';
import {DATE_FORMAT} from 'client/src/config/constants';
import {Avatar} from 'client/src/components/Avatar';
import {TForumDiscussionColumnProps} from './typing';
import styles from './ForumDiscussionColumn.module.scss';

export const ForumDiscussionColumn: FC<TForumDiscussionColumnProps> = props => {
	const {id, name, lastMessage} = props;
	const hasMessages = lastMessage && lastMessage.id !== undefined;
	let messageDate;
	let messageUser;
	if (hasMessages && lastMessage.User) {
		messageUser = lastMessage.User;
		messageDate = moment(lastMessage.created_at).format(DATE_FORMAT);
	}

	return (
		<div className={styles.element}>
			<Link to={id.toString()}>
				<div className={styles.element__title}>
					<div className={styles.title}>
						<p className={styles.title__text}>{name}</p>
					</div>
				</div>
			</Link>
			{hasMessages && messageUser && (
				<div className={styles.element__info}>
					<Avatar size='small' src={messageUser.avatar}/>
					<div className={styles.info}>
						<div className={styles.info__name}>{messageUser.display_name}</div>
						<span className={styles.info__date}>{messageDate}</span>
					</div>
				</div>
			)}
		</div>
	);
};
