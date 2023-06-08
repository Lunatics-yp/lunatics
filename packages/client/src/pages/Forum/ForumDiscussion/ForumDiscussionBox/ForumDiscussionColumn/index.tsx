import {FC} from 'react';
import {Link} from 'react-router-dom';
import {Avatar} from 'client/src/components/Avatar';
import {TForumDiscussionColumnProps} from './typing';
import styles from './ForumDiscussionColumn.module.scss';

export const ForumDiscussionColumn: FC<TForumDiscussionColumnProps> = props => {
	const {name, lastAuthorName, id} = props;

	return (
		<div className={styles.element}>
			<Link to={id.toString()}>
				<div className={styles.element__title}>
					<div className={styles.title}
						onClick={() => {
							console.log(`clicked: ${id}`);
						}}>
						<p className={styles.title__text}>{name}</p>
					</div>
				</div>
			</Link>
			<div className={styles.element__info}>
				<Avatar size='small'/>
				<div className={styles.info}>
					<div className={styles.info__name}>{lastAuthorName}</div>
					<span className={styles.info__date}></span>
				</div>
			</div>
		</div>
	);
};
