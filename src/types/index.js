// @flow

export type ItemStateType = 'closed' | 'open' | 'all';

export type ItemType = {
  id: number | string,
  state: ItemStateType,
  title: string,
  body: string,
  number: string,
  comments: number,
  user: {
    login: string,
    avatar_url: string,
  },
  created_at: string,
  updated_at: string,
};
