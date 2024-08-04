import React from 'react';
import { Routes, Route} from 'react-router-dom';
import { AuthProvider } from './utils/Auth';
import LoginPage from './pages/LoginPage/LoginPage';
import MainPage from './pages/MainPage/MainPage';
import AdminPage from './pages/AdminPage/AdminPage';
import ProtectedRoute from './utils/ProtectedRoute';

const App: React.FC = () => {
  return (
    <AuthProvider>
      <Routes>
          <Route path="/" element={<MainPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/adminPanel" element={<ProtectedRoute component={AdminPage}/>}/>
      </Routes>
    </AuthProvider>
  );
};

export default App;
