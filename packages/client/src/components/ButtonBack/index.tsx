import {FC} from 'react';
import './ButtonBack.scss';
import {Link} from 'react-router-dom';
import {TButtonBackProps} from './typing';

// Компонент кнопка назад
export const ButtonBack: FC<TButtonBackProps> = ({text = '', href = ''}) => {
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
