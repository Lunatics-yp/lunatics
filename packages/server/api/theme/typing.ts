import type {TApiData} from 'server/api/typing';

export type TUserTheme = {
	userId: number;
	themeName?: string;
};

export type TApiFunction = (data: TApiData) => Promise<TApiResponseData>;

export type TApiResponseData = {
	reason?: string;
	data?: string;
};
