import {FC} from 'react';
import './button.scss';
import {Fn} from 'client/src/types';

// Тип конпонента кнопка
type ButtonProps = {
	// Текст кнопки
	text: string;
	// Метод, вызываемый при клике на кнопку
	clickCallback: Fn<void>
};

// Компонент кнопка
export const Button: FC<ButtonProps> = ({text, clickCallback}) => {

	return (
		<div className='button' onClick={clickCallback}>{text}</div>
	);
};
