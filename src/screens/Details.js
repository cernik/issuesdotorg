// @flow
import {connect} from 'react-redux';
import React from 'react';
import {ScrollView, SafeAreaView, StyleSheet} from 'react-native';

import * as storageUtility from '../utils/storage';
import {noop} from '../utils/constants';

import CardHeader from '../components/CardHeader';
import Card from '../components/Card';
import CommentsList from '../components/CommentsList';
import LoadingView from '../components/LoadingView';
import BookmarkButton from '../components/BookmarkButton';
import type {ItemType} from '../types';
import {Styles} from '../utils/styles';
import {
  fetchOneAction,
  addBookmarkAction,
  removeBookmarkAction,
} from '../redux/actions';

function useFetch(id: number, fetchFn: Function): [boolean] {
  const [isFetching, setIsFetching] = React.useState(false);

  React.useEffect(() => {
    const fetchData = async () => {
      if (id) {
        setIsFetching(true);
        await fetchFn(id);
        setIsFetching(false);
      }
    };

    fetchData();
  }, [id, fetchFn]);

  return [isFetching];
}

type DetailsProps = {
  navigation: {
    setOptions: (params: Object) => void,
  },
  route: {
    params: {
      id: number,
    },
  },
  item: ItemType,
  fetchOne: Promise<any>,
  isBookmark: boolean,
  addBookmark: Function,
  removeBookmark: Function,
};

const Details = ({
  navigation,
  route,
  item,
  fetchOne,
  isBookmark,
  addBookmark,
  removeBookmark,
}: DetailsProps) => {
  const {id} = route.params;
  const [isFetching] = useFetch(id, fetchOne);

  const handleHeaderRightPress = React.useCallback(() => {
    if (isBookmark) {
      removeBookmark(item);
    } else {
      addBookmark(item);
    }
  }, [isBookmark, item, addBookmark, removeBookmark]);

  React.useLayoutEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <BookmarkButton
          selected={isBookmark}
          onPress={handleHeaderRightPress}
          style={Styles.headerRight}
        />
      ),
    });
  }, [navigation, handleHeaderRightPress, isBookmark]);

  if (isFetching) {
    return <LoadingView />;
  }

  return (
    <SafeAreaView>
      <ScrollView contentContainerStyle={styles.contentContainerStyle}>
        <CardHeader item={item} />
        <Card item={item} />
        <CommentsList id={item?.number} />
      </ScrollView>
    </SafeAreaView>
  );
};

Details.defaultProps = {
  navigation: {
    setOptions: noop,
  },
  route: {
    params: {
      item: {},
    },
  },
  item: {},
};

const styles = StyleSheet.create({
  contentContainerStyle: {
    padding: 16,
    marginVertical: 16,
  },
});

// export default Details;

const DetailsContainer = connect(
  (state) => ({
    item: state.currentIssue,
    isBookmark:
      state.bookmarks.findIndex((x) => x.id === state.currentIssue.id) !== -1,
  }),
  (dispatch) => ({
    fetchOne: (payload) => dispatch(fetchOneAction(payload)),
    addBookmark: (payload) => dispatch(addBookmarkAction(payload)),
    removeBookmark: (payload) => dispatch(removeBookmarkAction(payload)),
  }),
)(Details);

export default DetailsContainer;
