import {FC} from 'react';
import {LabelProps} from './typing';
import './label.scss';

// Компонент label
export const Label: FC<LabelProps> = (props) => {
	const {label = ''} = props;
	return (
		<div className='label'>{label}</div>
	);
};
