import { useEffect } from 'react';
import { useDispatch, useStore } from 'react-redux';

export const useResetForm = (reset) => {
  const store = useStore();
  const dispatch = useDispatch();

  useEffect(() => {
    let currentWasLogout = store.getState().app.wasLogout;

    return store.subscribe(() => {
      let previousWasLogout = currentWasLogout;
      currentWasLogout = store.getState().app.wasLogout;

      if (currentWasLogout !== previousWasLogout) {
        reset();
      }
    });
  }, [reset, store]);
};
