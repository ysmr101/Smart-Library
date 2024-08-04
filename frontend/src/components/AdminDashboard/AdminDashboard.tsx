import React, { useEffect, useState } from 'react';
import Profile from '../../assets/Profile.svg';
interface Book {
  id: number;
  title: string;
  author: string;
  genre:string;
  publish_year: number;
  description: string;
  rating: number;
}

const AdminDashboard: React.FC = () => {
  const [newBook, setNewBook] = useState({
    title: '',
    genre: '',
    description: '',
    author_id: 3,
    publish_year: '',
    rating: 0,
    author: '',
    thumbnail:'',
  });
  const [bookList, setBookList] = useState<Book[]>([]);


  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setNewBook((prev) => ({
      ...prev,
      [name]: name === 'rating' || name === 'author_id' ? Number(value) : value,
    }));
  };

  useEffect(() => {
    fetch('http://127.0.0.1:8000/books/?start=0&limit=100')
      .then((response) => response.json())
      .then((data) => {
        setBookList(data);
      })
      .catch((error) => {
        console.error('Error loading the books:', error);
      });
  }, []);

  const handleAddBook = async () => {
    if (
      !newBook.title ||
      !newBook.genre ||
      !newBook.description ||
      !newBook.author ||
      !newBook.publish_year ||
      !newBook.thumbnail
    ) {
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

      // Update the book list with the newly added book
      setBookList((prevBooks) => [...prevBooks, addedBook]);

      // Clear the form
      setNewBook({
        title: '',
        genre: '',
        description: '',
        author_id: 0,
        publish_year: '',
        rating: 0,
        author: '',
        thumbnail: '',
      });

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

const BooksSection: React.FC<{
  books: Book[];
  newBook: any;
  handleInputChange: any;
  handleAddBook: any;
}> = ({ books, newBook, handleInputChange, handleAddBook }) => {
  return (
    <div className="bg-custom-blue rounded-lg p-4 flex-grow overflow-y-auto custom-scrollbar" style={{ height: '80vh' }}>
      <h2 className="text-lg font-semibold mb-2">Books</h2>
      <table className="w-full table-auto text-left">
        <thead>
          <tr className="text-sm text-gray-300 border-b border-gray-700">
            <th className="py-2 px-3">Title</th>
            <th className="py-2 px-3">Author</th>
            <th className="py-2 px-3">Genre</th>
            <th className="py-2 px-3">Publish Year</th>
            <th className="py-2 px-3">Description</th>
            <th className="py-2 px-3">Rating</th>
          </tr>
        </thead>
        <tbody>
          {books.map((book) => (
            <tr key={book.id} className="border-b border-gray-700">
              <td className="py-2 px-3">{book.title}</td>
              <td className="py-2 px-3">{book.author}</td>
              <td className="py-2 px-3">{book.genre || newBook.genre}</td>
              <td className="py-2 px-3">{book.publish_year}</td>
              <td className="py-2 px-3">{book.description}</td>
              <td className="py-2 px-3">{book.rating}</td>
            </tr>
          ))}
          <tr className="border-b border-gray-700">
            <td className="py-2 px-3">
              <input
                  type="text"
                  name="title"
                  placeholder="Title"
                  value={newBook.title}
                  onChange={handleInputChange}
                  className="bg-gray-700 text-white w-full px-2 py-1 rounded"
              />
            </td>
            <td className="py-2 px-3">
              <input
                  type="text"
                  name="author"
                  placeholder="Author"
                  value={newBook.author}
                  onChange={handleInputChange}
                  className="bg-gray-700 text-white w-full px-2 py-1 rounded"
              />
            </td>
            <td className="py-2 px-3">
              <input
                  type="text"
                  name="genre"
                  placeholder="Genre"
                  value={newBook.genre}
                  onChange={handleInputChange}
                  className="bg-gray-700 text-white w-full px-2 py-1 rounded"
              />
            </td>
            <td className="py-2 px-3">
              <input
                  type="text"
                  name="publish_year"
                  placeholder="Year"
                  value={newBook.publish_year}
                  onChange={handleInputChange}
                  className="bg-gray-700 text-white w-full px-2 py-1 rounded"
              />
            </td>
            <td className="py-2 px-3">
              <input
                  type="text"
                  name="description"
                  placeholder="Description"
                  value={newBook.description}
                  onChange={handleInputChange}
                  className="bg-gray-700 text-white w-full px-2 py-1 rounded"
              />
            </td>
            <td className="py-2 px-3">
              <input
                  type="number"
                  name="rating"
                  placeholder="Rating"
                  value={newBook.rating}
                  onChange={handleInputChange}
                  className="bg-gray-700 text-white w-full px-2 py-1 rounded"
              />
            </td>
            <td className="py-2 px-3">
              <input
                  type="text"
                  name="thumbnail"
                  placeholder="Thumbnail"
                  value={newBook.thumbnail}
                  onChange={handleInputChange}
                  className="bg-gray-700 text-white w-full px-2 py-1 rounded"
              />
            </td>
            <td className="py-2 px-3 text-center">
              <button
                  onClick={handleAddBook}
                  className="text-blue-500 hover:text-blue-700 text-lg"
              >
                +
              </button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  );
};

const UsersSection: React.FC = () => {
  interface User {
  user_id: string;
  role:string;
  username:string

}
  const [users, setUsers] = useState<User[]>([]);
useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await fetch('http://127.0.0.1:8000/users/', {
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${localStorage.getItem('token')}`,
          },
        });

        if (!response.ok) {
          throw new Error('Failed to fetch users');
        }

        const data = await response.json();
        setUsers(data);
      } catch (error) {
        console.error('Error fetching the users:', error);
      }
    };

    fetchUsers();
  }, []);
  return (
      <div className="bg-custom-blue rounded-lg p-4 flex-grow h-96 w-full overflow-y-auto custom-scrollbar">
      <h2 className="text-lg font-semibold mb-2">Users</h2>
      <div className="space-y-2">
        {users.map((user) => (
          <div
            key={user.user_id}
            className="flex items-center justify-between bg-custom-blue rounded-md px-3 py-2"
          >
            <span className="flex items-center">
               <img src={Profile} alt="Profile Icon"/>
              <span className="text-sm">{user.username}</span>
            </span>
            <span className="flex items-center">
              <span className="text-sm mr-2">{user.role}</span>
            </span>
          </div>
        ))}
        <div className="flex items-center justify-between bg-gray-900 rounded-md px-3 py-2">
          <input
            type="text"
            placeholder="Enter username"
            className="bg-gray-800 text-white placeholder-gray-500 px-2 py-1 text-sm rounded-md w-full mr-2"
          />
          <button className="bg-blue-600 hover:bg-blue-700 text-sm px-2 py-1 rounded-md">
            Add User
          </button>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
