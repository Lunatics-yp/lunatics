import {TMessageUser} from 'client/src/api/typingForum';

export type TSubmessageProps = {
	message: {
		id: number;
		isOwner?: boolean;
		text: string;
		subtext?: string;
		parent_message_id?: number | null;
		created_at: number;
		User: TMessageUser;
	};
};
