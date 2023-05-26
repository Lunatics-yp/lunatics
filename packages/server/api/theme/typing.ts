export type TUserTheme = {
	userId: number;
	themeName: string;
};
export type T = string | {reason: string};
export type TApiResponseData = Promise<T>;

export type TApiFunction = (data: TUserTheme) => Promise<TApiResponseData>;
