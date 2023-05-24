import {Users} from 'server/api/models';
import type {TUser} from 'server/api/auth/typing';
import {dbConnect} from 'server/api/sequelize';

export const userAPI = {
	upsert: async (data: TUser) => {
		const {
			id,
			login,
			avatar,
		} = data;
		await dbConnect();
		await Users.upsert({
			id: id,
			login: login,
			nickname: login,
			avatar: avatar,
		});
	},
};
