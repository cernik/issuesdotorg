// @flow
import React from 'react';
import renderer from 'react-test-renderer';
import BookmarkButton from '../BookmarkButton';

describe('snapshot', () => {
  it('selected version renders correctly', () => {
    const tree = renderer.create(<BookmarkButton selected />).toJSON();
    expect(tree).toMatchSnapshot();
  });

  it('non-selected version renders correctly', () => {
    const tree = renderer.create(<BookmarkButton />).toJSON();
    expect(tree).toMatchSnapshot();
  });

  it('accepts onPress function', () => {
    const tree = renderer
      .create(<BookmarkButton onPress={() => {}} />)
      .toJSON();
    expect(tree).toMatchSnapshot();
  });
});
