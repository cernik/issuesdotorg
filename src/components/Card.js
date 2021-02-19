// @flow
import React from 'react';
import {View, Text, Image, StyleSheet} from 'react-native';

import {Styles} from '../utils/styles';
import {parseCreatedAtText} from '../utils/format';
import Smiley from '../assets/svg/smiley.svg';

import type {ItemType} from '../types';

type CardProps = {
  item: ItemType,
  descendant?: boolean,
};

const Card = ({item, descendant}: CardProps) => {
  const createdAtText = parseCreatedAtText(item);
  return (
    <>
      {descendant ? <View style={styles.line} /> : null}
      <View style={styles.card}>
        <View style={[styles.header, Styles.row]}>
          <Image source={{uri: item?.user?.avatar_url}} style={styles.avatar} />
          <Text style={[Styles.title, styles.name]}>
            {item?.user?.login}
            <Text style={styles.createdAt}>{createdAtText}</Text>
          </Text>
        </View>
        <View style={styles.body}>
          <Text style={Styles.text}>{item?.body}</Text>
        </View>
        <View style={styles.footer}>
          <Smiley />
        </View>
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  line: {
    marginStart: 16,
    borderLeftWidth: 2,
    borderLeftColor: 'gainsboro',
    height: 16,
  },
  card: {
    borderWidth: 1,
    borderColor: 'gainsboro',
    borderRadius: 8,
  },
  header: {
    height: 48,
    backgroundColor: 'rgb(246, 248, 250)',
    borderTopLeftRadius: 8,
    borderTopRightRadius: 8,
    borderBottomWidth: 1,
    borderBottomColor: 'gainsboro',
    alignItems: 'center',
    paddingStart: 16,
  },
  avatar: {
    height: 24,
    width: 24,
    borderRadius: 12,
  },
  name: {
    marginStart: 8,
  },
  createdAt: {
    fontWeight: '400',
  },
  body: {
    borderBottomWidth: 1,
    borderBottomColor: 'gainsboro',
    padding: 8,
  },
  footer: {
    height: 32,
    paddingStart: 8,
    justifyContent: 'center',
  },
});

export default Card;
