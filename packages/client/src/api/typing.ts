import {TErrorAPI, TUserDTO} from './typingAPI';
export type TNullObject = Record<string, never>;

/* Login */

export type TLoginRequestData = {
	login: string;
	password: string;
};

export type TLoginResponseData = TNullObject | TErrorAPI;

/* Register */

export type TRegisterRequestData = {
	first_name: string;
	second_name: string;
	login: string;
	email: string;
	password: string;
	phone: string;
};

export type TRegisterResponseData = {id: number} | TErrorAPI;

/* User */

export type TUserResponseData = TUserDTO | TErrorAPI;

export type TChangePasswordRequestData = {
	oldPassword: string;
	newPassword: string;
};

export type TChangeUserRequestData = {
	login: string;
	email: string;
	first_name: string;
	second_name: string;
	phone: string;
	display_name: string;
};

export type TLeaderboard = {
	ratingFieldName: string;
	cursor: number;
	limit: number;
};

export type TLeaderboardData = {
	id?: number;
	name: string;
};

export type TAddLeaderboard = {
	ratingFieldName: string;
	data: TLeaderboardData;
	teamName: string;
};

export type TLeaderboardResponse = {
	data: TLeaderboardData;
};

export type TOAuthYandexResponseData = undefined | TErrorAPI;

export type TOAuthYandexRequestData = {
	code: string;
};

export type TServiceIdResponseData = TServiceId | TErrorAPI;

export type TServiceIdRequestData = TRedirectUri;

export type TRedirectUri = string;

export type TServiceId = {
	service_id: string;
};

/* Forum */
//Схема тела запроса

// export type ForumForm = {
// 	action: string;
// 	sid: string;
// 	user_id: string;
// 	//data: {... };
// };

// export type NewForum = {
// 	action: string;
// 	data: {
// 		name: string;
// 	};
// };

// export type DellForum = {
// 	action: string;
// 	data: {
// 		id: number;
// 	};
// };

// export type AllForums = {
// 	action: string;
// 	// data: {

// 	// };
// };
// // ответ
// // export type AllForum = {
// // 	id: number;
// // 	name: string;
// // 	user_id: number;
// // 	created_at: number;
// // }

// export type NewTopic = {
// 	action: string;
// 	data: {
// 		id: number;
// 		name: string;
// 	};
// };

// export type DellTopic = {
// 	action: string;
// 	data: {
// 		id: number;
// 	};
// };

// // ответ
// // export type DellTopic = {
// // 	id: number;
// // 	forum_id: number;
// // 	name: string;
// // }
// export type getAllTopicsRequest = {

// }

// export type AllTopics = {
// 	action: string;
// 	data: {
// 		forum_id: number;
// 	};
// };

// // ответ
// // export type AllTopics = {
// // 	id: number;
// // forum_id: number;
// // 	name: string;
// // 	user_id: number;
// // 	created_at: number;
// // }

// export type NewMessage = {
// 	action: string;
// 	data: {
// 		topic_id: number;
// 		parent_message_id: number;
// 		text: string;
// 	};
// };

// export type DellMessage = {
// 	action: string;
// 	data: {
// 		id: number;
// 	};
// };

// export type AllMessages = {
// 	action: string;
// 	data: {
// 		forum_id: number;
// 	};
// };

// // ответ
// // export type AllMessages = {
// // // 	id: number;
// // // forum_id: number;
// // // 	name: string;
// // // 	user_id: number;
// // // 	created_at: number;
// // }

// export type getAllTopicsRequest = {
// 	action
// }
