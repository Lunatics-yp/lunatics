import {FC, ReactNode} from 'react';
import {Navigate, Outlet} from 'react-router-dom';
import {useAuth} from 'client/src/hooks/useAuth';
import {PATHS} from 'client/src/routers/name';

type TProtectedRouteProps = {
	children: ReactNode;
};

/**
 * Route только для авторизованных пользователей
 * @param props
 */
export const AuthRoute: FC<TProtectedRouteProps> = (props) => {
	const {children} = props;
	const user = useAuth();
	if (!user) {
		return <Navigate to={PATHS.auth} replace/>;
	}
	return children ? <>{children}</> : <Outlet/>;
};
