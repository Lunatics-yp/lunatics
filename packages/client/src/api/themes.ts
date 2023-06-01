import axios from 'axios';

export type ResponseData = Record<string, never>;

export type TChangeUserThemeData = {
	action: string;
	data: Record<string,any>;
};
const API_ENDPOINT = 'http://localhost:5000/api/themes';
// const API_ENDPOINT = '/themes';

export const themesApi = {
	getUserTheme: async (data: any) => {
		try {
			const response = await axios.post<ResponseData>(API_ENDPOINT, {data});
			// @ts-ignore
			return response.data.data.data;
		} catch (error) {
			console.log(error, 'Ошибка получения темы с сервера');
			return null;
		}
	},
	changeUserTheme: async (themeName: string) => {
		console.log('changeUserTheme data',  themeName );
		try {
			await axios.post<ResponseData>(API_ENDPOINT, {
				action: 'theme.change',
				data: {
					themeName: themeName,
				},
			});
			// return response.data.theme;
		} catch (error) {
			console.log(error, 'Ошибка отправки темы на сервер');
		}
	},
};
