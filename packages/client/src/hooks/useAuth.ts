import {useEffect, useRef} from 'react';
import {useNavigate, useSearchParams} from 'react-router-dom';
import {useAppDispatch, useAppSelector} from './redux';
import {authSelectors} from 'client/src/stores/reducers/auth/authSlice';
import {fetchUser} from 'client/src/stores/reducers/auth/authThunks';
import {oAuthAPI} from 'client/src/api/oAuth';
import {PATHS} from 'client/src/routers/name';

export const useAuth = () => {
	const dispatch = useAppDispatch();
	const {user} = useAppSelector(authSelectors.user);
	const inited = useRef(false);
	const navigate = useNavigate();
	const [search] = useSearchParams();
	const code = search.get('code');

	useEffect(() => {
		if (!inited.current && !user && !code) {
			dispatch(fetchUser());
			inited.current = true;
		}

		if (code && !user && !inited.current) {
			inited.current = true;
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
