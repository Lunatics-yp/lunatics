import {Users} from 'server/api/models';
import type {TUser} from 'server/api/models';
import {dbConnect} from 'server/api/sequelize';

export const userAPI = {
	createOrUpadate: async (data: TUser) => {
		const {
			id,
			login,
			avatar,
		} = data;
		await dbConnect();
		await Users.upsert({
			id: id,
			login: login,
			display_name: login,
			avatar: avatar,
		});
	},
};
