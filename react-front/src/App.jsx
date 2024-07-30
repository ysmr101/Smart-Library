import React, { useState, useEffect } from 'react';
import ClipLoader from 'react-spinners/ClipLoader';
import './App.css';
import Search from './components/Search';
import BookCard from './components/BookCard';

function App() {
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('http://127.0.0.1:8000/books/?start=0&limit=100')
      .then(response => response.json())
      .then(data => {
        setBooks(data);
        setLoading(false);
      })
      .catch(error => {
        console.error('Error loading the books:', error);
        setLoading(false);
      });
  }, []);

  return (
    <div className="App">
      <div className="container">
        <h1>Welcome to The Smart Library</h1>
      </div>
      <div className="container">
        <Search />
      </div>
      {loading ? (
        <div className="spinner">
          <ClipLoader size={100} color={"#090000"} loading={loading} />
        </div>
      ) : (
        <div className="row" id="book-list">
          {books.map(book => (
            <div className="column" key={book.id}>
              <BookCard thumbnail={book.thumbnail} title={book.title} />
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default App;
