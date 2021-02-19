// @flow
import {StyleSheet} from 'react-native';

const FONT_SIZE = {
  TITLE_BIG: 22,
  TITLE: 17,
  TEXT: 15,
  DESCRIPTION: 13,
};

export const Styles = StyleSheet.create({
  flex1: {
    flex: 1,
  },
  center: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  titleBig: {
    fontSize: FONT_SIZE.TITLE_BIG,
    fontWeight: '700',
  },
  title: {
    fontSize: FONT_SIZE.TITLE,
    fontWeight: '500',
  },
  control: {
    fontSize: FONT_SIZE.TITLE,
    fontWeight: '500',
  },
  text: {
    fontSize: FONT_SIZE.TEXT,
    fontWeight: '400',
  },
  description: {
    fontSize: FONT_SIZE.DESCRIPTION,
    fontWeight: '400',
  },
  row: {
    flexDirection: 'row',
  },
  icon: {
    margin: 2,
  },
  headerLeft: {
    marginStart: 18,
  },
  headerRight: {
    marginEnd: 18,
  },
  lineFat: {
    height: 2,
    width: 10,
    backgroundColor: 'black',
    marginBottom: 2,
  },
});
