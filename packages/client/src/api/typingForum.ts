export type createForumRequest = {
  action: string;
  data: createForumRequestData;
};

type createForumRequestData = {
  name: string;
};

export type CreateForumResponse = {
  data: CreateForumResponseObj;
};

export type CreateForumResponseObj = {
  id: number;
  name: string;
  user_id: number;
  created_at: number;
};

export type ForumListRequest = {
  action: string;
  data: object;
};

export type ForumListResponse = {
  data: Forums[];
};

export type Forums = {
  id: number;
  name: string;
  user_id: number;
  created_at: number;
};

export type createTopicRequest = {
  action: string;
  data: createTopicRequestData;
};

type createTopicRequestData = {
  name: string;
  forum_id: number;
};

export type CreateTopicResponse = {
  data: CreateTopicResponseObj;
};

export type CreateTopicResponseObj = {
  id: number;
  name: string;
  forum_id: number;
  user_id: number;
  created_at: number;
};

export type TopicListRequest = {
  action: string;
  data: TopicListRequestObj;
};

export type TopicListRequestObj = {
  forum_id: number;
};

export type TopicListResponse = {
  data: Topics[];
};

export type Topics = {
  id: number;
  name: string;
  forum_id: number;
  user_id: number;
  created_at: number;
};

export type createMessageRequest = {
  action: string;
  data: createMessageRequestData;
};

type createMessageRequestData = {
  topic_id: number;
  parent_message_id: number;
  text: string;
};

export type CreateMessageResponse = {
  data: CreateMessageResponseObj;
};

export type CreateMessageResponseObj = {
  id: number;
  user_id: number;
  text: string;
  topic_id: number;
  parent_message_id: number;
  created_at: number;
};

export type MessageListRequest = {
  action: string;
  data: MessageListRequestObj;
};

export type MessageListRequestObj = {
  topic_id: number;
  parent_message_id: number;
};

export type MessageListResponse = {
  data: Messages[];
};

export type Messages = {
  id: number;
  user_id: number;
  text: string;
  topic_id: number;
  parent_message_id: number;
  created_at: number;
  user: MessageUser;
  reactions: ReactionsMassage[];
  user_reaction: ReactionUser;
};

export type MessageUser = {
  id: number;
  login: string;
  display_name: string;
  avatar: string;
};

export type ReactionsMassage = {
  reaction_id: number;
  count: string;
};

export type ReactionUser = {
  message_id: number;
  user_id: number;
  reaction_id: number;
};
