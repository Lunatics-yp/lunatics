import {Fn} from 'src/types';

export type InputType = 'text' | 'password' | 'email' | 'tel' | 'file';

export type InputProps = {
	// Заголовок
	label?: string;
	// Изначальный текст в инпуте
	text?: string;
	// Input type
	type?: InputType;
	// Input placeholder
	placeholder?: string;
	// Метод, вызываемый при изменении текста в инпуте
	onChange?: Fn<void, string>;
	// Метод, вызываемый при потере фокуса в инпуте
	onBlur?: Fn<void, string>;
};
