// @flow
export type ItemStateType = 'closed' | 'open' | 'all';

export type ItemType = {
  id: number,
  url: string,
  comments_url: string,
  state: ItemStateType,
  title: string,
  body: string,
  number: number,
  comments: number,
  user: {
    login: string,
    avatar_url: string,
  },
  created_at: string,
  updated_at: string,
};
