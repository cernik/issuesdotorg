// @flow
import React from 'react';
import renderer from 'react-test-renderer';
import LoadingView from '../LoadingView';

describe('snapshot', () => {
  it('renders correctly with no data', () => {
    const tree = renderer.create(<LoadingView />).toJSON();
    expect(tree).toMatchSnapshot();
  });
});
