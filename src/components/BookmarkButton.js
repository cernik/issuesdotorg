// @flow
import React from 'react';
import {TouchableOpacity} from 'react-native';

import {noop} from '../utils/constants';

import BookmarkIcon from '../assets/svg/bookmark.svg';
import BookmarkAddIcon from '../assets/svg/bookmark-add.svg';

type BookmarkButtonProps = {
  selected?: boolean,
  onPress?: () => void,
  style?: Object,
};

const BookmarkButton = ({
  selected = false,
  onPress = noop,
  style,
}: BookmarkButtonProps) => (
  <TouchableOpacity onPress={onPress} style={style}>
    {selected ? <BookmarkIcon /> : <BookmarkAddIcon />}
  </TouchableOpacity>
);

export default BookmarkButton;
