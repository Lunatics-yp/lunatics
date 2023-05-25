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
  data: Forum[];
};

export type Forum = {
  id: number;
  name: string;
  user_id: number;
  created_at: number;
};
