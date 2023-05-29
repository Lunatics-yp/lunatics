import {FC} from 'react';
import {NavLink} from 'react-router-dom';
import {TForumColumnProps} from './typing';
import styles from './ForumColumn.module.scss';

export const ForumColumn: FC<TForumColumnProps> = (props) => {
	const {title, topicsCount = 0, answersCount = 0, id} = props;

	return (
		<>
			<NavLink to={title} className={styles.link}>
				<div
					onClick={() => {
						console.log(`clicked: ${id}`);
					}}
					className={styles.forum}>
					<p>{title}</p>
				</div>
			</NavLink>
			<div className={styles.item}>
				<p>{topicsCount}</p>
			</div>
			<div className={styles.item}>
				<p>{answersCount}</p>
			</div>
		</>
	);
};
