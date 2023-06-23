import {useEffect} from 'react';
import {useAppDispatch, useAppSelector} from './redux';
import {forumSelectors} from 'client/src/stores/reducers/forum/forumSlice';
import {getAllForums} from 'client/src/stores/reducers/forum/forumThunks';

export const useForums = () => {
	const dispatch = useAppDispatch();
	const forums = useAppSelector(forumSelectors.forums);

	useEffect(() => {
		dispatch(getAllForums({
			action: 'forum.list',
			data: {},
		}));
	}, []);

	return {forums};
};
