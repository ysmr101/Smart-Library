// src/pages/BookListPage.tsx

import React, { useState, useEffect } from 'react';
import BookCard from '../components/BookCard/BookCard';
import NavBar from '../components/NavBar/NavBar';
import ClipLoader from 'react-spinners/ClipLoader';

interface Book {
  id: number;
  thumbnail: string;
  title: string;
  author: string;
  publish_year: number;
  description: string;
  rating: number;
}

const BookListPage: React.FC = () => {
  const [books, setBooks] = useState<Book[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedFilter, setSelectedFilter] = useState('');

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
    <div className="flex-grow custom-scrollbar overflow-y-auto">
      <NavBar onSearchChange={setSearchQuery} selectedFilter={selectedFilter} setSelectedFilter={setSelectedFilter} />
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
                  genre={'Fiction'}
                  rating={book.rating}
                />
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default BookListPage;
