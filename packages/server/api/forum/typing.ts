import type {TApiData, TApiResponseData} from '../typing';

export type TApiFunction = (data: TApiData) => Promise<TApiResponseData>;
