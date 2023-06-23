import {FC} from 'react';
import {TAlertProps} from './typing';
import './alert.scss';

export const Alert: FC<TAlertProps> = (props) => {
	const {
		text = '',
		type = 'error',
	} = props;
	return (
		<div className={`alert alert_${type}`}>{text}</div>
	);
};
