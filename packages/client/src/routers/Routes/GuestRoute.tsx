import {FC, PropsWithChildren} from 'react';
import {Navigate, Outlet} from 'react-router-dom';
import {useAuth} from 'client/src/hooks/useAuth';
import {PATHS} from 'client/src/routers/name';

/**
 * Route только для неавторизованных пользователей (гостей)
 * @param props
 */
export const GuestRoute: FC<PropsWithChildren> = (props) => {
	const {children} = props;
	const user = useAuth();
	if (user) {
		return <Navigate to={PATHS.profile} replace/>;
	}
	return children ? <>{children}</> : <Outlet/>;
};
