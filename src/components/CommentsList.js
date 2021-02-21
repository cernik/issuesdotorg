// @flow
import {connect} from 'react-redux';
import React from 'react';
import Card from '../components/Card';
import LoadingView from '../components/LoadingView';
import type {ItemType} from '../types';
import {fetchCommentsAction} from '../redux/actions';

function useFetchComments(id: number, fetchFn: Function): [boolean] {
  const [isFetching, setIsFetching] = React.useState(false);

  React.useEffect(() => {
    const fetchData = async () => {
      if (id) {
        setIsFetching(true);
        await fetchFn(id);
        setIsFetching(false);
      }
    };

    fetchData();
  }, [id, fetchFn]);

  return [isFetching];
}

type CommentsListProps = {
  id: number,
  comments: Array<ItemType>,
  fetchComments: Function,
};

const CommentsList = ({id, comments, fetchComments}: CommentsListProps) => {
  const [isFetching] = useFetchComments(id, fetchComments);

  if (isFetching || !id) {
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

// export default CommentsList;

const CommentsListContainer = connect(
  (state) => ({comments: state.comments}),
  (dispatch) => ({
    fetchComments: (payload) => dispatch(fetchCommentsAction(payload)),
  }),
)(CommentsList);

export default CommentsListContainer;
