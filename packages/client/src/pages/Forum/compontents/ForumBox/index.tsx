import {useAppDispatch, useAppSelector} from 'client/src/hooks/redux';
import {forumSelectors} from 'client/src/stores/reducers/forum/forumSlice';
import {useInput} from 'client/src/hooks/useInput';
import {ForumColumn} from '../ForumColumn';
import {ForumHeader} from '../ForumHeader';
import {Button} from 'client/src/components/Button';
import styles from './ForumBox.module.scss';
import {forumThunks} from 'client/src/stores/reducers/forum/forumThunks';
import {useForum} from 'client/src/hooks/useForum';

export const ForumBox = () => {
	const {forums} = useForum();
	const newForum = useInput('');
	//const forums = useAppSelector(forumSelectors.forums);
	const isLoading = useAppSelector(forumSelectors.isLoading);
	const dispatch = useAppDispatch();
	const error = useAppSelector(forumSelectors.error);
	const ForumColumnElements = forums.map(forum => (
		<ForumColumn key={forum.id} id={forum.id} name={forum.name}/>
	));

	function createForum() {
		const newTopicContent = newForum.value.trim();

		if (newTopicContent) {
			// dispatch(forumActions.addForum(newTopicContent));
			dispatch(
				forumThunks.createForum({
					action: 'forum.create',
					data: {
						name: newTopicContent,
					},
					// eslint-disable-next-line @typescript-eslint/comma-dangle
				})
			);
		}
		newForum.reset();
	}

	const renderForums = () => {
		if (isLoading) return <div>Loading ...</div>;
		if (error) return <div>Произошла ошибка {error}</div>;
		if (forums.length == 0) return <div>Нет форумов</div>;

		return <>{ForumColumnElements}</>;
	};

	return (
		<div className={styles.wrapper}>
			<div className={styles.topic__list}>
				<ForumHeader/>
				<div></div>
				<input
					onChange={newForum.onChange}
					value={newForum.value}
					type="text"
					placeholder="Новая тема"
					className={styles.input}
					maxLength={50}
				/>
				<div className={styles.button}>
					<Button disabled={!newForum.value} text='Создать форум' onClick={createForum}/>
				</div>
				{renderForums()}
			</div>
		</div>
	);
};
