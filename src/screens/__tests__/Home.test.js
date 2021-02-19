// @flow
import React from 'react';
import renderer from 'react-test-renderer';
import Home from '../Home';

jest.mock('@react-navigation/native');

describe('snapshot', () => {
  it('renders correctly', () => {
    const tree = renderer.create(<Home />).toJSON();
    expect(tree).toMatchSnapshot();
  });
});
