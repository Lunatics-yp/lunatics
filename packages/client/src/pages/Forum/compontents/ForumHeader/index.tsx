import styles from './ForumHeader.module.scss';

export const ForumHeader = () => {
	return (
		<>
			<div className={styles.header__left}>
				<p className={styles.title}>Форумы</p>
			</div>
			<div className={styles.header__right}>
				<p className={styles.title}>Темы</p>
			</div>
			<div className={styles.header__right}>
				<p className={styles.title}>Ответы</p>
			</div>
		</>
	);
};
