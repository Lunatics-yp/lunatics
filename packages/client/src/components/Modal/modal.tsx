import {FC, PropsWithChildren} from 'react';
import './modal.scss';
import {TModalProps} from './typing';

export const Modal:  FC<PropsWithChildren<TModalProps>> = (props) => {
	const {children, headerText} = props;

	return (
		<>
			<div className='modal'>
				<div className='modalHeader'>
					{ headerText ?
						<p className='modalHeaderText'>{headerText}</p> :
						<p></p>
					}
					<div className='underline'/>
				</div>
				{ Array.isArray(children) && children.length > 1 ?
					<>
						<div>{children[0]}</div>
						<div className=' underlineBottom'></div>
						<div className='modalButtons'>
							{children[1]}
						</div>
					</>
					:
					<>
						<div></div>
						<div className=' underlineBottom'></div>
						<div className='modalButtons'>
						</div>
					</>
				}
			</div>
		</>
	);
};
