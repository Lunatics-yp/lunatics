import {TMessages} from 'client/src/api/typingForum';

export type TMessageProps = {
	message: TMessages;
	messages: TMessages[];
	isReactionListActive?: number | null;
	setSelectedParent: (id: number | null) => void;
	setIsReactionListActive: (isActive: number | null) => void;
};
