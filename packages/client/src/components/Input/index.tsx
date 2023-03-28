import './input.scss';
import {ChangeEvent, FC, useState} from "react";
import {Fn} from "client/src/types";

// Тип компонента инпут
type InputProps = {
	// Изначальный текст в инпуте
	text?: string,
	// Метод, вызываемый при изменении текста в инпуте
	changeCallback?: Fn<void, string>,
	// Метод, вызываемый при потере фокуса в инпуте
	blurCallback?: Fn<void, string>,
};

// Компонент инпут
export const Input: FC<InputProps> = (props) => {
	const {
		text = '',
		changeCallback = undefined,
		blurCallback = undefined
	} = props;
	const [value, setValue] = useState(text);

	const changeHandler = (e: ChangeEvent<HTMLInputElement>) => {
		const value = e.target.value;
		setValue(value);
		if (changeCallback) {
			changeCallback(value);
		}
	};

	const blurHandler = () => {
		if(blurCallback){
			blurCallback(value);
		}
	};

	return (
		<div className="input">
			<input
				value={value}
				onChange={changeHandler}
				onBlur={blurHandler}
			/>
			<div className="underLine"></div>
		</div>
	);
};
