export type TMessageProps = {
	message: TMessage;
	messages: TMessage[];
	setSelectedParent?: (id: number | null) => void;

};

export type TMessage = {
	id: number;
	isOwner: boolean;
	text: string;
	subtext?: string;
	parentid?: number;

};
