// @flow
import moment from 'moment';
import type {ItemType} from '../types';
import {SORT_TYPE} from './constants';

export function parseCreatedAtText(item: ItemType): string {
  return ` on ${moment(item?.created_at).format('MMM DD, YYYY')}`;
}

export function parseRowDescription(item: ItemType): string {
  if (item.state === 'closed') {
    return `#${item?.number} by ${
      item?.user?.login
    } was closed - updated ${moment(item?.updated_at).fromNow(true)}`;
  } else {
    return `#${item?.number} opened by ${item?.user?.login}  - updated ${moment(
      item?.updated_at,
    ).fromNow(true)}`;
  }
}

export function getSortedData(
  data: Array<ItemType>,
  sortType: string,
): Array<ItemType> {
  if (sortType === SORT_TYPE.CREATED_AT) {
    return data.sort((a, b) => {
      return moment(a.created_at).isBefore(moment(b.created_at)) ? 1 : -1;
    });
  }
  if (sortType === SORT_TYPE.UPDATED_AT) {
    return data.sort((a, b) => {
      return moment(a.updated_at).isBefore(moment(b.updated_at)) ? 1 : -1;
    });
  }
  if (sortType === SORT_TYPE.COMMENTS) {
    return data.sort((a, b) => {
      return a.comments > b.comments ? -1 : 1;
    });
  }

  return data;
}
