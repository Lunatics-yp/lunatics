import {FC} from 'react';
import './modal.scss';
import {TModalProps} from './typing';

export const Modal: FC<TModalProps> = (props) => {
	return (
		<>
			<div className='modal'>
				<div className='modalHeader'>
					{props.children[0]}
					<div className='underline'/>
				</div>
				{props.children[1]}
				<div className=' underlineBottom'/>
				<div className='modalButtons'>
					{props.children[2]}
				</div>
			</div>
		</>
	);
};
