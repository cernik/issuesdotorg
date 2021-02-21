import * as t from './actionTypes';
import type {State, Action} from '../types';

const intialState: State = {
  issues: [],
  currentIssue: {},
  bookmarks: [],
  comments: [],
};

const reducer = (state: State = intialState, action: Action = {}) => {
  switch (action.type) {
    case t.FETCH_LIST:
      return {
        ...state,
        issues: action.payload,
      };
    case t.FETCH_ONE:
      return {
        ...state,
        currentIssue: action.payload,
      };
    case t.FETCH_COMMENTS:
      return {
        ...state,
        comments: action.payload,
      };
    case t.FETCH_BOOKMARKS:
      return {
        ...state,
        bookmarks: action.payload,
      };
    case t.STORE_BOOKMARKS:
      return {
        ...state,
        bookmarks: action.payload,
      };
    default:
      return state;
  }
};

export default reducer;
