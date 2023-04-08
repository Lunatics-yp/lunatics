import {Outlet} from 'react-router-dom';
import {Header} from 'client/src/components/Header';

export const Forum = () => {
	return (
		<>
			<Header>Forum</Header>
			<Outlet/>
		</>
	);
};
