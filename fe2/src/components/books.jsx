import React from 'react';

const Books = ({ books }) => {
    return (
        <div className="gallery">
            {books.map((book, index) => (
                <div className="book" key={index} style={{ backgroundColor: getBackgroundColor(index) }}>
                    <img src={book.thumbnail} alt={book.title} />
                    <h3>{book.title}</h3>
                </div>
            ))}
        </div>
    );
};

const getBackgroundColor = (index) => {
    const colors = ['#FFCDD2', '#E1BEE7', '#C5CAE9', '#B3E5FC', '#C8E6C9', '#FFECB3', '#FFAB91', '#D7CCC8'];
    return colors[index % colors.length];
};

export default Books;
