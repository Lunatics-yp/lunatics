import {THEMES_ACTION, TThemeResponseData} from 'client/src/api/typing';
import {localApi} from 'client/src/api/request/localApi';

export const themesApi = {
	changeUserTheme: async (themeName: string) => {
		try {
			await localApi.post<TThemeResponseData>('/themes', {
				action: THEMES_ACTION.CHANGE,
				data: {
					themeName: themeName,
				},
			});
		} catch (error) {
			console.error(error, 'Ошибка отправки темы на сервер');
		}
	},
};
