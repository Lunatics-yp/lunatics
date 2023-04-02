export type TPlayerData = {
	nickname: string;
	winsOnline: number;
	winsOffline: number;
}[];

export type TPlayersListProps = {
	data: TPlayerData;
	showIndex?: boolean;
};
