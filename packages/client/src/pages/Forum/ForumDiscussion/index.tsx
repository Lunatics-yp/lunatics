import {Outlet, useParams} from 'react-router-dom';
import {ForumDiscussionBox} from '../ForumDiscussion/ForumDiscussionBox';

export const ForumDiscussion = () => {
	const {topicTitle} = useParams();

	return (
		<>
			{!topicTitle ?
				<ForumDiscussionBox/> :
				<Outlet/>
			}
		</>
	);
};
