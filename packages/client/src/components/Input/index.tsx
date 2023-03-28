import './input.scss';
import {ChangeEvent, FC, useState} from 'react';
import {Fn} from 'client/src/types';

// Тип компонента инпут
type InputProps = {
	// Изначальный текст в инпуте
	text?: string,
	// Метод, вызываемый при изменении текста в инпуте
	onChange?: Fn<void, string>,
	// Метод, вызываемый при потере фокуса в инпуте
	onBlur?: Fn<void, string>,
};

// Компонент инпут
export const Input: FC<InputProps> = ({text = '', onChange = undefined, onBlur = undefined}) => {
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
		<div className="input">
			<input
				value={value}
				onChange={onChangeHandler}
				onBlur={onBlurHandler}
			/>
			<div className="underLine"></div>
		</div>
	);
};
