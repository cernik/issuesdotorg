// @flow
import React from 'react';
import {Text, View, StyleSheet} from 'react-native';

import OpenWhite from '../assets/svg/open-white.svg';
import ClosedWhite from '../assets/svg/closed-white.svg';

import {Styles} from '../utils/styles';
import type {ItemType} from '../types';

type CardHeaderProps = {
  item: ItemType,
};

const CardHeader = ({item}: CardHeaderProps) => {
  const isClosed = item.state === 'closed';
  return (
    <>
      <Text style={Styles.titleBig}>
        {item.title}
        <Text
          style={{
            fontWeight: '500',
            color: 'grey',
          }}>{` #${item?.number}`}</Text>
      </Text>
      <View
        style={{
          paddingVertical: 16,
          marginBottom: 16,
          alignItems: 'center',
          flexDirection: 'row',
          borderBottomWidth: 1,
          borderColor: 'gainsboro',
        }}>
        <View
          style={[
            Styles.row,
            styles.state,
            {
              backgroundColor: isClosed ? 'red' : 'green',
            },
          ]}>
          {isClosed ? (
            <ClosedWhite style={Styles.icon} />
          ) : (
            <OpenWhite style={Styles.icon} />
          )}
          <Text
            style={{
              fontSize: 18,
              color: 'white',
              fontWeight: '600',
              marginHorizontal: 8,
            }}>{`${isClosed ? 'Closed' : 'Open'}`}</Text>
        </View>
        <Text style={{fontSize: 16, marginStart: 8}}>{`${
          item.comments
        } comment${item.comments > 1 ? 's' : ''}`}</Text>
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  state: {
    paddingHorizontal: 12,
    height: 32,
    borderRadius: 16,
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default CardHeader;
