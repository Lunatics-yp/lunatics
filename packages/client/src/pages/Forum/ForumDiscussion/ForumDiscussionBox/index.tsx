import {Link, useParams} from 'react-router-dom';
import {PATHS} from 'client/src/routers/name';
import {useAppSelector, useAppDispatch} from 'client/src/hooks/redux';
import {useInput} from 'client/src/hooks/useInput';
import {forumSelectors, forumActions} from 'client/src/stores/reducers/forum/forumSlice';
import {Button} from 'client/src/components/Button';
import {ForumDiscussionColumn} from './ForumDiscussionColumn';
import styles from './ForumDiscussionBox.module.scss';

export const ForumDiscussionBox = () => {
	const {disccussionTitle} = useParams();
	const newTopic = useInput('');
	const discussions = useAppSelector(forumSelectors.discussions);
	const dispatch = useAppDispatch();
	const isLoading = useAppSelector(forumSelectors.isLoading);
	const error = useAppSelector(forumSelectors.error);

	const topicElements = discussions.map((discussion) => (
		<ForumDiscussionColumn
			key={discussion.id}
			title={discussion.title}
			lastAuthorName={discussion.lastAuthorName}
			date={discussion.date}
		/>
	));

	function createTopic() {
		const newTopicContent = newTopic.value.trim();

		if (newTopicContent) {
			dispatch(forumActions.addTopic(newTopicContent));
		}

		newTopic.reset();
	}

	// const renderTopic = () => {
	// 	if (isLoading) return <div>Loading ...</div>
	// 	if (error) return <div>Произошла ошибка {error}</div>
	// 	if (discussions.length == 0) return <div>Нет форумов</div>

	// 	return (
	// 		<>
	// 			{topicElements}
	// 		</>
	// 	)

	// }

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
						<input
							onChange={newTopic.onChange}
							value={newTopic.value}
							type='text'
							placeholder='Новый топик'
							className={styles.input}
							maxLength={50}
						/>
						<Button
							text='Создать топик'
							onClick={createTopic}
						/>
					</div>
				</header>
				<div className={styles.container__elements}>
					{topicElements.length > 0 && topicElements}
				</div>

			</div>
			{/* {renderTopic()} */}
		</main>
	);
};
