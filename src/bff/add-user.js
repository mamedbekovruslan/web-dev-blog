import { generateDate } from './generate-date';

export const addUser = async (regLogin, regPassword) =>
  await fetch('http:localhost:3005/users', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      login: regLogin,
      regPassword: regPassword,
      register_at: generateDate(),
      role_id: 2,
    }),
  });
