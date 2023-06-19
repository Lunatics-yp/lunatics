import type {TApi} from './typing';
import type {Request, Response} from 'express';

export const apiMiddleware = (apiHandler: TApi) => {
	return async (req: Request, res: Response) => {
		if (req.method !== 'POST') {
			res.sendStatus(500);
		}
		try {
			await apiHandler(req, res);
		} catch (e) {
			console.error(e);
			if (!res.headersSent) {
				res.sendStatus(500);
			}
		}
	};
};
