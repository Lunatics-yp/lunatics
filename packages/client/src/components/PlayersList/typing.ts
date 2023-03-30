export type playerListDataType = {
	nickname: string;
	winsOnline: number;
	winsOffline: number;
}[];

export type playerListProps = {
	data: playerListDataType;
	showIndex?: boolean;
};
