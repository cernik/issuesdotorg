// @flow
import {connect} from 'react-redux';
import React from 'react';
import {FlatList, SafeAreaView} from 'react-native';
import {useFocusEffect} from '@react-navigation/native';

import {noop, ROUTES} from '../utils/constants';
import {Styles} from '../utils/styles';
import Row from '../components/Row';
import type {ItemType} from '../types';
import {fetchBookmarksAction} from '../redux/actions';

function useFetch(fetchFn) {
  const [isFetching, setIsFetching] = React.useState(false);

  useFocusEffect(
    React.useCallback(() => {
      const fetchData = async () => {
        setIsFetching(true);
        await fetchFn();
        setIsFetching(false);
      };

      fetchData();
    }, [fetchFn]),
  );

  return [isFetching];
}

type BookmarksProps = {
  navigation: {
    navigate: (name: string, params: Object) => void,
    setOptions: (params: Object) => void,
  },
  bookmarks: Array<ItemType>,
  fetchBookmarks: Function,
};

const Bookmarks = ({navigation, bookmarks, fetchBookmarks}: BookmarksProps) => {
  useFetch(fetchBookmarks);

  const handlePress = (item: ItemType): void => {
    if (item.number) {
      navigation.navigate(ROUTES.DETAILS, {id: item.number});
    }
  };

  const renderItem = ({item}: {item: ItemType}) => {
    return <Row item={item} onPress={handlePress} />;
  };

  const keyExtractor = (item: ItemType, key: number): string => {
    return String(item.id || key);
  };

  return (
    <SafeAreaView style={Styles.flex1}>
      <FlatList
        data={bookmarks}
        renderItem={renderItem}
        keyExtractor={keyExtractor}
        onEndReachedThreshold={1}
      />
    </SafeAreaView>
  );
};

Bookmarks.defaultProps = {
  navigation: {
    navigate: noop,
    setOptions: noop,
  },
};

// export default Bookmarks;

const BookmarksContainer = connect(
  (state) => ({bookmarks: state.bookmarks}),
  (dispatch) => ({
    fetchBookmarks: () => dispatch(fetchBookmarksAction()),
  }),
)(Bookmarks);

export default BookmarksContainer;
