import {NavLink} from 'react-router-dom';
import styles from './ForumColumn.module.scss';

export const ForumColumn = ({forum='New Topic', topics=0, answers=0, id=0}) => {
	const TOPIC = 'topic/';
	return (
		<div className={styles.column}>
			<NavLink to={TOPIC + forum}>
				<div onClick={()=>{console.log(`clicked ${id}`);
				}} className={`${styles.column__left} ${styles.forum}`}>
					<p>{forum}</p>
				</div>
			</NavLink>
			<div className={`${styles.column__right}`}>
				<div className={styles.item}>
					<p>{topics}</p>
				</div>
				<div className={styles.item}>
					<p>{answers}</p>
				</div>
			</div>
		</div>
	);
};

