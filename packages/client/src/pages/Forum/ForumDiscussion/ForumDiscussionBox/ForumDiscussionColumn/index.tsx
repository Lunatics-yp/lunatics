import {Link} from 'react-router-dom';
import {Avatar} from 'client/src/components/Avatar';
import styles from './ForumDiscussionColumn.module.scss';

export const ForumDiscussionColumn = () => {
	return (

		<div className={styles.element}>
			<Link to={'Рекорды'}>
				<div className={styles.element__title}>
					<div className={styles.title}>
						<p>Рекорды</p>
					</div>
				</div>
			</Link>
			<div className={styles.element__info}>
				<Avatar size='small'/>
				<div className={styles.info}>
					<div className={styles.info__name}>
						Obi Wan Kenobi
					</div>
					<span className={styles.info__date}>
						the 23th of April
					</span>
				</div>
			</div>
		</div>
	);
};
