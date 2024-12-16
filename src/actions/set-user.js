import { ACTION_TYPE } from './action-types';

export const setUser = (user) => {
  console.log(user);
  return {
    type: ACTION_TYPE.SET_USER,
    payload: user,
  };
};
