import { generateDate } from '../utils';

export const addComment = async (userId, postId, content) =>
  fetch('http://localhost:3005/comments', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      author_id: userId,
      post_id: postId,
      register_at: generateDate(),
      content,
    }),
  });
