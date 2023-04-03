import {Outlet} from 'react-router-dom';
import {Header} from 'client/src/components/Header';

export const Forum = () => {
	return (
		<>
			<Header children={'Forum'}/>
			<Outlet/>
		</>
	);
};
