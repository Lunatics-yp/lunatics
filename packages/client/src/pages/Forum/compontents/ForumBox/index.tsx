import {useAppDispatch, useAppSelector} from 'client/src/hooks/redux';
import {forumActions, forumSelectors} from 'client/src/stores/reducers/forum/forumSlice';
import {useInput} from 'client/src/hooks/useInput';
import {ForumColumn} from '../ForumColumn';
import {ForumHeader} from '../ForumHeader';
import {Button} from 'client/src/components/Button';
import styles from './ForumBox.module.scss';

export const ForumBox = () => {

	const newTopic = useInput('');
	const forums = useAppSelector(forumSelectors.forums);
	const isLoading = useAppSelector(forumSelectors.isLoading);
	const dispatch = useAppDispatch();
	const error = useAppSelector(forumSelectors.error);
	const ForumColumnElements = forums.map((forum) => (
		<ForumColumn
			key={forum.id}
			id={forum.id}
			title={forum.title}
			discussionsCount={forum.discussionsCount}
			answersCount={forum.answersCount}
		/>
	));

	function createTopic() {
		const newTopicContent = newTopic.value.trim();

		if (newTopicContent) {
			dispatch(forumActions.addForum(newTopicContent));
		}

		newTopic.reset();
	}

	const renderForums = () => {
		if (isLoading) return <div>Loading ...</div>;
		if (error) return <div>Произошла ошибка {error}</div>;
		if (forums.length == 0) return <div>Нет форумов</div>;

		return (
			<>
				{ForumColumnElements}
			</>
		);

	};

	return (
		<div className={styles.wrapper}>
			<div className={styles.topic__list}>
				<ForumHeader/>
				<div></div>
				<input
					onChange={newTopic.onChange}
					value={newTopic.value}
					type='text'
					placeholder='Новая тема'
					className={styles.input}
					maxLength={50}
				/>
				<div className={styles.button}>
					<Button
						disabled={!newTopic.value}
						text='Создать форум'
						onClick={createTopic}
					/>
				</div>
				{renderForums()}
			</div>
		</div>
	);
};
