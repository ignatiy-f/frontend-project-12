import { BrowserRouter, Routes, Route, Outlet, Navigate } from 'react-router-dom';
import LoginPage from './components/pages/LoginPage';
import NotFoundPage from './components/pages/notFoundPage';
import MainPage from './components/pages/MainPage';

const PrivateRoute = () => {
  const isAuth = localStorage.getItem('userId');
  return (
    isAuth ? <Outlet /> : <Navigate to="login" />
  );
};

function App() {
  return (
    <BrowserRouter>
      <Routes>
      <Route element={<PrivateRoute />}>
        <Route path="/" element={<MainPage />} />
      </Route>
      <Route path="/login" element={<LoginPage />} />
      <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
