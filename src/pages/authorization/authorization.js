import { useForm } from 'react-hook-form';
import { useDispatch, useStore } from 'react-redux';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { server } from '../../bff';
import { useEffect, useState } from 'react';
import { Button, H2, Input } from '../../components';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import { setUser } from '../../actions';

const authFormSchema = yup.object().shape({
  login: yup
    .string()
    .required('Заполните логин')
    .matches(/^\w+$/, 'Неверно заполнен логин. Допускаются только буквы или цифры')
    .min(3, 'Неверно заполнен логин. Минимум 3 символа')
    .max(15, 'Неверно заполнен логин. Максимум 15 символов'),
  password: yup
    .string()
    .required('Заполните пароль')
    .matches(
      /^\w+$/,
      'Неверно заполнен пароль. Допускаются только буквы, цифры и знаки # %',
    )
    .min(6, 'Неверно заполнен пароль. Минимум 6 символа')
    .max(30, 'Неверно заполнен пароль. Максимум 30 символов'),
});

const StyledLink = styled(Link)`
  text-align: center;
  text-decoration: underline;
  margin: 20px 0;
  font-size: 18px;
`;

const ErrorMessage = styled.div`
  margin: 10px 0 0;
  padding: 10px;
  font-size: 10px;
  background-color: #fcadad;
`;

export const AuthorizationContainer = ({ className }) => {
  const {
    register,
    reset,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      login: '',
      password: '',
    },
    resolver: yupResolver(authFormSchema),
  });

  const [serverError, setServerError] = useState(null);

  const dispatch = useDispatch();

  const store = useStore();

  useEffect(() => {
    let currentWasLogout = store.getState().app.wasLogout;

    return store.subscribe(() => {
      let previousWasLogout = currentWasLogout;
      currentWasLogout = store.getState().app.wasLogout;

      if (currentWasLogout !== previousWasLogout) {
        reset();
      }
    });
  }, []);

  const onSubmit = async ({ login, password }) => {
    server.authorize(login, password).then(({ error, res }) => {
      if (error) {
        setServerError(`Ошибка запроса: ${error}`);
        return;
      }

      dispatch(setUser(res));
    });
  };

  const formError = errors?.login?.message || errors?.password?.message;
  const errorMessage = formError || serverError;

  return (
    <div className={className}>
      <H2>Авторизация</H2>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Input
          type="text"
          placeholder="Логин..."
          {...register('login', {
            onChange: () => setServerError(null),
          })}
        />
        <Input type="password" placeholder="Пароль..." {...register('password')} />
        <Button type="submit" disabled={!!formError}>
          Авторизация
        </Button>
        {errorMessage && <ErrorMessage>{errorMessage}</ErrorMessage>}
        <StyledLink to="/register">Регистрация</StyledLink>
      </form>
    </div>
  );
};

export const Authorization = styled(AuthorizationContainer)`
  display: flex;
  align-items: center;
  flex-direction: column;

  & > form {
    display: flex;
    flex-direction: column;
    width: 260px;
  }
`;
