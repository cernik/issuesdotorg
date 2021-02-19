// @flow
import React from 'react';
import {ScrollView, SafeAreaView, StyleSheet} from 'react-native';

import * as storageUtility from '../utils/storage';
import {noop} from '../utils/constants';

import CardHeader from '../components/CardHeader';
import Card from '../components/Card';
import LoadingView from '../components/LoadingView';
import BookmarkButton from '../components/BookmarkButton';
import type {ItemType} from '../types';
import {Styles} from '../utils/styles';

import {fetchOne, fetchComments} from '../utils/api';

function useFetch(id = '', defaultData = {}): [ItemType, boolean] {
  const [isFetching, setIsFetching] = React.useState(false);
  const [data, setData] = React.useState(defaultData);

  React.useEffect(() => {
    const fetchData = async () => {
      if (id) {
        setIsFetching(true);

        const responseData = await fetchOne(id);
        setData(responseData);

        setIsFetching(false);
      }
    };

    fetchData();
  }, [id]);

  return [data, isFetching];
}

function useFetchComments(
  id = '',
  defaultData = [],
): [Array<ItemType>, boolean] {
  const [isFetching, setIsFetching] = React.useState(false);
  const [data, setData] = React.useState(defaultData);

  React.useEffect(() => {
    const fetchData = async () => {
      if (id) {
        setIsFetching(true);

        const responseData = await fetchComments(id);

        setData(responseData);

        setIsFetching(false);
      }
    };

    fetchData();
  }, [id]);

  return [data, isFetching];
}

type DetailsProps = {
  navigation: {
    setOptions: (params: Object) => void,
  },
  route: {
    params: {
      id: string,
    },
  },
};

const Details = ({navigation, route}: DetailsProps) => {
  const {id} = route.params;
  const [item, isFetching] = useFetch(id);
  const [comments, isFetchingComments] = useFetchComments(id);

  const [selected, setSelected] = React.useState(false);

  const handlePress = React.useCallback(() => {
    storageUtility.getData('selected').then((ret) => {
      let nextData = (ret || []).filter((s) => s.number !== item?.number);
      if (!selected) {
        nextData = nextData.concat([item]);
      }
      storageUtility.storeData('selected', nextData);
    });

    setSelected(!selected);
  }, [selected, setSelected, item]);

  React.useEffect(() => {
    storageUtility.getData('selected').then((ret) => {
      const index = (ret || []).findIndex((s) => s.number === item?.number);
      if (index !== -1) {
        setSelected(true);
      }
    });
  }, [item?.number]);

  React.useLayoutEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <BookmarkButton
          selected={selected}
          onPress={handlePress}
          style={Styles.headerRight}
        />
      ),
    });
  }, [navigation, handlePress, selected]);

  if (isFetching) {
    return <LoadingView />;
  }

  return (
    <SafeAreaView>
      <ScrollView contentContainerStyle={styles.contentContainerStyle}>
        <CardHeader item={item} />
        <Card item={item} />
        {isFetchingComments ? (
          <LoadingView />
        ) : (
          comments.map((comment) => (
            <Card key={comment.id} item={comment} descendant />
          ))
        )}
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
};

const styles = StyleSheet.create({
  contentContainerStyle: {
    padding: 16,
    marginVertical: 16,
  },
});

export default Details;
