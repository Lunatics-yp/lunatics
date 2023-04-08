import {ButtonHTMLAttributes} from 'react';

export type TButtonProps = {
	// Текст кнопки
	text: string;
} & ButtonHTMLAttributes<HTMLButtonElement>;
