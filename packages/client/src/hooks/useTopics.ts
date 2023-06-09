import {useEffect} from 'react';
import {useAppDispatch, useAppSelector} from './redux';
import {forumSelectors} from 'client/src/stores/reducers/forum/forumSlice';
import {getAllTopics} from 'client/src/stores/reducers/forum/forumThunks';

export const useTopics = (forumId: number ) => {
	const dispatch = useAppDispatch();
	const topics = useAppSelector(forumSelectors.topics);

	useEffect(() => {
		dispatch(getAllTopics( {action: 'topic.list',
			data: {forum_id: forumId}}));
	}, []);

	return {topics};
};