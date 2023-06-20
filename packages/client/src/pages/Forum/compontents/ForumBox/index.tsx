import {useNavigate} from 'react-router-dom';
import {useAuth} from 'client/src/hooks/useAuth';
import {useAppDispatch, useAppSelector} from 'client/src/hooks/redux';
import {forumSelectors} from 'client/src/stores/reducers/forum/forumSlice';
import {useInput} from 'client/src/hooks/useInput';
import {ForumColumn} from '../ForumColumn';
import {ForumHeader} from '../ForumHeader';
import {Button} from 'client/src/components/Button';
import {forumThunks} from 'client/src/stores/reducers/forum/forumThunks';
import {useForums} from 'client/src/hooks/useForums';
import {PATHS} from 'client/src/routers/name';
import styles from './ForumBox.module.scss';

export const ForumBox = () => {
	const navigate = useNavigate();
	const user = useAuth();
	const {forums} = useForums();
	const newForum = useInput('');
	const isLoading = useAppSelector(forumSelectors.isLoading);
	const dispatch = useAppDispatch();
	const error = useAppSelector(forumSelectors.error);
	const ForumColumnElements = forums.map(forum => (
		<ForumColumn key={forum.id} id={forum.id} name={forum.name}/>
	));

	if (!user) {
		navigate(PATHS.auth);
	}

	function createForum() {
		const newTopicContent = newForum.value.trim();

		if (newTopicContent) {
			dispatch(
				forumThunks.createForum({
					action: 'forum.create',
					data: {
						name: newTopicContent,
					},
				}),
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
					type='text'
					placeholder='Новая тема'
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
