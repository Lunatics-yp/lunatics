import {FC} from 'react';
import {TButtonProps} from './typing';
import './button.scss';

export const Button: FC<TButtonProps> = (props) => {
	const {
		text,
		type = 'button',
		className = 'button',
		...attrs
	} = props;

	return (
		<button className={className} type={type} {...attrs}>{text}</button>
	);
};
