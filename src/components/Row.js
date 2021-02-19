// @flow
import React from 'react';
import {View, Text, TouchableOpacity, StyleSheet} from 'react-native';

import OpenIcon from '../assets/svg/open.svg';
import ClosedIcon from '../assets/svg/closed.svg';
import CommentsIcon from '../assets/svg/comments.svg';

import {parseRowDescription} from '../utils/format';
import {noop} from '../utils/constants';
import {Styles} from '../utils/styles';
import type {ItemType} from '../types';

type RowProps = {
  item: ItemType,
  onPress: (item: ItemType) => void,
};

const Row = ({item = {}, onPress = noop}: RowProps) => {
  const isClosed = item?.state === 'closed';
  const rowDescription = parseRowDescription(item);

  const handlePress = () => {
    onPress(item);
  };

  return (
    <TouchableOpacity onPress={handlePress} disabled={!onPress}>
      <View style={[Styles.row, styles.container]}>
        {isClosed ? (
          <ClosedIcon style={styles.icon} />
        ) : (
          <OpenIcon style={styles.icon} />
        )}
        <View style={styles.rowBody}>
          <Text style={Styles.title}>{item?.title}</Text>
          <Text style={Styles.description}>{rowDescription}</Text>
        </View>
        <View style={Styles.row}>
          <CommentsIcon style={styles.icon} />
          <Text style={Styles.description}>{item?.comments}</Text>
        </View>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    height: 100,
    borderBottomWidth: 1,
    marginHorizontal: 16,
    paddingTop: 8,
    paddingBottom: 4,
  },
  icon: {
    margin: 2,
  },
  rowBody: {
    marginStart: 8,
    flex: 1,
    justifyContent: 'space-between',
  },
});

export default Row;
