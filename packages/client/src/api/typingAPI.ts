import {Theme} from 'client/src/stores/reducers/userSettings/typing';

export type TErrorAPI = {
  reason: string;
};

export type TUserDTO = {
  id: number;
  login: string;
  first_name: string;
  second_name: string;
  display_name: string | null;
  avatar: string | null;
  phone: string;
  email: string;
  theme: {
	data: `${Theme}` | null;
  };
};

export type TThemeDTO = {
	data: {
		data: string;
	};
};

export type TReactionDTO = {
	data: {
		id: number;
		message_id: number;
		user_id: number;
		reaction_id: number;
	};
};
