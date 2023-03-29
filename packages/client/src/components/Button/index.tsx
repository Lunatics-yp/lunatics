import {FC} from 'react';
import './button.scss';
import {Fn} from 'client/src/types';

// Тип конпонента кнопка
type ButtonProps = {
	// Текст кнопки
	text: string;
	// Метод, вызываемый при клике на кнопку
	onClick: Fn<void>;
};

// Компонент кнопка
export const Button: FC<ButtonProps> = ({text, onClick}) => {
	return (
		<div className='button' onClick={onClick}>{text}</div>
	);
};
