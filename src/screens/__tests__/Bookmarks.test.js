// @flow
import React from 'react';
import renderer from 'react-test-renderer';
import Bookmarks from '../Bookmarks';

jest.mock('@react-navigation/native');

describe('snapshot', () => {
  it('renders correctly', () => {
    const tree = renderer.create(<Bookmarks />).toJSON();
    expect(tree).toMatchSnapshot();
  });
});
