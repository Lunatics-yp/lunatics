import {Link, useParams} from 'react-router-dom';
import {PATHS} from 'client/src/routers/name';
import {Button} from 'client/src/components/Button';
import {ForumDiscussionColumn} from './ForumDiscussionColumn';
import styles from './ForumDiscussionBox.module.scss';

export const ForumDiscussionBox = () => {
	const topicName = useParams().disccussionTitle;

	return (
		<main className={styles.wrapper}>
			<div className={styles.container}>
				<header className={styles.header}>
					<div className={styles.header__left}>
						<Link to={PATHS.forum}>
							<h2 className={styles.title}>Форумы</h2>
						</Link>
						<span className={`${styles.arrow} ${styles.title_base}`}>{'>'}</span>
						<h2 className={`${styles.title} ${styles.title_base}`}>Просмотр форума</h2>
						<h2 className={styles.title_base}>{topicName}</h2>
					</div>
					<div className={styles.header__right}>
						<Button
							text='Создать тему'
							onClick={() => {
								console.log('Открытие модального окна');
							}}
						/>
					</div>
				</header>
				<div className={styles.container__elements}>
					<ForumDiscussionColumn/>
					<ForumDiscussionColumn/>
				</div>
			</div>
		</main>
	);
};
