import React, { useEffect } from 'react';
import { BrowserRouter, Routes, Route, Outlet, Navigate } from 'react-router-dom';
import LoginPage from './components/pages/LoginPage';
import NotFoundPage from './components/pages/notFoundPage';
import MainPage from './components/pages/MainPage';
import RegisterPage from './components/pages/RegisterPage';
import socket from './socket';
import { useDispatch } from 'react-redux';
import { actions as channelsActions } from './slices/channelsSlice';
import { actions as messagesActions } from './slices/messagesSlice';

const PrivateRoute = () => {
  const isAuth = localStorage.getItem('userId');
  return (
    isAuth ? <Outlet /> : <Navigate to="login" />
  );
};

function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    socket.on('newMessage', (payload) => {
      dispatch(messagesActions.addMessage(payload));
    });
    socket.on('newChannel', (payload) => {
      dispatch(channelsActions.addChannel(payload));
    });
    socket.on('renameChannel', (payload) => {
      dispatch(channelsActions.renameChannel(payload));
    });
    socket.on('removeChannel', (payload) => {
      dispatch(channelsActions.removeChannel(payload));
    });
  }, [dispatch]);

  return (
    <BrowserRouter>
      <Routes>
      <Route element={<PrivateRoute />}>
        <Route path="/" element={<MainPage />} />
      </Route>
      <Route path="/login" element={<LoginPage />} />
      <Route path="/signup" element={<RegisterPage />} />
      <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
