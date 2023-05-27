import type {TApiData, TApiResponseData} from 'server/api/typing';

export type TApiFunction = (data: TApiData) => Promise<TApiResponseData>;
