import {FC} from 'react';
import {Label} from 'client/src/components/Label';
import {InputProps} from 'client/src/components/Input/typing';
import './input.scss';

// Компонент инпут
export const Input: FC<InputProps> = (props) => {
	const {
		label = '',
		type = 'text',
		onBlur,
		value,
		name,
		onChange
	} = props;
	const onBlurHandler = () => {
		if (onBlur) {
			if (typeof value === 'string') {
				onBlur(value);
			}
		}
	};
	return (
		<div className='formGroup'>
			<Label label={label} />
			<div className='input'>
				<input
					value={value}
					type={type}
					name={name}
					onChange={onChange}
					onBlur={onBlurHandler}
				/>
				<div className='underLine'></div>
			</div>
		</div>
	);
};
