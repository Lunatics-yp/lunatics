import {FC} from 'react';
import './button.scss';
import {Fn} from 'client/src/types';
import {ButtonHTMLAttributes} from 'react';

// Тип конпонента кнопка
type TButtonProps = {
	// Текст кнопки
	text: string;
	// Метод, вызываемый при клике на кнопку
	onClick?: Fn<void>;
	type?: string
} & ButtonHTMLAttributes<HTMLButtonElement>;

// Компонент кнопка
export const Button: FC<TButtonProps> = (props) => {
	const {text, className = 'button'} = props;
	return (
		<button {...props} className={className}>{text}</button>
	);
};
