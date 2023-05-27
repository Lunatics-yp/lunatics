export type TSubmessageProps = {
	message: {
		id: number;
		isOwner: boolean;
		text: string;
		subtext?: string;
	};
};
