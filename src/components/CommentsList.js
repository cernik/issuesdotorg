// @flow
import React from 'react';
import Card from '../components/Card';
import LoadingView from '../components/LoadingView';
import type {ItemType} from '../types';

import {fetchComments} from '../utils/api';

function useFetchComments(url: string): [Array<ItemType>, boolean] {
  const [isFetching, setIsFetching] = React.useState(false);
  const [data, setData] = React.useState([]);

  React.useEffect(() => {
    const fetchData = async () => {
      if (url) {
        setIsFetching(true);

        const responseData = await fetchComments(url);

        setData(responseData);

        setIsFetching(false);
      }
    };

    fetchData();
  }, [url]);

  return [data, isFetching];
}

type CommentsListProps = {
  url: string,
};

const CommentsList = ({url}: CommentsListProps) => {
  const [comments, isFetchingComments] = useFetchComments(url);

  if (isFetchingComments || !url) {
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
