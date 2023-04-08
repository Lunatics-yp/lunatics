import {Fn} from 'client/src/types';
import {ChangeEventHandler} from 'react';

export type InputType = 'text' | 'password' | 'email' | 'tel' | 'file';

export type InputProps = {
	// Заголовок
	label?: string;
	// значение инпута
	value?: string;
	// Input type
	type?: InputType;
	// имя инпута
	name?: string;
	// Input placeholder
	placeholder?: string;
	//массив ошибок инпутов
	errors?: Record<string, string>;
	// Метод, вызываемый при изменении текста в инпуте
	onChange?: ChangeEventHandler<HTMLInputElement> | undefined;
	// Метод, вызываемый при потере фокуса в инпуте
	onBlur?: Fn<void, string>;
};
