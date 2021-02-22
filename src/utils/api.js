// @flow
import * as storageUtility from '../utils/storage';
import type {ItemType} from '../types';

function requestApi(url: string): Promise<any> {
  return fetch(url).then((response) => response.json());
}

export async function fetchList(
  url: string,
  state: string = 'closed',
  page: number = 1,
  limit: number = 10,
): Promise<Array<ItemType>> {
  const urlWithParams: string = `${url}?state=${state}&page=${page}&per_page=${limit}`;

  const dataResult: Array<ItemType> = await requestApi(urlWithParams);

  if (!Array.isArray(dataResult)) {
    return [];
  }

  return dataResult;
}

export async function fetchOne(url: string): Promise<ItemType> {
  const dataResult: ItemType = await requestApi(url);

  if (typeof dataResult !== 'object') {
    return {};
  }

  return dataResult;
}

export async function fetchComments(url: string): Promise<Array<ItemType>> {
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
