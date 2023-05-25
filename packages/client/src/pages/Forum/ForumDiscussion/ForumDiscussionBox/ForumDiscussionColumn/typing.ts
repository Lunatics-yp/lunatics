export type TForumDiscussionColumnProps = {
	id(id: any): void;
	updateDiscussions(newDiscussions: any): unknown;
	discussions: any;
	title: string;
	lastAuthorName?: string;
	date?: string;
};
