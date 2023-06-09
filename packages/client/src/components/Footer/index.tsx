import {FC} from 'react';
import {TFooterProps} from './typing';
import './footer.scss';

// Компонент подвал
export const Footer: FC<TFooterProps> = (props) => {
	const {children, className, ...attrs} = props;
	return (
		<div
			className={`footer ${className ?? ''}`}
			{...attrs}
		>
			{children}
		</div>
	);
};
