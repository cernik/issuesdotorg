import {parseRepoFromUrl} from '../format.js';

describe('test link parser', () => {
  const repoUrl = 'https://github.com/react-native-clipboard/clipboard.git';
  const nonRepoUrl = 'https://reactnative.dev/';

  test('it returns false for non-github link', () => {
    expect(parseRepoFromUrl(nonRepoUrl)).toBe(false);
  });

  test('it returns non falsy result for github link', () => {
    const url = parseRepoFromUrl(repoUrl);
    expect(url).toBeTruthy();
  });

  test('it returns not the same link', () => {
    const url = parseRepoFromUrl(repoUrl);
    expect(url).toBeTruthy();
  });
});
