import { useDispatch, useSelector } from 'react-redux';
import { Comments, PostContent, PostForm } from './components';
import { useMatch, useParams } from 'react-router-dom';
import styled from 'styled-components';
import { useServerRequest } from '../../hooks';
import { loadPostAsync } from '../../actions';
import { selectPost } from '../../selectors';
import { useEffect } from 'react';

const PostContainer = ({ className }) => {
  const dispatch = useDispatch();
  const params = useParams();
  const isEditing = useMatch('/post/:id/edit');
  const requestServer = useServerRequest();
  const post = useSelector(selectPost);

  useEffect(() => {
    dispatch(loadPostAsync(requestServer, params.id));
  }, [dispatch, requestServer, params.id]);

  return (
    <div className={className}>
      {isEditing ? (
        <PostForm post={post} />
      ) : (
        <>
          <PostContent post={post} />
          <Comments comments={post.comments} postId={post.id} />
        </>
      )}
    </div>
  );
};

export const Post = styled(PostContainer)`
  margin: 40px 0;
  padding: 0 80px;
`;
