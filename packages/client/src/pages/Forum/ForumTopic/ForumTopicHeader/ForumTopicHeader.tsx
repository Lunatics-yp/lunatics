import {Link, useParams} from 'react-router-dom';
import {PATHS} from 'client/src/routers/name';
import {Button} from 'client/src/components/Button';
import styles from './ForumTopicHeader.module.scss';

export const ForumTopicHeader = () => {
	const topicName = useParams().topicTitle;
	return (
		<div className={styles.header}>
			<div className={styles.header__left}>
				<Link to={PATHS.forum}>
					<h2 className={styles.title}>Форумы</h2>
				</Link>
				<span className={styles.arrow}>{'>'}</span>
				<Link to={PATHS.topic}>
					<h2 className={styles.title}>Темы</h2>
				</Link>
				<span className={styles.arrow}>{'>'}</span>
				<h2 className={styles.title_color}>{topicName}</h2>
			</div>
			<div className={styles.header__right}>
				<Button
					text='Редактировать тему'
					onClick={() => {
						console.log('Открытие модального окна');
					}}
				/>
			</div>
		</div>
	);
};
