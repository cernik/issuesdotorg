// @flow
import React from 'react';
import renderer from 'react-test-renderer';
import CardHeader from '../CardHeader';

describe('snapshot', () => {
  const item = {
    id: 808245666,
    state: 'closed',
    title: 'title goes here',
    body: 'default body',
    number: 704,
    comments: 12,
    user: {
      login: 'johndoe110',
      avatar_url: 'path_to_avatar.png',
    },
    created_at: '2021-02-15T07:02:04Z',
    updated_at: '2021-02-15T07:12:37Z',
  };

  it('render correctly with given data', () => {
    const tree = renderer.create(<CardHeader item={item} />).toJSON();
    expect(tree).toMatchSnapshot();
  });
});
