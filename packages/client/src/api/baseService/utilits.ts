import {TErrorAPI, TUserDTO1} from '../typingAPI';

export const isErrorAPI = (data: unknown): data is TErrorAPI => {
	return typeof data === 'object' && (data as TErrorAPI).reason !== undefined;
};

export function isUserData(arg: object): arg is TUserDTO1 {
	return typeof arg === 'object' && (arg as TUserDTO1).user_id !== undefined;
}

export function getLocationOrigin(): string {
	return location && location.origin;
}
