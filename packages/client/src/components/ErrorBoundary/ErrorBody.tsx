import {FC} from 'react';
import {TErrorBodyProps} from './typing';
import styles from './errorBody.module.scss';

export const ErrorBody: FC<TErrorBodyProps> = (props) => {
	const {error} = props;
	let title, description = null;

	if (error instanceof Error) {
		const {name, message, stack} = error;
		title = name + ': ' + message;
		description = stack;
	}

	return (
		<div className={styles.error}>
			<h2 className={styles.error__title}>
				{title ?? 'Упп-с!'}
			</h2>
			<h3 className={styles.error__description}>
				{description ?? 'Что-то пошло не так...'}
			</h3>
		</div>
	);
};
