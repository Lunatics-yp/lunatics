import {TUserDTO} from 'client/src/api/typingAPI';

export type TAuthState = {
	user: TUserDTO | null;
	isLoading: boolean;
	error: string;
  };
