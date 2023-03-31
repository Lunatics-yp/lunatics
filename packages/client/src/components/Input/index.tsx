import './input.scss';
import {ChangeEvent, FC, useState} from 'react';
import {Label} from 'client/src/components/Label';
import {InputProps} from 'src/components/Input/typing';

// Компонент инпут
export const Input: FC<InputProps> = (props) => {
	const {
		label = '',
		text = '',
		type = 'text',
		onChange = undefined,
		onBlur = undefined
	} = props;

	const [value, setValue] = useState(text);

	const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
		const value = e.target.value;
		setValue(value);
		if (onChange) {
			onChange(value);
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
				/>
				<div className='underLine'></div>
			</div>
		</div>
	);
};
