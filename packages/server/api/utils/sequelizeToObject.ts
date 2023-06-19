export const sequelizeToObject = <T = object>(
	sequelizeResponse: any,
) => {
	return JSON.parse(JSON.stringify(sequelizeResponse)) as T;
};
