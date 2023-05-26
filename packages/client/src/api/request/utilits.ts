import {TErrorAPI, TReactionDTO, TUserDTO} from '../typingAPI';

export const isErrorAPI = (data: unknown): data is TErrorAPI => {
	return typeof data === 'object' && (data as TErrorAPI).reason !== undefined;
};

export function isUserData (arg: object): arg is TUserDTO {
	return typeof arg === 'object' && (arg as TUserDTO).login !== undefined;
}

export function isReactionData (arg: object): arg is TReactionDTO {
	return typeof arg === 'object' && (arg as TReactionDTO).data.reaction_id !== undefined;
}

export function getLocationOrigin(): string {
	return location && location.origin;
}
