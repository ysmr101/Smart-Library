import React, { useState } from 'react';
import BookCard from '../components/BookCard/BookCard';
import NavBar from '../components/NavBar/NavBar';
import ClipLoader from 'react-spinners/ClipLoader';
import ChatBot from '../components/ChatBot/ChatBot';
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
const Home: React.FC<{ books: Book[]; loading: boolean; searchQuery: string; setSearchQuery: any; selectedFilter: string; setSelectedFilter: any; }> = ({ books, loading, searchQuery, setSearchQuery, selectedFilter, setSelectedFilter }) => {

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
    <>
      <NavBar onSearchChange={setSearchQuery} selectedFilter={selectedFilter} setSelectedFilter={setSelectedFilter} />
      <div className="flex-grow custom-scrollbar overflow-y-auto">
        {loading ? (
          <div className="spinner flex justify-center items-center h-full">
            <ClipLoader size={100} color={'#ffffff'} loading={loading} />
          </div>
        ) : (
          <div className="flex place-content-center mt-4">
            <div className="grid grid-cols-4 gap-4 w-11/12" id="book-list">
              {filteredBooks.map((book,index) => (
                <div key={book.id}>
                  <BookCard
                    thumbnail={book.thumbnail}
                    title={book.title}
                    author={book.author}
                    publish_year={book.publish_year}
                    genre={book.genre}
                    rating={book.rating}
                    index={index}
                  />
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
      <ChatBot />
    </>
  );
};

export default Home;
