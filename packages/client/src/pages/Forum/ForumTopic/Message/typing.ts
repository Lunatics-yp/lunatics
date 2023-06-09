import {TMessage} from 'client/src/stores/reducers/forum/typing';

export type TMessageProps = {
	message: TMessage;
	isReactionListActive: number | null;
	setIsReactionListActive: (isActive: number | null) => void;
};
