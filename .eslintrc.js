module.exports = {
  root: true,
  extends: '@react-native-community',
  globals: {
    __DEV__: 'readonly',
    jest: 'readonly',
  },
  rules: {
    'react-native/no-inline-styles': 0,
  },
};
