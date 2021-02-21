// @flow
import * as storageUtility from '../utils/storage';
import type {ItemType, FetchListParams} from '../types';
import {URL} from './constants';

type RequestResponse = Array<ItemType> | ItemType;

const requestApi = async (url: string): Promise<RequestResponse> => {
  const response: Promise<any> = await fetch(url);
  const responseJson: Promise<any> = await response.json();
  return responseJson;
};

export async function fetchList({
  state = 'closed',
  page = 1,
  limit = 10,
}: FetchListParams): Promise<Array<ItemType>> {
  const url = `${URL}/issues?state=${state}&page=${page}&per_page=${limit}`;
  const dataResult: Array<ItemType> = await requestApi(url);

  if (!Array.isArray(dataResult)) {
    return [];
  }

  return dataResult;
}

export async function fetchOne(id: number): Promise<ItemType> {
  const url = `${URL}/issues/${id}`;
  const dataResult: ItemType = await requestApi(url);

  if (typeof dataResult !== 'object') {
    return {};
  }

  return dataResult;
}

export async function fetchComments(id: number): Promise<Array<ItemType>> {
  const url = `${URL}/issues/${id}/comments`;
  const dataResult: Array<ItemType> = await requestApi(url);

  if (!Array.isArray(dataResult)) {
    return [];
  }

  return dataResult;
}

export async function fetchBookmarks(): Promise<Array<ItemType>> {
  const dataResult: Array<ItemType> = await storageUtility.getData('selected');
  if (!Array.isArray(dataResult)) {
    return [];
  }

  return dataResult;
}
