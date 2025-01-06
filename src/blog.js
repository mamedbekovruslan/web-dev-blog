import { Route, Routes } from 'react-router-dom';
import { Header, Footer, Modal } from './components';
import { Authorization, Registration, Post, Users, Main } from './pages';
import styled from 'styled-components';
import { useLayoutEffect } from 'react';
import { setUser } from './actions';
import { useDispatch } from 'react-redux';

const AppColumn = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  position: relative;
  width: 1000px;
  min-height: 100%;
  margin: 0 auto;
  background-color: #fff;
`;

const Page = styled.div`
  padding: 120px 0 20px;
`;

export const Blog = () => {
  const dispatch = useDispatch();

  useLayoutEffect(() => {
    const currentUserDataJSON = sessionStorage.getItem('userData');

    if (!currentUserDataJSON) {
      return;
    }

    const currentUserData = JSON.parse(currentUserDataJSON);

    dispatch(
      setUser({
        ...currentUserData,
        roleId: Number(currentUserData.roleId),
      }),
    );
  }, [dispatch]);

  return (
    <AppColumn>
      <Header />
      <Page>
        <Routes>
          <Route path="/" element={<Main />} />
          <Route path="/login" element={<Authorization />} />
          <Route path="/register" element={<Registration />} />
          <Route path="/users" element={<Users />} />
          <Route path="/post" element={<Post />} />
          <Route path="/post/:id" element={<Post />} />
          <Route path="/post/:id/edit" element={<Post />} />
          <Route path="*" element={<div>Ошибка</div>} />
        </Routes>
      </Page>
      <Footer />
      <Modal />
    </AppColumn>
  );
};
