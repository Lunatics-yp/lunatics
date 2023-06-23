import type {TApiData, TApiResponseData} from '../typing';

export type TApiFunction = (data: TApiData) => Promise<TApiResponseData>;

export type TTopicsRespond = {
	LastMessage: object;
	Messages?: object[];
}[];

export type TMessagesRespond = {
	MessagesReactions?: {
		reaction_id: number;
	}[];
	Reactions: Record<number, number>;
	CurrentUserReaction?: object[];
	UserReaction: object;
}[];
