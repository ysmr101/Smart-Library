import React from 'react';
import { Routes, Route} from 'react-router-dom';
import { AuthProvider } from './utils/Auth';
import LoginPage from './pages/LoginPage/LoginPage';
import MainPage from './pages/MainPage/MainPage';
import AdminPage from './pages/AdminPage/AdminPage';
import AdminProtectedRoute from './utils/AdminProtectedRoute';
import ProtectedRoute from './utils/ProtectedRoute';
import UnAuthinticatedRoute from './utils/UnAuthinticatedRoute';
import FavoritePage from './pages/FavoritePage/FavoritePage';

const App: React.FC = () => {
  return (
    <AuthProvider>
      <Routes>
          <Route path="/" element={<MainPage />} />
          <Route path="/login" element={<UnAuthinticatedRoute component={LoginPage} />} />
          <Route path="/adminPanel" element={<AdminProtectedRoute component={AdminPage}/>}/>
          <Route path="/favorites" element={<ProtectedRoute component={FavoritePage}/>}/>
      </Routes>
    </AuthProvider>
  );
};

export default App;
