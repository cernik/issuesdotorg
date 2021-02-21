// @flow
import * as storageUtility from '../utils/storage';
import type {ItemType} from '../types';

import {URL} from './constants';

type fetchListParams = {
  state: 'closed' | 'open' | 'all',
  page: number,
  limit: number,
};

export async function fetchList({
  state = 'closed',
  page = 1,
  limit = 10,
}: fetchListParams): Promise<Array<ItemType | any>> {
  const dataResult = await fetch(
    `${URL}/issues?state=${state}&page=${page}&per_page=${limit}`,
  ).then((response) => response.json());

  if (!Array.isArray(dataResult)) {
    return [];
  }

  return dataResult;
}

export async function fetchOne(id: number): Promise<ItemType> {
  const dataResult = await fetch(`${URL}/issues/${id}`).then((response) =>
    response.json(),
  );

  if (typeof dataResult !== 'object') {
    return {};
  }

  return dataResult;
}

export async function fetchComments(id: number): Promise<Array<ItemType>> {
  const dataResult = await fetch(
    `${URL}/issues/${id}/comments`,
  ).then((response) => response.json());

  if (!Array.isArray(dataResult)) {
    return [];
  }

  return dataResult;
}

export async function fetchBookmarks(): Promise<Array<ItemType>> {
  const dataResult = await storageUtility.getData('selected');
  if (!Array.isArray(dataResult)) {
    return [];
  }

  return dataResult;
}
