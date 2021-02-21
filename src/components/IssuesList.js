// @flow
import React from 'react';
import {FlatList} from 'react-native';

import Row from './Row';
import type {ItemType, ItemStateType} from '../types';
import {noop} from '../utils/constants';
import {getSortedData} from '../utils/format';
import {fetchList} from '../utils/api';

function useFetchMore(
  state: ItemStateType = 'closed',
  sortType?: string,
): [Array<ItemType>, boolean, Function, Function] {
  const [page, setPage] = React.useState(1);
  const [isFetching, setIsFetching] = React.useState(false);
  const [shouldFetch, setShouldFetch] = React.useState(true);
  const [shouldRefresh, setShouldRefresh] = React.useState(true);
  const [data, setData] = React.useState([]);

  const fetchMore = React.useCallback(() => setShouldFetch(true), []);

  React.useEffect(() => {
    setShouldRefresh(true);
    setShouldFetch(true);
    setPage(1);
  }, [state]);

  const handleRefresh = React.useCallback(() => {
    setShouldRefresh(true);
    setPage(1);
    setShouldFetch(true);
  }, []);

  React.useEffect(() => {
    if (!shouldFetch) {
      return;
    }
    const fetch = async () => {
      const newData = await fetchList({state, page, limit: 20});
      setShouldFetch(false);
      setIsFetching(true);
      setTimeout(() => {
        setData((oldData) => {
          return shouldRefresh ? newData : [...oldData, ...newData];
        });
        setShouldRefresh(false);
        setIsFetching(false);
        setPage(page + 1);
      }, 1000);
    };

    fetch();
  }, [state, page, isFetching, shouldFetch, shouldRefresh]);

  return [data, isFetching, fetchMore, handleRefresh];
}

type IssuesListProps = {
  status: ItemStateType,
  sortType: string,
  onItemPress: Function,
};

const IssuesList = ({
  status = 'closed',
  sortType = '',
  onItemPress = noop,
}: IssuesListProps) => {
  const [data, isFetching, fetchMore, handleRefresh] = useFetchMore(status);

  const renderItem = ({item}: {item: ItemType}) => {
    return <Row item={item} onPress={onItemPress} />;
  };

  const keyExtractor = (item: ItemType, key: number): string => {
    return String(item.id || key);
  };

  return (
    <FlatList
      data={getSortedData(data, sortType)}
      renderItem={renderItem}
      refreshing={isFetching}
      onRefresh={handleRefresh}
      keyExtractor={keyExtractor}
      onEndReachedThreshold={1}
      onEndReached={fetchMore}
    />
  );
};

export default IssuesList;
