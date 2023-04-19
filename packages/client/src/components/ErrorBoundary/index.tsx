import {useRouteError} from 'react-router-dom';
import {ErrorBody} from './ErrorBody';
import styles from './errorBoundary.module.scss';

export const ErrorBoundary = () => {
	const error = useRouteError();
	return (
		<main className={styles.wrapper}>
			<h1>&#128165; Ваш лунный модуль вышел из строя.</h1>
			<details className={styles.description}>
				<br/>
				<ErrorBody
					error={error}
				/>
			</details>
		</main>
	);
};
