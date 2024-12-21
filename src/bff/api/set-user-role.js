export const setUserRole = async (userId, roleId) =>
  fetch(`http://localhost:3005/users/${userId}`, {
    method: 'PATCH',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      role_id: roleId,
    }),
  });
