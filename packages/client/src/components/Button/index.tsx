import {FC} from 'react';
import './button.scss';
import {Fn} from 'client/src/types';
import {ButtonHTMLAttributes} from 'react';

// Тип конпонента кнопка
type TButtonProps = {
	// Текст кнопки
	text: string;
	// Метод, вызываемый при клике на кнопку
	onClick: Fn<void>;
} & ButtonHTMLAttributes<HTMLButtonElement>;

// Компонент кнопка
export const Button: FC<TButtonProps> = ({text, className = 'button', onClick, ...props}) => {
	return (
		<button {...props} className={className} onClick={onClick}>{text}</button>
	);
};
