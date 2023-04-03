import {NavLink} from 'react-router-dom';
import styles from './ForumColumn.module.scss';

export const ForumColumn = ({forum = 'New Topic', topics = 0, answers = 0, id = 0}) => {
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
