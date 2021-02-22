// @flow
import React from 'react';
import {FlatList, SafeAreaView} from 'react-native';
import {useFocusEffect} from '@react-navigation/native';

import {noop, ROUTES} from '../utils/constants';
import {Styles} from '../utils/styles';
import Row from '../components/Row';
import type {ItemType} from '../types';
import {fetchBookmarks} from '../utils/api';

function useBookmarksStorageWithFocusEffect() {
  const [data, setData] = React.useState([]);

  useFocusEffect(() => {
    React.useCallback(() => {
      const fetch = async () => {
        const nextData = await fetchBookmarks();
        setData(nextData);
      };

      fetch();
    }, []);
  });

  return [data];
}

type BookmarksProps = {
  navigation: {
    navigate: (name: string, params: Object) => void,
    setOptions: (params: Object) => void,
  },
};

const Bookmarks = ({navigation}: BookmarksProps) => {
  const [data] = useBookmarksStorageWithFocusEffect();

  const handlePress = (item: ItemType): void => {
    if (item.url) {
      navigation.navigate(ROUTES.DETAILS, {url: item.url});
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
        data={data}
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

export default Bookmarks;
