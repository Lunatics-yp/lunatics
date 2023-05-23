export type TMessageProps = {
	message: {
		id: number;
		isOwner: boolean;
		text: string;
		subtext?: string;
	};
};
