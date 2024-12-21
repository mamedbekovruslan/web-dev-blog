export const deleteUser = async (userId) =>
  fetch(`http://localhost:3005/users/${userId}`, {
    method: 'DELETE',
  });
