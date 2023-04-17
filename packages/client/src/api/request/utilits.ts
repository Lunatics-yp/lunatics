import {TErrorAPI, TUserDTO} from '../typingAPI';

export const isErrorAPI = (data: unknown): data is TErrorAPI => {
	return typeof data === 'object' && (data as TErrorAPI).reason !== undefined;
};

export function isUserData (arg: object): arg is TUserDTO {
	return typeof arg === 'object' && (arg as TUserDTO).login !== undefined;
}
