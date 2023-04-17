import {useEffect, useRef} from 'react';
import {useAppDispatch, useAppSelector} from './redux';
import {authSelectors} from 'client/src/stores/reducers/auth/authSlice';
import {fetchUser} from 'client/src/stores/reducers/auth/authThunks';

export const useAuth = () => {
	const dispatch = useAppDispatch();
	const {user} = useAppSelector(authSelectors.user);
	const inited = useRef(false);

	useEffect(() => {
		if (!inited.current && !user) {
			dispatch(fetchUser());
			inited.current = true;
		}
	}, []);

	return user;
};
