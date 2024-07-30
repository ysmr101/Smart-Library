import React, { useState, useEffect } from 'react';
import Books from './components/books';
import './App.css';

const App = () => {
    const [books, setBooks] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchBooks = async () => {
            let allBooks = [];
            let start = 0;
            const limit = 100;

            try {
                while (start <= 4900) {
                    const response = await fetch(`http://localhost:8000/books/?start=${start}&limit=${limit}`);
                    if (!response.ok) {
                        throw new Error('Network response was not ok');
                    }
                    const data = await response.json();
                    if (data.length === 0) break;
                    allBooks = allBooks.concat(data);
                    start += limit;
                }
                setBooks(allBooks);
            } catch (error) {
                setError(error.message);
            }
        };

        fetchBooks();
    }, []);

    const booksPerPage = 20;
    const totalPages = Math.ceil(books.length / booksPerPage);

    const currentBooks = books.slice(
        (currentPage - 1) * booksPerPage,
        currentPage * booksPerPage
    );

    const handlePageChange = (page) => {
        setCurrentPage(page);
    };

    return (
        <div className="App">
            <div className="container">
                <h1 className="title">Smart Library</h1>
                <form onSubmit={(e) => { e.preventDefault(); window.location.reload(); }} className="search-form">
                    <input 
                        type="text" 
                        placeholder="Search for a book..." 
                    />
                    <button type="submit">Submit</button>
                </form>
                {error && <p>Error: {error}</p>}
            </div>
            <Books books={currentBooks} />
            <div className="pagination">
                <button onClick={() => handlePageChange(1)} disabled={currentPage === 1}>
                    &lt;&lt; First
                </button>
                <button onClick={() => handlePageChange(currentPage - 1)} disabled={currentPage === 1}>
                    &lt; Prev
                </button>
                {Array.from({ length: Math.min(6, totalPages - currentPage + 1) }, (_, index) => (
                    <button
                        key={currentPage + index}
                        onClick={() => handlePageChange(currentPage + index)}
                        className={currentPage === currentPage + index ? 'active' : ''}
                    >
                        {currentPage + index}
                    </button>
                ))}
                <button onClick={() => handlePageChange(currentPage + 1)} disabled={currentPage === totalPages}>
                    Next &gt;
                </button>
                <button onClick={() => handlePageChange(totalPages)} disabled={currentPage === totalPages}>
                    Last &gt;&gt;
                </button>
            </div>
        </div>
    );
};

export default App;
