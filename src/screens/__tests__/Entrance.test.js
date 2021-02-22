// @flow
import React from 'react';
import renderer from 'react-test-renderer';
import Entrance from '../Entrance';

describe('snapshot', () => {
  it('renders correctly', () => {
    const tree = renderer.create(<Entrance />).toJSON();
    expect(tree).toMatchSnapshot();
  });
});
