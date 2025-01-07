import { deleteComment, getComments, getPost } from '../api';
import { ROLE } from '../constants';
import { sessions } from '../sessions';
import { getPostCommentsWithAuthors } from '../utils';

export const removePostComment = async (hash, postId, id) => {
  const accessRoles = [ROLE.ADMIN, ROLE.MODERATOR];

  const access = await sessions.access(hash, accessRoles);

  if (!access) {
    return {
      error: 'Доступ запрещен',
      res: null,
    };
  }

  await deleteComment(id);

  const post = await getPost(postId);

  const commentsWithAuthor = await getPostCommentsWithAuthors(postId);

  return {
    error: null,
    res: {
      ...post,
      comments: commentsWithAuthor,
    },
  };
};
