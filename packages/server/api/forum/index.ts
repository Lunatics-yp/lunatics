import type {Request, Response} from 'express';
import {dbConnect} from 'server/api/sequelize';
import {Users} from 'server/api/models';
import {isValidPostData} from 'server/api/postDataValidator';

// Апи Форума
export const forumApi = async (req: Request, res: Response): Promise<void> => {
	const postData = req.body;
	const isValid = isValidPostData(postData);
	// const isValid = true;
	if (isValid) {
		await dbConnect();
		// тело апи будет тут, ниже пример с поиском юзеров
		const users = await Users.findAll();
		res.json(users);
	}else{
		res.status(400).json({error: 'Неправильный запрос'});
	}
};
