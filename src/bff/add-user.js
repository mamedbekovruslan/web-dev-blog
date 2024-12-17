import { generateDate } from './generate-date';

export const addUser = async (login, password) =>
  fetch('http://localhost:3005/users', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      login,
      password,
      register_at: generateDate(),
      role_id: 2,
    }),
  }).then((createdUser) => createdUser.json());
