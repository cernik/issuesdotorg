// @flow
import React from 'react';
import renderer from 'react-test-renderer';
import SegmentedHeader from '../SegmentedHeader';

describe('snapshot', () => {
  it('renders correctly', () => {
    const tree = renderer
      .create(<SegmentedHeader value={'closed'} onChange={() => {}} />)
      .toJSON();
    expect(tree).toMatchSnapshot();
  });
});
