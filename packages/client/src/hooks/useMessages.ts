import {useEffect} from 'react';
import {useAppDispatch, useAppSelector} from './redux';
import {forumSelectors} from 'client/src/stores/reducers/forum/forumSlice';
import {getAllMessages} from 'client/src/stores/reducers/forum/forumThunks';

export const useMessages = (topicId: number) => {
	const dispatch = useAppDispatch();
	const messages = useAppSelector(forumSelectors.messages);

	useEffect(() => {
		dispatch(getAllMessages( {
			action: 'message.list',
			data: {
				topic_id: topicId,
				parent_message_id: null,
			},
		}));
	}, []);

	return {messages};
};