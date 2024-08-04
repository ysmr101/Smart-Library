import React, { useState, useEffect } from 'react';
import ClipLoader from 'react-spinners/ClipLoader';
import './App.css';
import BookCard from './components/BookCard/BookCard';
import NavBar from './components/NavBar/NavBar';
import LoginForm from './components/LoginForm/LoginForm';
import SignupForm from './components/SignupForm/SignupForm';
import Header from './components/Header/Header';
import AdminDashboard from './components/AdminDashboard/AdminDashboard';
import { useAuth } from './hooks/useAuth';
import ChatBot from './components/ChatBot/ChatBot';
import ProfileInfo from "./components/ProfileInfo/ProfileInfo";

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
  const [view, setView] = useState<'Home' | 'Admin' | 'Login' | 'Signup' | 'ProfileInfo'>('Home');

  const { login, getRole } = useAuth();

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

  const handleSearchChange = (query: string) => {
    setSearchQuery(query);
  };

  const handleLoginSuccess = (token: string, role: string) => {
    login(token, role);
    setView('Home');
  };

  const handleSignupSuccess = (token: string, role: string) => {
    login(token, role);
    setView('Home');
  };


  const getSortedBooks = (books: Book[]) => {
    switch (selectedFilter) {
      case 'Top rated':
        return [...books].sort((a, b) => b.rating - a.rating);
      case 'Least rated':
        return [...books].sort((a, b) => a.rating - b.rating);
      case 'Most recent publish year':
        return [...books].sort((a, b) => b.publish_year - a.publish_year);
      case 'Earliest publish year':
        return [...books].sort((a, b) => a.publish_year - b.publish_year);
      default:
        return books;
    }
  };

  const filteredBooks = getSortedBooks(
    books.filter((book) =>
      book.title.toLowerCase().includes(searchQuery.toLowerCase())
    )
  );

  return (
    <div className="bg-custom-bg h-screen flex flex-col relative">
      <Header
        onLoginClick={() => setView('Login')}
        onSignupClick={() => setView('Signup')}
        setView={setView}
      />
      {view === 'Login' ? (
        <div className="flex-grow flex items-center justify-center">
          <LoginForm onLoginSuccess={handleLoginSuccess} />
        </div>
      ) : view === 'Signup' ? (
        <div className="flex-grow flex items-center justify-center">
          <SignupForm onSignupSuccess={handleSignupSuccess} />
        </div>
      ) : view === 'ProfileInfo' ? (
        <div className="flex-grow flex items-center justify-center">
          <ProfileInfo />
        </div>
      ) : view === 'Admin' && getRole() === 'Admin' ? (
        <AdminDashboard />
      ) : (
        <>
          <NavBar
            onSearchChange={handleSearchChange}
            selectedFilter={selectedFilter}
            setSelectedFilter={setSelectedFilter}
          />
          <div className="flex-grow custom-scrollbar overflow-y-auto">
            {loading ? (
              <div className="spinner flex justify-center items-center h-full">
                <ClipLoader size={100} color={'#ffffff'} loading={loading} />
              </div>
            ) : (
              <div className="flex place-content-center mt-4">
                <div className="grid grid-cols-4 gap-4 w-11/12" id="book-list">
                  {filteredBooks.map((book) => (
                    <div key={book.id}>
                      <BookCard
                        thumbnail={book.thumbnail}
                        title={book.title}
                        author={book.author}
                        publish_year={book.publish_year}
                        genre={book.genre}
                        rating={book.rating}
                      />
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
          <ChatBot />
        </>
      )}
    </div>
  );
};

export default App;
