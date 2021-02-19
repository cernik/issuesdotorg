// @flow
import React from 'react';
import renderer from 'react-test-renderer';
import SegmentedHeaderButton from '../SegmentedHeaderButton';

describe('snapshot', () => {
  it('renders correctly', () => {
    const tree = renderer
      .create(
        <SegmentedHeaderButton selected value={'closed'} onPress={() => {}} />,
      )
      .toJSON();
    expect(tree).toMatchSnapshot();
  });
});
