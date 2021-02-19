// @flow
import React from 'react';
import {
  Text,
  View,
  TouchableOpacity,
  FlatList,
  SafeAreaView,
  ActionSheetIOS,
  StyleSheet,
} from 'react-native';

import {noop, ROUTES, SORT_TYPE} from '../utils/constants';
import {Styles} from '../utils/styles';
import Row from '../components/Row';
import SegmentedHeader from '../components/SegmentedHeader';
import type {ItemType, ItemStateType} from '../types';
import {getSortedData} from '../utils/format';
import {fetchList} from '../utils/api';
import BookmarkAddIcon from '../assets/svg/bookmark-add.svg';

function useFetchMore(state = 'closed', sortType): [Array<ItemType>, Function] {
  const [page, setPage] = React.useState(1);
  const [shouldFetch, setShouldFetch] = React.useState(true);
  const [shouldRefresh, setShouldRefresh] = React.useState(true);
  const [data, setData] = React.useState([]);

  const fetchMore = React.useCallback(() => setShouldFetch(true), []);

  React.useEffect(() => {
    setShouldRefresh(true);
    setShouldFetch(true);
    setPage(1);
  }, [state]);

  React.useEffect(() => {
    if (!shouldFetch) {
      return;
    }

    const fetch = async () => {
      const newData = await fetchList({state, page, limit: 20});
      setShouldFetch(false);
      setData((oldData) => {
        return shouldRefresh ? newData : [...oldData, ...newData];
      });
      setShouldRefresh(false);
      setPage(page + 1);
    };

    fetch();
  }, [state, page, shouldFetch, shouldRefresh]);

  return [data, fetchMore];
}

const HeaderLeft = ({onPress = noop}) => (
  <TouchableOpacity onPress={onPress} style={Styles.headerLeft}>
    <View>
      <BookmarkAddIcon />
      <View style={[StyleSheet.absoluteFill, Styles.center]}>
        <View style={Styles.lineFat} />
        <View style={Styles.lineFat} />
        <View style={[Styles.lineFat, {marginBottom: 4}]} />
      </View>
    </View>
  </TouchableOpacity>
);

const HeaderRight = ({onPress = noop}) => (
  <TouchableOpacity onPress={onPress} style={Styles.headerRight}>
    <Text style={Styles.titleBig}>↓↑</Text>
  </TouchableOpacity>
);

type HomeProps = {
  navigation: {
    navigate: (name: string, params: Object) => void,
    setOptions: (params: Object) => void,
  },
};

function getOptions(selectedSortType: string): Array<string> {
  return [
    'Cancel',
    ...Object.keys(SORT_TYPE).map(
      (k: string) =>
        `${SORT_TYPE[k] === selectedSortType ? '✓ ' : ''}${SORT_TYPE[k]}`,
    ),
  ];
}

const Home = ({navigation}: HomeProps) => {
  const [sortType, setSortType] = React.useState(SORT_TYPE.UPDATED_AT);
  const [status, setStatus] = React.useState('all');
  const [data, fetchMore] = useFetchMore(status);

  React.useLayoutEffect(() => {
    const handleHeaderLeftPress = () => {
      navigation.navigate(ROUTES.BOOKMARKS);
    };

    const handleFilterPress = (s: ItemStateType) => {
      setStatus(s);
    };

    const handleHeaderRightPress = () => {
      ActionSheetIOS.showActionSheetWithOptions(
        {
          options: getOptions(sortType),
          cancelButtonIndex: 0,
        },
        (buttonIndex) => {
          if (buttonIndex === 1) {
            setSortType(SORT_TYPE.CREATED_AT);
          } else if (buttonIndex === 2) {
            setSortType(SORT_TYPE.UPDATED_AT);
          } else if (buttonIndex === 3) {
            setSortType(SORT_TYPE.COMMENTS);
          }
        },
      );
    };

    navigation.setOptions({
      headerLeft: () => <HeaderLeft onPress={handleHeaderLeftPress} />,
      headerTitle: () => (
        <SegmentedHeader value={status} onChange={handleFilterPress} />
      ),
      headerRight: () => <HeaderRight onPress={handleHeaderRightPress} />,
    });
  }, [navigation, status, sortType]);

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
        data={getSortedData(data, sortType)}
        renderItem={renderItem}
        keyExtractor={keyExtractor}
        onEndReachedThreshold={1}
        onEndReached={fetchMore}
      />
    </SafeAreaView>
  );
};

Home.defaultProps = {
  navigation: {
    navigate: noop,
    setOptions: noop,
  },
};

export default Home;
