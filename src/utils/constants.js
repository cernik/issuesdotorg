// @flow
export const noop: () => void = () => {};

export const HOST: string = 'https://api.github.com';
export const URL: string = `${HOST}/repos/vmg/redcarpet`;

export const ROUTES = {
  HOME: 'Home',
  DETAILS: 'Details',
  BOOKMARKS: 'Bookmarks',
};

export const SORT_TYPE = {
  CREATED_AT: 'Sort by created at',
  UPDATED_AT: 'Sort by updated at',
  COMMENTS: 'Sort by comments count',
};
