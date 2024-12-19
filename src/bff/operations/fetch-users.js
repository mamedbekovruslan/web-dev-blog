import { getRoles, getUser } from '../api';
import { ROLE } from '../constants';
import { sessions } from '../sessions';

export const fetchUsers = async (userSession) => {
  const accessRoles = [ROLE.ADMIN];

  if (!sessions.access(userSession, accessRoles)) {
    return {
      error: 'Доступ запрещен',
      res: null,
    };
  }

  const users = await getRoles();

  return {
    error: null,
    res: users,
  };
};
