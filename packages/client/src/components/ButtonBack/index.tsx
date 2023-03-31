import {FC} from 'react';
import './ButtonBack.scss';
import {Fn} from 'client/src/types';
import {Link} from 'react-router-dom';

// Тип конпонента кнопка
type ButtonBackProps = {
	// Текст кнопки
	text: string;
	//путь для перехода
	href: string;
};

// Компонент кнопка назад
export const ButtonBack: FC<ButtonBackProps> = ({text = '', href = ''}) => {
	return (
		<div className="buttonBack">
			<Link to={href}>
				<button className="btn" type="button">
					{text}
				</button>
			</Link>
		</div>
	);
};
