import {FC} from 'react';
import {TButtonProps} from './typing';
import './button.scss';

export const Button: FC<TButtonProps> = (props) => {
	const {
		text,
		logo,
		type = 'button',
		className = 'button',
		...attrs
	} = props;

	return (
		<button className={className} type={type} {...attrs}>
			<div className='button__content'>
				{logo}
				{text}
			</div>
		</button>
	);
};
