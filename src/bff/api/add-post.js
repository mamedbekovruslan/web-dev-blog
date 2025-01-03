import { generateDate } from '../utils';

export const addPost = async ({ imageUrl, title, content }) =>
  fetch('http://localhost:3005/posts', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      image_url: imageUrl,
      published_at: generateDate(),
      title,
      content,
    }),
  }).then((createdPost) => createdPost.json());
