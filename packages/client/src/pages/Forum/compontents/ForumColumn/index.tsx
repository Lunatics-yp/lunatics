import {FC} from 'react';
import {NavLink} from 'react-router-dom';
import {TForumColumnProps} from './typing';
import styles from './ForumColumn.module.scss';

export const ForumColumn:FC<TForumColumnProps> = (props) => {
	const {forum, topics = 0, answers = 0, id = 0} = props;

	return (
		<>
			<NavLink to={forum} className={styles.link}>
				<div
					onClick={() => {
						console.log(`clicked: ${id}`);
					}}
					className={styles.forum}>
					<p>{forum}</p>
				</div>
			</NavLink>
			<div className={styles.item}>
				<p>{topics}</p>
			</div>
			<div className={styles.item}>
				<p>{answers}</p>
			</div>
		</>
	);
};
