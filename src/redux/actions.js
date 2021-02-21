// @flow
import * as t from './actionTypes';
import {fetchList, fetchOne, fetchComments, fetchBookmarks} from '../utils/api';
import * as storageUtility from '../utils/storage';
import type {ItemType, GetState, ThunkAction, ItemStateType} from '../types';

export function fetchListAction(payload: {
  shouldRefresh: boolean,
  state: ItemStateType,
  page: number,
  limit: number,
}): ThunkAction {
  return async (dispatch, getState: GetState): Promise<void> => {
    const {shouldRefresh, state, page, limit} = payload;
    const response = await fetchList({state, page, limit});
    if (shouldRefresh) {
      dispatch({type: t.FETCH_LIST, payload: response});
    } else {
      const prevData = getState().issues;
      dispatch({type: t.FETCH_LIST, payload: [...prevData, ...response]});
    }
  };
}

export function fetchOneAction(payload: number): ThunkAction {
  return async (dispatch, getState: GetState) => {
    const response = await fetchOne(payload);
    dispatch({type: t.FETCH_ONE, payload: response});
  };
}

export function fetchCommentsAction(payload: number): ThunkAction {
  return async (dispatch, getState: GetState) => {
    const response = await fetchComments(payload);
    dispatch({type: t.FETCH_COMMENTS, payload: response});
  };
}

export function fetchBookmarksAction(): ThunkAction {
  return async (dispatch, getState: GetState) => {
    const response = await fetchBookmarks();
    dispatch({type: t.FETCH_BOOKMARKS, payload: response});
  };
}

export function addBookmarkAction(payload: ItemType): ThunkAction {
  return async (dispatch, getState: GetState) => {
    const bookmarks = getState().bookmarks || [];
    let nextData = bookmarks
      .filter((s) => s.id !== payload.id)
      .concat([payload]);
    await storageUtility.storeData('selected', nextData);

    dispatch({type: t.STORE_BOOKMARKS, payload: nextData});
  };
}

export function removeBookmarkAction(payload: ItemType): ThunkAction {
  return async (dispatch, getState: GetState) => {
    const bookmarks = getState().bookmarks || [];
    let nextData = bookmarks.filter((s) => s.id !== payload.id);
    await storageUtility.storeData('selected', nextData);

    dispatch({type: t.STORE_BOOKMARKS, payload: nextData});
  };
}
