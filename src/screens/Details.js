// @flow
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
import {fetchOne} from '../utils/api';

function useFetch(url: string): [ItemType, boolean] {
  const [isFetching, setIsFetching] = React.useState(false);
  const [data, setData] = React.useState({});

  React.useEffect(() => {
    const fetchData = async () => {
      if (url) {
        setIsFetching(true);

        const responseData = await fetchOne(url);
        setData(responseData);

        setIsFetching(false);
      }
    };

    fetchData();
  }, [url]);

  return [data, isFetching];
}

type DetailsProps = {
  navigation: {
    setOptions: (params: Object) => void,
  },
  route: {
    params: {
      url: string,
    },
  },
};

const Details = ({navigation, route}: DetailsProps) => {
  const {url} = route.params;
  const [item, isFetching] = useFetch(url);

  const [selected, setSelected] = React.useState(false);

  const handleHeaderRightPress = React.useCallback(() => {
    storageUtility.getData('selected').then((ret: Array<ItemType>) => {
      let nextData: Array<ItemType> = (ret || []).filter(
        (s: ItemType) => s.id !== item?.id,
      );
      if (!selected) {
        nextData = nextData.concat([item]);
      }
      storageUtility.storeData('selected', nextData);
    });

    setSelected(!selected);
  }, [selected, setSelected, item]);

  React.useEffect(() => {
    storageUtility.getData('selected').then((ret: Array<ItemType>) => {
      const index: number = (ret || []).findIndex((s) => s.id === item?.id);
      if (index !== -1) {
        setSelected(true);
      }
    });
  }, [item?.id]);

  React.useLayoutEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <BookmarkButton
          selected={selected}
          onPress={handleHeaderRightPress}
          style={Styles.headerRight}
        />
      ),
    });
  }, [navigation, handleHeaderRightPress, selected]);

  if (isFetching) {
    return <LoadingView />;
  }

  return (
    <SafeAreaView>
      <ScrollView contentContainerStyle={styles.contentContainerStyle}>
        <CardHeader item={item} />
        <Card item={item} />
        <CommentsList url={item.comments_url} />
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
      url: '',
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
