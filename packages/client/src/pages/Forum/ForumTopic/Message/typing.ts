export type TMessageProps = {
	message: TMessage;
	messages: TMessage[];
	setSelectedParent?: any;

};

export type TMessage = {
	id: number;
	isOwner?: boolean;
	text: string;
	subtext: string;
	parent_message_id?: number;
	name: string;
};
