import {Link, useParams} from 'react-router-dom';
import {PATHS} from 'client/src/routers/name';
import {useAppSelector} from 'client/src/hooks/redux';
import {forumSelectors} from 'client/src/stores/reducers/forum/forumSlice';
import {Button} from 'client/src/components/Button';
import {ForumDiscussionColumn} from './ForumDiscussionColumn';
import styles from './ForumDiscussionBox.module.scss';

export const ForumDiscussionBox = () => {
	const {disccussionTitle} = useParams();
	
	const discussions = useAppSelector(forumSelectors.discussions);

	const topicElements = discussions.map((discussion) => (
		<ForumDiscussionColumn
			key={discussion.id}
			title={discussion.title}
			lastAuthorName={discussion.lastAuthorName}
			date={discussion.date}
		/>
	));

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
						<h2 className={styles.title_base}>{disccussionTitle}</h2>
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
					{topicElements}
				</div>
			</div>
		</main>
	);
};
