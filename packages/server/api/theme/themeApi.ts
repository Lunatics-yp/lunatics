import type {TApiResponseData, TUserTheme} from 'server/api/theme/typing';
import {UserTheme} from 'server/api/models/userTheme';
import {ThemeNames} from 'server/api/theme/constants';

// Апи Тем
export const themeApi = {
	get: async (data: TUserTheme ): Promise<TApiResponseData> => {
		const {userId} = data;
		if (!userId) {
			return {reason: 'Неправильные данные'};
		}
		try {
			const userTheme = await UserTheme.findOne({where: {user_id: userId}});
			const theme = userTheme?.dataValues.theme_name;
			if(theme === null) {
				return {data: ThemeNames.light};
			} else {
				return {data: theme};
			}
		} catch (e) {
			return {reason: 'Ошибка получения темы'};
		}
	},
	change: async (data: TUserTheme): Promise<TApiResponseData> => {
		const {themeName, userId} = data;
		if (!themeName || !userId) {
			return {reason: 'Неправильные данные для метода change theme'};
		}
		try {
			await UserTheme.upsert({
				theme_name: themeName,
				user_id: userId,
			});
			return {data: themeName};
		} catch (e) {
			return {reason: 'Ошибка при изменении строки в методе change theme'};
		}
	},
};
