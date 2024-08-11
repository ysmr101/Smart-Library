
import React, { useState, useEffect } from 'react';
import {BrowserRouter as Router, Navigate, Route, Routes} from 'react-router-dom';
import './App.css';
import Home from './Pages/Home';
import AdminDashboard from './Pages/AdminDashboard';
import Signup from './Pages/Signup';
import Login from './Pages/Login';
import ProfileInfo from './Pages/ProfileInfo';
import Header from './components/Header/Header';
import { useAuth } from './hooks/useAuth';
import ProtectedRoute from './hooks/ProtectedRoute';
import AuthUsersRoute from './hooks/AuthUsersRoute';

interface Book {
  id: number;
  thumbnail: string;
  title: string;
  author: string;
  publish_year: number;
  description: string;
  rating: number;
  genre: string;
}

const App: React.FC = () => {
  const [books, setBooks] = useState<Book[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedFilter, setSelectedFilter] = useState('');
  const { login, authData } = useAuth();

  useEffect(() => {
    fetch('http://127.0.0.1:8000/books/?start=0&limit=100')
      .then((response) => response.json())
      .then((data) => {
        setBooks(data);
        setLoading(false);
      })
      .catch((error) => {
        console.error('Error loading the books:', error);
        setLoading(false);
      });
  }, []);

  return (
    <Router>
      <div className="bg-custom-bg h-screen flex flex-col relative">
        <Header />
        <Routes>
          <Route path="/" element={<Home books={books} loading={loading} searchQuery={searchQuery} setSearchQuery={setSearchQuery} selectedFilter={selectedFilter} setSelectedFilter={setSelectedFilter} />} />


          <Route
            path="/admin"
            element={
              <ProtectedRoute requiredRole="Admin">
                <AdminDashboard />
              </ProtectedRoute>
            }
          />


          <Route
            path="/profile"
            element={
              <ProtectedRoute>
                <ProfileInfo />
              </ProtectedRoute>
            }
          />


          <Route path="/login" element={<AuthUsersRoute><Login onLoginSuccess={(token) => login(token)} /></AuthUsersRoute>} />
          <Route path="/signup" element={<AuthUsersRoute><Signup onSignupSuccess={(token) => login(token)} /></AuthUsersRoute>} />
          <Route path="*" element={<Navigate to="/" />} />
        </Routes>

      </div>

    </Router>
  );
};

export default App;

