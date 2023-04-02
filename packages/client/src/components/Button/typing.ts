import {ButtonHTMLAttributes} from 'react';
import {Fn} from 'client/src/types';

export type TButtonProps = {
	// Текст кнопки
	text: string;
	// Метод, вызываемый при клике на кнопку
	onClick?: Fn<void>;
} & ButtonHTMLAttributes<HTMLButtonElement>;
