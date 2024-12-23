import { useState } from 'react';
import styled from 'styled-components';
import { Icon } from '../../../../components';
import { Comment } from './components';

const CommentsContainer = ({ className, comments }) => {
  const [newComment, setNewComment] = useState('');

  return (
    <div className={className}>
      <div className="new-comment">
        <textarea
          value={newComment}
          placeholder="Комментарий..."
          onChange={({ target }) => setNewComment(target.value)}
        ></textarea>
        <Icon id="fa-paper-plane-o" margin="0 0 0 10px" size="18px" onClick={() => {}} />
      </div>
      <div className="comments">
        {comments.map(({ id, author, content, publishedAt }) => (
          <Comment
            key={id}
            id={id}
            author={author}
            content={content}
            publishedAt={publishedAt}
          />
        ))}
      </div>
    </div>
  );
};

export const Comments = styled(CommentsContainer)`
  display: flex;
  width: 580px;
  margin: 0 auto;

  & .new-comment {
    display: flex;
    width: 100%;
    margin: 20px 0 0;
  }

  & .new-comment textarea {
    width: 100%;
    resize: none;
    height: 120px;
    font-size: 18px;
  }
`;
