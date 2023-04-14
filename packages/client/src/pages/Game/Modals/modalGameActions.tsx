import {FC} from 'react';
import 'client/src/pages/Game/style.css';

interface Props {
	text: string;
}
export const ModalGameActions: FC<Props> = (props) => {
	const text = props.text;

	return (
		<div className='modalGameActions'>
			{text}
		</div>
	);
};
