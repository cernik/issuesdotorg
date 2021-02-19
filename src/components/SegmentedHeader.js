// @flow
import React from 'react';
import {View, StyleSheet} from 'react-native';
import {noop} from '../utils/constants';
import {Styles} from '../utils/styles';
import type {ItemStateType} from '../types';
import SegmentedHeaderButton from './SegmentedHeaderButton';

const BUTTON_TYPE = {
  OPEN: 'open',
  CLOSED: 'closed',
  ALL: 'all',
};

type SegmentedHeaderProps = {
  value: ItemStateType,
  onChange: (value: ItemStateType) => void,
};

const SegmentedHeader = ({
  value = 'closed',
  onChange = noop,
}: SegmentedHeaderProps) => (
  <View style={Styles.row}>
    {Object.keys(BUTTON_TYPE).map((k, i, arr) => (
      <SegmentedHeaderButton
        key={k}
        style={
          !i
            ? styles.buttonStart
            : i === arr.length - 1
            ? styles.buttonEnd
            : null
        }
        selected={value === BUTTON_TYPE[k]}
        onPress={() => onChange(BUTTON_TYPE[k])}
        value={BUTTON_TYPE[k]}
      />
    ))}
  </View>
);

const styles = StyleSheet.create({
  buttonStart: {
    borderLeftWidth: 1,
    borderRightWidth: StyleSheet.hairlineWidth,
    borderTopLeftRadius: 8,
    borderBottomLeftRadius: 8,
  },
  buttonEnd: {
    borderRightWidth: 1,
    borderLeftWidth: StyleSheet.hairlineWidth,
    borderTopRightRadius: 8,
    borderBottomRightRadius: 8,
  },
});

export default SegmentedHeader;
