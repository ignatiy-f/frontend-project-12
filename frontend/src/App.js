import { BrowserRouter, Routes, Route } from 'react-router-dom';
import LoginPage from './components/pages/LoginPage';
import NotFoundPage from './components/pages/notFoundPage';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<LoginPage />} />
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
