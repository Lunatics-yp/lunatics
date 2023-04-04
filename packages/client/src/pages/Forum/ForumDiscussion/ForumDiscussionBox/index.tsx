import {Link, useParams} from 'react-router-dom';
import {PATHS} from 'client/src/routers/name';
import {Button} from 'client/src/components/Button';
import {ForumDiscussionColumn} from './ForumDiscussionColumn';
import styles from './ForumDiscussionBox.module.scss';

const dataMock = [
	{id: 1, title: 'Sky Wars', name: 'Obi Wan Kenobi', date: 'the 22th of December'},
	{id: 2, title: 'Благодарность разработчикам', name: 'Евгений Малкин', date: 'вчера'},
	{id: 3, title: 'Война и мир', name: 'Лев Толстой', date: '1867 год'}
];

export const ForumDiscussionBox = () => {
	const topicName = useParams().disccussionTitle;
	const topics = dataMock;

	const topicElements = topics.map((topic) => (
		<ForumDiscussionColumn
			key={topic.id}
			title={topic.title}
			name={topic.name}
			date={topic.date}
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
					{topicElements}
				</div>
			</div>
		</main>
	);
};
