// @flow
import React from 'react';
import {View, ActivityIndicator, StyleSheet} from 'react-native';

type LoadingViewProps = {
  fill?: boolean,
};

const LoadingView = ({fill = false}: LoadingViewProps) => (
  <View
    style={[
      styles.container,
      {
        flex: +fill,
      },
    ]}>
    <ActivityIndicator size="large" color="black" />
  </View>
);

const styles = StyleSheet.create({
  container: {
    alignSelf: 'stretch',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 32,
  },
});

export default LoadingView;
