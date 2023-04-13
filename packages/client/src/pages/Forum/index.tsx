import {Outlet} from 'react-router-dom';
import {Header} from 'client/src/components/Header';
import {Home} from 'client/src/components/images/Home';

export const Forum = () => {
	return (
		<>
			<Header>
				<Home/>
				<div>Forum</div>
			</Header>
			<Outlet/>
		</>
	);
};
