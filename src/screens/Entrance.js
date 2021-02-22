// @flow
import React from 'react';
import {View, Text, TouchableOpacity} from 'react-native';
import Clipboard from '@react-native-clipboard/clipboard';

import {ROUTES, HOST, DEFAULT_REPO, noop} from '../utils/constants';
import {Styles} from '../utils/styles';
import {fetchList} from '../utils/api';
import {parseRepoFromUrl} from '../utils/format';

const isGitUrl: (string) => boolean = (url) =>
  /^https:\/\/github.com\//.test(url);

type EntranceProps = {
  navigation: {
    navigate: (name: string, params: Object) => void,
  },
};

const Entrance = ({navigation}: EntranceProps) => {
  const [error, setError] = React.useState('');

  const handleDefaultPress = () => {
    const url = `${HOST}/repos/${DEFAULT_REPO}/issues`;
    navigation.navigate(ROUTES.HOME, {url: url});
  };

  const handlePress = React.useCallback(async () => {
    const str: string = await Clipboard.getString();
    if (isGitUrl(str)) {
      const repoName = parseRepoFromUrl(str);
      const url = `${HOST}/repos/${repoName}/issues`;
      setError('URL copied. Verifying...');
      const issues = await fetchList(url, 'all');
      if (issues.length) {
        setError('');
        navigation.navigate(ROUTES.HOME, {url});
      } else {
        setError(
          'No issues found for this repo. Try to check another one. Thanks',
        );
      }
    } else {
      setError('Please try again');
      setTimeout(() => {
        setError('');
      }, 2000);
    }
  }, [navigation]);

  return (
    <View style={[Styles.flex1, Styles.center]}>
      <View style={Styles.button}>
        <TouchableOpacity onPress={handlePress}>
          <Text style={Styles.titleBig}>Paste copied URL</Text>
        </TouchableOpacity>
      </View>
      <View style={{height: 32, marginTop: 20}}>
        <Text>{error}</Text>
      </View>
      <TouchableOpacity onPress={handleDefaultPress}>
        <View style={{height: 32, marginTop: 20}}>
          <Text>Or use default</Text>
        </View>
      </TouchableOpacity>
    </View>
  );
};

Entrance.defaultProps = {
  navigation: {
    navigate: noop,
  },
};

export default Entrance;
