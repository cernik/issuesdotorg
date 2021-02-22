// @flow
export const noop: () => void = () => {};

export const HOST: string = 'https://api.github.com';
export const REPO: string = 'gitpoint/git-point';
export const DEFAULT_REPO: string = 'vmg/redcarpet';
export const URL: string = `${HOST}/repos/${REPO}`;

export const ROUTES = {
  ENTANCE: 'Entance',
  HOME: 'Home',
  DETAILS: 'Details',
  BOOKMARKS: 'Bookmarks',
};

export const SORT_TYPE = {
  CREATED_AT: 'Sort by created at',
  UPDATED_AT: 'Sort by updated at',
  COMMENTS: 'Sort by comments count',
};
