export type TErrorAPI = {
  reason: string;
};

export type TUserDTO = {
  id: number;
  login: string;
  first_name: string;
  second_name: string;
  display_name: string | null;
  avatar: string | null;
  phone: string;
  email: string;
};

// export type TForumDTO = {
// 	id: number;
// 	name: string;
// 	user_id: number;
// 	created_at: number;
// };

// export type TTopicDTO = {
// 	id: number;
// 	name: string;
// 	forum_id: number;
// 	user_id: number;
// 	created_at: number;
// };

// export type TMessageDTO = {
// 	id: number;
// 	user_id: number;
// 	text: string;
// 	topic_id: number;
// 	parent_message_id: number;
// 	created_at: number;
//   };
