import type {Request} from 'express';

const cookiesList = [
	'authCookie',
	'uuid',
];

// Фильтр куки, оставляет только те, что нужны для Яндекс Свагер Апи
export const filterCookies = (req: Request): string => {
	const cookies = req.headers.cookie?.split(';');
	const filteredCookies = cookies?.filter(cookie =>
		cookiesList.some(
			cookieName => cookie.trim().startsWith(`${cookieName}=`),
		),
	);
	if (filteredCookies && filteredCookies.length) {
		return filteredCookies.join('; ');
	}
	return '';
};
