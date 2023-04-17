export type TAuthState = {
	user: TUser | null;
	isLoading: boolean;
	error: string;
  };

export type TUser = {
	id: number;
	login: string;
	firstName: string;
	secondName: string;
	displayName: string;
	avatar: string | null;
	phone: string;
	email: string;
};
