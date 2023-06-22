import {Link, useParams} from 'react-router-dom';
import {useAppSelector, useAppDispatch} from 'client/src/hooks/redux';
import {PATHS} from 'client/src/routers/name';
import {useInput} from 'client/src/hooks/useInput';
import {useTopics} from 'client/src/hooks/useTopics';
import {forumSelectors} from 'client/src/stores/reducers/forum/forumSlice';
import {forumThunks} from 'client/src/stores/reducers/forum/forumThunks';
import {Button} from 'client/src/components/Button';
import {ForumDiscussionColumn} from './ForumDiscussionColumn';
import styles from './ForumDiscussionBox.module.scss';

export const ForumDiscussionBox = () => {
	const {forumId = ''} = useParams();
	const newTopic = useInput('');
	const {topics} = useTopics(+forumId);
	const dispatch = useAppDispatch();
	const isLoading = useAppSelector(forumSelectors.isLoading);
	const error = useAppSelector(forumSelectors.error);
	const forums = useAppSelector(forumSelectors.forums);

	function createTopic() {
		const newTopicContent = newTopic.value.trim();

		if (newTopicContent && forumId) {
			dispatch(
				forumThunks.createTopic({
					action: 'topic.create',
					data: {
						forum_id: +forumId,
						name: newTopicContent,
					},
				}),
			);
		}

		newTopic.reset();
	}

	const renderTopics = () => {
		if (isLoading) {
			return <div className={styles.textLine}>Загрузка&hellip;</div>;
		}
		if (error) {
			return <div className={styles.textLine}>Произошла ошибка {error}</div>;
		}
		if (!topics.length) {
			return <div className={styles.textLine}>Нет топиков</div>;
		}
		return (
			<div className={styles.topics}>{topics.map(topic =>
				<ForumDiscussionColumn
					key={topic.id}
					id={topic.id}
					name={topic.name}
					lastMessage={topic.LastMessage}
				/>)}
			</div>
		);
	};

	// @todo нужно брать из сервера
	const Myforum = () => {
		let urlTopic:string = '';
		if (forumId != undefined) {
			for( const el of forums) {
				if (el.id === +forumId ){
					urlTopic =el.name;
				}
			}
		}
		return urlTopic;
	};

	return (
		<main className={styles.wrapper}>
			<div>
				<div className={styles.header__left}>
					<Link to={PATHS.forum}>
						<h2 className={styles.title}>Форумы</h2>
					</Link>
					<span className={`${styles.arrow} ${styles.title_base}`}>&gt;</span>
					<h2 className={styles.title_base}>{Myforum()}</h2>
				</div>
			</div>
			<div className={`${styles.formCreate}`}>
				<input
					onChange={newTopic.onChange}
					value={newTopic.value}
					type='text'
					placeholder='Название топика'
					className={styles.input}
					maxLength={50}
				/>
				<Button
					text='Создать топик'
					disabled={!newTopic.value}
					onClick={createTopic}
				/>
			</div>
			{renderTopics()}
		</main>
	);
};
