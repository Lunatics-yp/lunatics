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
		onChange,
		errors
	} = props;
	const onBlurHandler = () => {
		if (onBlur && value) {
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
					name={name}
					onChange={onChange}
					onBlur={onBlurHandler}
					data-errors={errors}
				/>
				<div className='underLine'></div>
			</div>
			{
				name==='login' && errors && errors['login']  &&
					<p className='formError'>{errors['login']}</p>
			}
			{
				name==='email' && errors && errors['email'] &&
					<p className='formError'>{errors['email']}</p>
			}
			{
				name==='password' && errors && errors['password'] &&
					<p className='formError'>{errors['password']}</p>
			}
		</div>
	);
};
