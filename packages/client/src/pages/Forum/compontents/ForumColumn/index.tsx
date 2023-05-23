import {FC} from 'react';
import {NavLink} from 'react-router-dom';
import {TForumColumnProps} from './typing';
import styles from './ForumColumn.module.scss';

export const ForumColumn: FC<TForumColumnProps> = (props) => {
	const {title, discussionsCount = 0, answersCount = 0, id} = props;

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
				{/* //	<button>Удалить</button> */}
			</NavLink>
			<div className={styles.item}>
				<p>{discussionsCount}</p>
			</div>
			<div className={styles.item}>
				<p>{answersCount}</p>

			</div>
		</>
	);
};
