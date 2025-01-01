import styled from 'styled-components';
import { Icon } from '../../../../../../components';
import { useDispatch } from 'react-redux';
import { removeCommentAsync } from '../../../../../../actions/remove-comment-async';
import { useServerRequest } from '../../../../../../hooks/use-server-request';
import { CLOSE_MODAL, openModal } from '../../../../../../actions';

const CommentContainer = ({ className, id, author, publishedAt, postId, content }) => {
  const dispatch = useDispatch();
  const requestServer = useServerRequest();

  const onCommentRemove = (id) => {
    dispatch(
      openModal({
        text: 'Удалить комментарий',
        onConfirm: () => {
          dispatch(removeCommentAsync(requestServer, postId, id));
          dispatch(CLOSE_MODAL);
        },
        onCancel: () => dispatch(CLOSE_MODAL),
      }),
    );
  };

  return (
    <div className={className}>
      <div className="comment">
        <div className="information-panel">
          <div className="author">
            <Icon
              id="fa-user-circle-o"
              size="18px"
              margin="0 10px 0 0"
              onClick={() => {}}
            />
            {author}
          </div>
          <div className="published-at">
            <Icon id="fa-calendar-o" size="18px" margin="0 10px 0 0" onClick={() => {}} />
            {publishedAt}
          </div>
        </div>
        <div className="comment-text">{content}</div>
      </div>
      <Icon
        id="fa-trash-o"
        size="21px"
        margin="0 0 0 10px"
        onClick={() => onCommentRemove(id)}
      />
    </div>
  );
};

export const Comment = styled(CommentContainer)`
  display: flex;
  margin-top: 10px;
  width: 100%;

  & .comment {
    width: 550px;
    border: 1px solid black;
    padding: 5px 10px;
  }

  & .information-panel {
    display: flex;
    justify-content: space-between;
  }

  & .author {
    display: flex;
  }

  & .published-at {
    display: flex;
  }
`;
