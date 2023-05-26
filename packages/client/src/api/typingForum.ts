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
