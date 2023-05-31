export type TAuthState = {
	user: TUser | null;
	isLoading: boolean;
	error: string;
	theme?: string | null;
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
export type TTheme = {
	action: string,
	data: {
		userId: number,
		themeName: string
	}
};
