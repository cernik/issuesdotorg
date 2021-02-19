// @flow
import React from 'react';
import renderer from 'react-test-renderer';
import Details from '../Details';

jest.mock('@react-navigation/native');

describe('snapshot', () => {
  it('renders correctly', () => {
    const tree = renderer.create(<Details />).toJSON();
    expect(tree).toMatchSnapshot();
  });
});
