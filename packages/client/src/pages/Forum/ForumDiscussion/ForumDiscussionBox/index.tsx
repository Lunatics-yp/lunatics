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

	const renderTopic = () => {
		if (isLoading) return <div>Loading ...</div>;
		if (error) return <div>Произошла ошибка {error}</div>;
		if (topics.length === 0) return <div>Нет форумов</div>;
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
			<div className={styles.container}>
				<header className={styles.header}>
					<div className={styles.header__left}>
						<Link to={PATHS.forum}>
							<h2 className={styles.title}>Форумы</h2>
						</Link>
						<span className={`${styles.arrow} ${styles.title_base}`}>{'>'}</span>
						<h2 className={`${styles.title} ${styles.title_base}`}>Просмотр форума</h2>
						<h2 className={styles.title_base}>{Myforum()}</h2>
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
						<Button text='Создать топик' onClick={createTopic}/>
					</div>
				</header>
				<div className={styles.container__elements}>
					{topicElements.length > 0 && topicElements}
				</div>
			</div>
			{renderTopic()}
		</main>
	);
};