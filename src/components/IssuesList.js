// @flow
import {connect} from 'react-redux';
import React from 'react';
import {FlatList} from 'react-native';

import Row from './Row';
import type {ItemType, ItemStateType} from '../types';
import {noop} from '../utils/constants';
import {getSortedData} from '../utils/format';
import {fetchListAction} from '../redux/actions';

function useFetchMore(
  fetchFn: Function,
  state: ItemStateType = 'closed',
): [boolean, Function, Function] {
  const [page, setPage] = React.useState(1);
  const [isFetching, setIsFetching] = React.useState(false);
  const [shouldFetch, setShouldFetch] = React.useState(true);
  const [shouldRefresh, setShouldRefresh] = React.useState(true);

  const fetchMore = React.useCallback(() => setShouldFetch(true), []);

  React.useEffect(() => {
    setShouldFetch(true);
    setShouldRefresh(true);
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
      setIsFetching(true);
      await fetchFn({state, page, limit: 20, shouldRefresh});
      setShouldFetch(false);
      setShouldRefresh(false);
      setIsFetching(false);
      setPage(page + 1);
    };

    fetch();
  }, [fetchFn, state, page, shouldFetch, shouldRefresh]);

  return [isFetching, fetchMore, handleRefresh];
}

type IssuesListProps = {
  status: ItemStateType,
  sortType: string,
  onItemPress: Function,
  issues: Array<ItemType>,
  onItemPress: Function,
  fetchList: Function,
};

const IssuesList = ({
  status = 'closed',
  sortType = '',
  issues,
  onItemPress = noop,
  fetchList = noop,
}: IssuesListProps) => {
  const [isFetching, fetchMore, handleRefresh] = useFetchMore(
    fetchList,
    status,
  );

  const renderItem = ({item}: {item: ItemType}) => {
    return <Row item={item} onPress={onItemPress} />;
  };

  const keyExtractor = (item: ItemType, key: number): string => {
    return String(item.id || key);
  };

  return (
    <FlatList
      data={getSortedData(issues, sortType)}
      renderItem={renderItem}
      refreshing={isFetching}
      onRefresh={handleRefresh}
      keyExtractor={keyExtractor}
      onEndReachedThreshold={1}
      onEndReached={fetchMore}
    />
  );
};

// export default IssuesList;

const IssuesListContainer = connect(
  (state) => ({
    issues: state.issues,
  }),
  (dispatch) => ({
    fetchList: (payload) => dispatch(fetchListAction(payload)),
  }),
)(IssuesList);

export default IssuesListContainer;
