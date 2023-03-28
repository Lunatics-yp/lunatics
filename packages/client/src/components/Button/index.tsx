import {FC} from 'react';
import './button.scss';
import {Fn} from 'client/src/types';

// Тип конпонента кнопка
type ButtonProps = {
	// Текст кнопки
	text: string;
	// Метод, вызываемый при клике на кнопку
	callback?: Fn<unknown>
};

// Компонент кнопка
export const Button: FC<ButtonProps> = ({text, callback}) => {

	const clickEvent = () => {
		if(callback){
			callback();
		}
	};

	return (
		<div className='button' onClick={clickEvent}>{text}</div>
	);
};
