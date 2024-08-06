import React from 'react';

interface Book {
  id: number;
  title: string;
  author: string;
  genre: string;
  publish_year: number;
  description: string;
  rating: number;
  thumbnail: string;
}

interface BooksSectionProps {
  books: Book[];
  newBook: Partial<Book>;
  handleInputChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
  handleAddBook: () => void;
}

const BooksSection: React.FC<BooksSectionProps> = ({ books, newBook, handleInputChange, handleAddBook }) => {
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
            <th className="py-2 px-3"></th>
          </tr>
        </thead>
        <tbody>
          {books.map((book) => (
            <tr key={book.id} className="border-b border-gray-700">
              <td className="py-2 px-3">{book.title}</td>
              <td className="py-2 px-3">{book.author}</td>
              <td className="py-2 px-3">{book.genre}</td>
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
                type="number"
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

export default BooksSection;
