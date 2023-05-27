export type TCreateForumRequest = {
  action: string;
  data: TCreateForumRequestData;
};

type TCreateForumRequestData = {
  name: string;
};

export type TCreateForumResponse = {
  data: TCreateForumResponseObj;
};

export type TCreateForumResponseObj = {
  id: number;
  name: string;
  user_id: number;
  created_at: number;
};

export type TForumListRequest = {
  action: string;
  data: object;
};

export type TForumListResponse = {
  data: TForums[];
};

export type TForums = {
  id: number;
  name: string;
  user_id: number;
  created_at: number;
};

export type TCreateTopicRequest = {
  action: string;
  data: TCreateTopicRequestData;
};

type TCreateTopicRequestData = {
  name: string;
  forum_id: number;
};

export type TCreateTopicResponse = {
  data: TCreateTopicResponseObj;
};

export type TCreateTopicResponseObj = {
  id: number;
  name: string;
  forum_id: number;
  user_id: number;
  created_at: number;
};

export type TTopicListRequest = {
  action: string;
  data: TTopicListRequestObj;
};

export type TTopicListRequestObj = {
  forum_id: number;
};

export type TTopicListResponse = {
  data: TTopics[];
};

export type TTopics = {
  id: number;
  name: string;
  forum_id: number;
  user_id: number;
  created_at: number;
};

export type TCreateMessageRequest = {
  action: string;
  data: TCreateMessageRequestData;
};

type TCreateMessageRequestData = {
  topic_id: number;
  parent_message_id: number;
  text: string;
};

export type TCreateMessageResponse = {
  data: TCreateMessageResponseObj;
};

export type TCreateMessageResponseObj = {
  id: number;
  user_id: number;
  text: string;
  topic_id: number;
  parent_message_id: number;
  created_at: number;
};

export type TMessageListRequest = {
  action: string;
  data: TMessageListRequestObj;
};

export type TMessageListRequestObj = {
  topic_id: number;
  parent_message_id: number;
};

export type TMessageListResponse = {
  data: TMessages[];
};

export type TMessages = {
  id: number;
  user_id: number;
  text: string;
  topic_id: number;
  parent_message_id: number;
  created_at: number;
  user: TMessageUser;
  reactions: TReactionsMassage[];
  user_reaction: TReactionUser;
};

export type TMessageUser = {
  id: number;
  login: string;
  display_name: string;
  avatar: string;
};

export type TReactionsMassage = {
  reaction_id: number;
  count: string;
};

export type TReactionUser = {
  message_id: number;
  user_id: number;
  reaction_id: number;
};
