import React, {FC} from 'react';
import './styles.scss';

type TProps = {
   children: React.ReactNode[];
};
export const Modal: FC<TProps> = (props) => {
	return (
		<>
			<div className='modal'>
				<div className='modalHeader'>
					{props.children[0]}
					<div className='underline'/>
				</div>
				{props.children[1]}
				<div className=' underlineBottom'/>
				<div className='buttonsModal'>
					{props.children[2]}
				</div>
			</div>
		</>
	);
};
