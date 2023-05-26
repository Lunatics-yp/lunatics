import type {TApiResponseData, TUserTheme} from 'server/api/theme/typing';
import {UserTheme} from 'server/api/models/userTheme';

export const enum ThemeNames  {
	light = 'light',
	dark = 'dark',
}
// Апи Тем
export const themeApi = {
	get: async (data: number ): TApiResponseData => {
		if (!data) {
			return {reason: 'Неправильные данные'};
		}
		try {
			const userTheme = await UserTheme.findOne({where: {user_id: data}});
			const theme = userTheme?.dataValues.theme_name;
			if(theme === null) return ThemeNames.light;
			else return theme;
		} catch (e) {
			return {reason: 'Ошибка получения темы'};
		}
	},
	change: async (data: TUserTheme): TApiResponseData => {
		const {themeName, userId} = data;
		if (!themeName || !userId) {
			return {reason: 'Неправильные данные для метода change theme'};
		}
		try {
			await UserTheme.upsert({
				theme_name: themeName,
				user_id: userId,
			});
			const changedTheme = await UserTheme.findOne({where: {user_id: userId}});
			return changedTheme?.dataValues.theme_name;
		} catch (e) {
			return {reason: 'Ошибка при изменении строки в методе change theme'};
		}
	},
};
