import React from 'react';
import '../BookCard.css';

function BookCard({ thumbnail, title }) {
  return (
    <div className="card">
      <img src={thumbnail}  alt="cover" className="img" />
      <p>{title}</p>
    </div>
  );
}

export default BookCard;
