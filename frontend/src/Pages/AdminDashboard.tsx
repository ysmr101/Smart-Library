import React, { useEffect, useState } from 'react';
import BooksSection from '../components/BooksSection/BooksSection';
import UsersSection from '../components/UsersSection/UsersSection';


interface Book {
  id: number;
  title: string;
  author: string;
  genre: string;
  author_id:number
  publish_year: number;
  description: string;
  rating: number;
  thumbnail: string;
}

const AdminDashboard: React.FC = () => {
  const [newBook, setNewBook] = useState<Partial<Book>>({
    title: '',
    genre: '',
    description: '',
    author_id: 3,
    publish_year: 0,
    rating: 0,
    author: '',

  });

  const [bookList, setBookList] = useState<Book[]>([]);

  useEffect(() => {
    fetch('http://127.0.0.1:8000/books/?start=0&limit=100')
      .then((response) => response.json())
      .then((data) => setBookList(data))
      .catch((error) => console.error('Error loading the books:', error));
  }, []);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setNewBook((prev) => ({
      ...prev,
      [name]: name === 'rating' || name === 'author_id' || name === 'publish_year' ? Number(value) : value,
    }));
  };

  const handleAddBook = async () => {
    if (!newBook.title || !newBook.genre || !newBook.description || !newBook.author || !newBook.publish_year || !newBook.thumbnail) {
      alert('Please fill in all the fields');
      return;
    }

    try {
      const response = await fetch('http://127.0.0.1:8000/books/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
        body: JSON.stringify(newBook),
      });

      if (!response.ok) {
        throw new Error('Failed to add book');
      }

      const addedBook = await response.json();
      setBookList((prevBooks) => [...prevBooks, addedBook]);
      setNewBook({ title: '', genre: '', description: '', publish_year: 0, rating: 0, author: '', thumbnail: '',author_id: 3 });
      alert('Book added successfully!');
    } catch (error) {
      console.error('Error adding book:', error);
      alert('There was an error adding the book. Please try again.');
    }
  };

  return (
    <div className="bg-custom-bg min-h-screen text-white flex flex-col items-center p-4">
      <h1 className="text-2xl font-work-sans mb-4">Admin Panel</h1>
      <div className="flex flex-row w-full max-w-6xl space-x-4">
        <BooksSection
          books={bookList}
          newBook={newBook}
          handleInputChange={handleInputChange}
          handleAddBook={handleAddBook}
        />
        <UsersSection />
      </div>
    </div>
  );
};

export default AdminDashboard;
