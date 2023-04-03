import {Fn} from 'client/src/types';
import {ChangeEventHandler} from 'react';

export type InputType = 'text' | 'password' | 'email' | 'tel' | 'file';

export type InputProps = {
	// Заголовок
	label?: string;
	// Изначальный текст в инпуте
	value?:  string | number | readonly string[] | undefined;
	// Input type
	type?: InputType;
	// имя инпута
	name?: string;
	// Input placeholder
	placeholder?: string;
	// Метод, вызываемый при изменении текста в инпуте
	handleChange?: ChangeEventHandler<HTMLInputElement> | undefined;
	// Метод, вызываемый при потере фокуса в инпуте
	onBlur?: Fn<void, string>;
};
