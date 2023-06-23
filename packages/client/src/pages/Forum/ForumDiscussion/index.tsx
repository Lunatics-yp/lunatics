import {Outlet, useParams} from 'react-router-dom';
import {ForumDiscussionBox} from '../ForumDiscussion/ForumDiscussionBox';

export const ForumDiscussion = () => {
	const {topicId} = useParams();

	return (
		<>
			{!topicId ?
				<ForumDiscussionBox/> :
				<Outlet/>
			}
		</>
	);
};
