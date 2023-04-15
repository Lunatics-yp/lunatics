import {FC} from 'react';
import './modals.scss';

type TProps = {
	text: string;
};
export const ModalGameActions: FC<TProps> = (props) => {
	const {text} = props;

	return (
		<div className='modalGameActions'>
			{text}
		</div>
	);
};
