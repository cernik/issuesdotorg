// @flow
import React from 'react';
import Card from '../components/Card';
import LoadingView from '../components/LoadingView';
import type {ItemType} from '../types';

import {fetchComments} from '../utils/api';

function useFetchComments(id: number): [Array<ItemType>, boolean] {
  const [isFetching, setIsFetching] = React.useState(false);
  const [data, setData] = React.useState([]);

  React.useEffect(() => {
    const fetchData = async () => {
      if (id) {
        setIsFetching(true);

        const responseData = await fetchComments(id);

        setData(responseData);

        setIsFetching(false);
      }
    };

    fetchData();
  }, [id]);

  return [data, isFetching];
}

type CommentsListProps = {
  id: number,
};

const CommentsList = ({id}: CommentsListProps) => {
  const [comments, isFetchingComments] = useFetchComments(id);

  if (!isFetchingComments || !id) {
    return <LoadingView />;
  }

  return (
    <>
      {comments.map((comment) => (
        <Card key={String(comment.id)} item={comment} descendant />
      ))}
    </>
  );
};

export default CommentsList;
