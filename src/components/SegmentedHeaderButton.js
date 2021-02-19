// @flow
import React from 'react';
import {View, Text, TouchableOpacity, StyleSheet} from 'react-native';
import {noop} from '../utils/constants';
import {Styles} from '../utils/styles';
import type {ItemStateType} from '../types';

type SegmentedHeaderButtonProps = {
  value: ItemStateType,
  selected: boolean,
  onPress: () => void,
  style: Object,
};

const SegmentedHeaderButton = ({
  value = 'all',
  selected = false,
  onPress = noop,
  style,
}: SegmentedHeaderButtonProps) => (
  <View
    style={[
      styles.button,
      {
        backgroundColor: selected ? 'gainsboro' : 'white',
      },
      style,
    ]}>
    <TouchableOpacity onPress={onPress}>
      <Text style={[Styles.control, selected ? {fontWeight: 'bold'} : {}]}>
        {value}
      </Text>
    </TouchableOpacity>
  </View>
);

const styles = StyleSheet.create({
  button: {
    borderTopWidth: 1,
    borderBottomWidth: 1,
    padding: 4,
    paddingHorizontal: 16,
    minWidth: 90,
    alignItems: 'center',
  },
});

export default SegmentedHeaderButton;
