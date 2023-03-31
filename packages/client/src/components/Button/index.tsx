import {FC} from 'react';
import './button.scss';
import {Fn} from 'client/src/types';

// Тип конпонента кнопка
interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement>{
	// Текст кнопки
	text: string;
	// Метод, вызываемый при клике на кнопку
	onClick: Fn<void>;
}

// Компонент кнопка
export const Button: FC<ButtonProps> = ({text, onClick, ...props}) => {
	return (
		<button {...props} className='button' onClick={onClick}>{text}</button>
	);
};
