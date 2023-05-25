export type createForumRequest = {
  action: string;
  data: {
    name: string;
  };
};

export type CreateForumResponse = {
  data: {
    id: number;
    name: string;
    user_id: number;
    created_at: number;
  };
};

export type createForumAnswer = {
  data: createForumAnswerObj;
};

export type createForumAnswerObj = {
  id: number;
  name: string;
  user_id: number;
  created_at: number;
};
// export type TLeaderboardData = {
//   id?: number;
//   name: string;
// };

// export type TAddLeaderboard = {
//   ratingFieldName: string;
//   data: TLeaderboardData;
//   teamName: string;
// };

// export type TLeaderboardResponse = {
//   data: TLeaderboardData;
// };

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
