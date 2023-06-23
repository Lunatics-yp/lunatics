import {ButtonHTMLAttributes, ReactElement} from 'react';

export type TButtonProps = {
	// Текст кнопки
	text: string;
	logo?: ReactElement;
} & ButtonHTMLAttributes<HTMLButtonElement>;
