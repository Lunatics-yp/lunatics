import {FC} from 'react';
import {Link, useParams} from 'react-router-dom';
import {PATHS} from 'client/src/routers/name';
import {Button} from 'client/src/components/Button';
import {FullScreen} from 'client/src/components/images/FullScreen';
import {TForumTopicHeaderProps} from './typing';
import styles from './ForumTopicHeader.module.scss';

export const ForumTopicHeader:FC<TForumTopicHeaderProps> = (props) => {
	const {fullScreenHandler} = props;

	const topicName = useParams().topicId;
	return (
		<div className={styles.header}>
			<div className={styles.header__left}>
				<Link to={PATHS.forum}>
					<h2 className={styles.title}>Форумы</h2>
				</Link>
				<span className={styles.arrow}>&raquo;</span>
				<Link to={PATHS.topic}>
					<h2 className={styles.title}>Темы</h2>
				</Link>
				<span className={styles.arrow}>&raquo;</span>
				<h2 className={styles.title_color}>{topicName}</h2>
			</div>
			<div className={styles.header__right}>
				<div className={styles.fullScreen}>
					<Button
						text='Редактировать тему'
					/>
					<FullScreen
						onClick={fullScreenHandler}
					/>
				</div>
			</div>
		</div>
	);
};
