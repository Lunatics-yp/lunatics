import {useEffect, useRef} from 'react';
import {useNavigate} from 'react-router-dom';
import {useAppDispatch, useAppSelector} from './redux';
import {authSelectors} from 'client/src/stores/reducers/auth/authSlice';
import {fetchUser} from 'client/src/stores/reducers/auth/authThunks';
import {oAuthAPI} from 'client/src/api/oAuth';
import {PATHS} from 'client/src/routers/name';

export const useAuth = () => {
	const dispatch = useAppDispatch();
	const {user} = useAppSelector(authSelectors.user);
	const inited = useRef(false);
	const search = new URLSearchParams(window.location.search);
	const code = search.get('code');
	const navigate = useNavigate();

	useEffect(() => {
		if (!inited.current && !user) {
			dispatch(fetchUser());
			inited.current = true;
		}

		if (code && !user) {
			oAuthAPI.oAuth({code: code})
				.then(() => {
					navigate(PATHS.mainMenu);
				})
				.catch((e) => {
					console.error(e);
				});
		}
	}, [code]);

	return user;
};
