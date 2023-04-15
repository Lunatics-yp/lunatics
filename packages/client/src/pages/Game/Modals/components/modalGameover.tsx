import {FC} from 'react';
import {Avatar} from 'client/src/components/Avatar';

type TProps = {
	winner: string;
	result: string;
};
export const ModalGameover: FC<TProps> = (props) => {
	const {winner , result} = props;
	return (
		<div>
			<div className='playerName'>
				<Avatar size='small'/>
				<div >{winner}</div>
			</div>
			<div className='modalGameOverResult'>{result}</div>
		</div>
	);
};
