import './input.scss';
import {ChangeEvent, FC, useState} from 'react';
import {Label} from 'client/src/components/Label';
import {InputProps} from 'client/src/components/Input/typing';

// Компонент инпут
export const Input: FC<InputProps> = (props) => {
	const {
		label = '',
		text = '',
		type = 'text',
		name = '',
		onChange = undefined,
		onBlur = undefined
	} = props;

	const [value, setValue] = useState(text);

	const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
		const value = e.target.value;
		setValue(value);
		if (onChange) {
			onChange(value, name);
		}
	};

	const onBlurHandler = () => {
		if (onBlur) {
			onBlur(value);
		}
	};

	return (
		<div className='formGroup'>
			<Label label={label} />
			<div className='input'>
				<input
					value={value}
					type={type}
					onChange={onChangeHandler}
					onBlur={onBlurHandler}
					name={name}
				/>
				<div className='underLine'></div>
			</div>
		</div>
	);
};
