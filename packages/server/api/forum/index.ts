import type {Request, Response} from 'express';
import type {TUserData} from 'server/authMiddleware/typing';
import {dbConnect} from 'server/api/sequelize';
import {isValidPostData} from 'server/api/utils/postDataValidator';

// Апи Форума
export const forumApiHandler = async (
	req: Request,
	res: Response,
	userData: TUserData,
): Promise<void> => {
	const postData = req.body;
	const isValid = isValidPostData(postData);
	// const isValid = true;
	if (isValid) {
		// тут код апи
		await dbConnect();
		res.json([]);
	}else{
		res.status(400).json({error: 'Неправильный запрос'});
	}
};
