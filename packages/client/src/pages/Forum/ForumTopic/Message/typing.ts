export type TMessageProps = {
	message: {
		id: number;
		isOwner: boolean;
		text: string;
	};
	isReactionListActive: number | null;
	setIsReactionListActive: (isActive: number | null) => void;
};
