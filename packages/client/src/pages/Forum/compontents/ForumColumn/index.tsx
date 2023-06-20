import {FC} from 'react';
import {NavLink} from 'react-router-dom';
import {TForumColumnProps} from './typing';
import styles from './ForumColumn.module.scss';

/**
 * Строка с элементом форума
 */
export const ForumColumn: FC<TForumColumnProps> = props => {
	const {name, id} = props;

	return (
		<>
			<NavLink to={id.toString()} className={styles.link}>
				<div className={styles.forum}>
					<p>{name}</p>
				</div>
			</NavLink>
			<div className={styles.item}>
				<p>&nbsp;</p>
			</div>
			<div className={styles.item}>
				<p>&nbsp;</p>
			</div>
		</>
	);
};
