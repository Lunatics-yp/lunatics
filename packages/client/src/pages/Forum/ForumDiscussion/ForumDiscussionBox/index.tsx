import {Link, useParams} from 'react-router-dom';
import {PATHS} from 'client/src/routers/name';
import {useAppSelector, useAppDispatch} from 'client/src/hooks/redux';
import {useInput} from 'client/src/hooks/useInput';
import {forumSelectors} from 'client/src/stores/reducers/forum/forumSlice';
import {Button} from 'client/src/components/Button';
import {ForumDiscussionColumn} from './ForumDiscussionColumn';
import {forumThunks} from 'client/src/stores/reducers/forum/forumThunks';
import styles from './ForumDiscussionBox.module.scss';
import {useTopics} from 'client/src/hooks/useTopics';

export const ForumDiscussionBox = () => {
	const {forumId = ''} = useParams();
	const forums = useAppSelector(forumSelectors.forums);
	const newTopic = useInput('');
	const {topics} = useTopics(+forumId);
	const dispatch = useAppDispatch();
	const isLoading = useAppSelector(forumSelectors.isLoading);
	const error = useAppSelector(forumSelectors.error);

	const topicElements = topics.map(topics => (
		<ForumDiscussionColumn key={topics.id} id={topics.id} name={topics.name}/>
	));

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

	const renderTopicsInfo = () => {
		if (isLoading) {
			return <div className={styles.textLine}>Загрузка&hellip;</div>;
		}
		if (error) {
			return <div className={styles.textLine}>Произошла ошибка {error}</div>;
		}
		if (!topics.length) {
			return <div className={styles.textLine}>Нет топиков</div>;
		}
	};

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
	console.log(useAppSelector((state)=> state));

	return (
		<main className={styles.wrapper}>
			<header className={styles.header}>
				<div className={styles.header__left}>
					<Link to={PATHS.forum}>
						<h2 className={styles.title}>Форумы</h2>
					</Link>
					<span className={`${styles.arrow} ${styles.title_base}`}>&gt;</span>
					<h2 className={styles.title_base}>{Myforum()}</h2>
				</div>
			</header>
			<div className={`${styles.formCreate}`}>
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
					disabled={!newTopic.value}
					onClick={createTopic}
				/>
			</div>
			{renderTopicsInfo()}
			{!!topicElements.length && (
				<div className={styles.topics}>
					{topicElements}
				</div>
			)}
		</main>
	);
};
