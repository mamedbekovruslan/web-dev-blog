import { useForm } from 'react-hook-form';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { server } from '../../bff';
import { useState } from 'react';
import { Button, Input } from '../../components';
import styled from 'styled-components';
import { Link } from 'react-router-dom';

const authFormSchema = yup.object().shape({
  login: yup
    .string()
    .required('Заполните логин')
    .matches('/^\w+$/', 'Неверный заполнен логин. Допускаются только буквы или цифры')
    .min(3, 'Неверный заполнен логин. Минимум 3 символа')
    .max(15, 'Неверный заполнен логин. Максимум 15 символов'),
  password: yup
    .string()
    .required('Заполните пароль')
    .matches(
      '/^\w+$/',
      'Неверный заполнен пароль. Допускаются только буквы, цифры и знаки # %',
    )
    .min(6, 'Неверный заполнен пароль. Минимум 6 символа')
    .max(30, 'Неверный заполнен пароль. Максимум 30 символов'),
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
    handleSubmit,
    formState: { error },
  } = useForm({
    defaultValues: {
      login: '',
      password: '',
    },
    resolver: yupResolver(authFormSchema),
  });

  const [serverError, setServerError] = useState(null);

  const onSubmit = ({ login, password }) => {
    server.authorize(login, password).then((error, res) => {
      if (error) {
        setServerError(`Ошибка запроса: ${error}`);
      }
    });
  };

  const formError = error?.login?.message || error?.password?.message;
  const errorMessage = formError || serverError;

  return (
    <div className={className}>
      <h2>Авторизация</h2>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Input type="text" placeholder="Логин..." {...register('login')} />
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
