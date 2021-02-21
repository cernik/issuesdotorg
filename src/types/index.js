// @flow
export type ItemStateType = 'closed' | 'open' | 'all';

export type ItemType = {
  id: number,
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

export type FetchListParams = {
  state: ItemStateType,
  page: number,
  limit: number,
};

export type State = {
  +issues: Array<ItemType>,
  +currentIssue: ItemType,
  +bookmarks: Array<ItemType>,
  +comments: Array<ItemType>,
};

type FetchListAction = {
  type: 'FETCH_LIST',
  payload: {
    shouldRefresh: boolean,
    state: ItemStateType,
    page: number,
    limit: number,
  },
};

type FetchOneAction = {type: 'FETCH_ONE', payload: number};
type FetchCommentsAction = {type: 'FETCH_COMMENTS', payload: number};
type FetchBookmarksAction = {type: 'FETCH_BOOKMARKS'};
type StoreBookmarksAction = {type: 'STORE_BOOKMARKS', payload: Array<ItemType>};

export type Action =
  | FetchListAction
  | FetchOneAction
  | FetchCommentsAction
  | FetchBookmarksAction
  | StoreBookmarksAction;

export type Dispatch = (action: Action | ThunkAction | PromiseAction) => any;
export type GetState = () => State;
export type ThunkAction = (dispatch: Dispatch, getState: GetState) => any;
export type PromiseAction = Promise<Action>;
