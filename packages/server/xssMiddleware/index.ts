import xss from 'xss';
import type {Request, Response, NextFunction} from 'express';

export const xssMiddleware = (req: Request, res: Response, next: NextFunction) => {
	const sanitizeObject = (obj: Record<string, unknown>) => {
		for (const key in obj) {
			if (typeof obj[key] === 'object') {
				sanitizeObject(obj[key] as Record<string, unknown>);
			} else {
				obj[key] = xss(obj[key] as string);
			}
		}
	};
	if (req.body) {
		sanitizeObject(req.body);
	}
	if (req.query) {
		sanitizeObject(req.query);
	}
	if (req.params) {
		sanitizeObject(req.params);
	}
	next();
};
