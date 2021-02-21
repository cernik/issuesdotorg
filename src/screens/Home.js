// @flow
import React from 'react';
import {
  Text,
  View,
  TouchableOpacity,
  SafeAreaView,
  ActionSheetIOS,
  StyleSheet,
} from 'react-native';

import {noop, ROUTES, SORT_TYPE} from '../utils/constants';
import {Styles} from '../utils/styles';
import SegmentedHeader from '../components/SegmentedHeader';
import IssuesList from '../components/IssuesList';
import type {ItemType, ItemStateType} from '../types';
import BookmarkAddIcon from '../assets/svg/bookmark-add.svg';

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

  return (
    <SafeAreaView style={Styles.flex1}>
      <IssuesList
        status={status}
        sortType={sortType}
        onItemPress={handlePress}
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
