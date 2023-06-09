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
		const newForumContent = newForum.value.trim();

		if (newForumContent) {
			dispatch(
				forumThunks.createForum({
					action: 'forum.create',
					data: {
						name: newForumContent,
					},
				}),
			);
		}
		newForum.reset();
	}

	const renderForums = () => {
		if (isLoading) {
			return <div className={styles.textLine}>Загрузка&hellip;</div>;
		}
		if (error) {
			return <div className={styles.textLine}>Произошла ошибка {error}</div>;
		}
		if (!forums.length) {
			return <div className={styles.textLine}>Нет форумов</div>;
		}
		return <>{ForumColumnElements}</>;
	};

	return (
		<div className={styles.wrapper}>
			<div className={styles.forum__list}>
				<ForumHeader/>
				<div className={styles.formCreate}>
					<input
						onChange={newForum.onChange}
						value={newForum.value}
						type='text'
						placeholder='Название форума'
						className={styles.input}
						maxLength={50}
					/>
					<Button
						text='Создать форум'
						disabled={!newForum.value}
						onClick={createForum}
					/>
				</div>
				{renderForums()}
			</div>
		</div>
	);
};
