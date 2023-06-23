import styles from './ForumHeader.module.scss';

export const ForumHeader = () => {
	return (
		<>
			<div className={styles.header__left}>
				<h2 className={styles.title}>Форумы</h2>
			</div>
			<div className={styles.header__right}>
				<p className={styles.title}>Топики</p>
			</div>
			<div className={styles.header__right}>
				<p className={styles.title}>Сообщения</p>
			</div>
		</>
	);
};
