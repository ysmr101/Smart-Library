import React, { useState } from 'react';
import Favorite from '../../assets/Favorite.svg';
import FavoriteClicked from "../../assets/FavoriteClicked.svg";

interface BookCardProps {
  thumbnail: string;
  title: string;
  author: string;
  publish_year: number;
  genre: string;
  rating: number;
  index: number;
}

const BookCard: React.FC<BookCardProps> = ({ thumbnail, title, author, publish_year, genre, rating, index }) => {
  const [isFavorite, setIsFavorite] = useState(false);

  const handleFavoriteClick = () => {
    setIsFavorite(!isFavorite);
  };
  return (
    <div className="bg-custom-blue p-4 rounded-md shadow-lg flex flex-col justify-between h-full ">
      <div className="flex justify-between items-start">
        <div>
          <h2 className="text-white text-xl">{title}</h2>
        </div>

        <button onClick={handleFavoriteClick}>
          <img src={isFavorite ? FavoriteClicked : Favorite} alt="Favorite Icon" className="h-6 w-6 text-pink-500" />
        </button>
      </div>
      <div className="flex justify-between">
        <p className="text-gray-400 text-sm">{author}</p>
        <p className="text-gray-400 text-sm">{publish_year}</p>
      </div>
      <div className="flex-grow flex justify-center items-center">
        <img src={thumbnail} alt="Book Cover" className="w-4/6 h-5/6 rounded-lg object-cover" />
      </div>
      <div className="flex justify-between items-end">
        <p className="text-gray-400 text-sm">{genre}</p>
        <div className="flex items-center">
          <StarIcon rating={rating} index={index} />
          <span className="text-white ml-1">{rating}</span>
        </div>
      </div>
    </div>
  );
}

interface StarIconProps {
  rating: number;
  index: number;
}

const StarIcon: React.FC<StarIconProps> = ({ rating, index }) => {
  const fillPercentage = (rating / 5) * 100;

  const gradientId = `grad1_${index}`;

  return (
    <svg fill="#000000" width="24" height="24" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <linearGradient id={gradientId} x1="0%" y1="100%" x2="0%" y2="0%">
          <stop offset={`${fillPercentage}%`} stopColor="yellow" />
          <stop offset={`${fillPercentage}%`} stopColor="grey" />
        </linearGradient>
      </defs>
      <path d="M22,9.81a1,1,0,0,0-.83-.69l-5.7-.78L12.88,3.53a1,1,0,0,0-1.76,0L8.57,8.34l-5.7.78a1,1,0,0,0-.82.69,1,1,0,0,0,.28,1l4.09,3.73-1,5.24A1,1,0,0,0,6.88,20.9L12,18.38l5.12,2.52a1,1,0,0,0,.44.1,1,1,0,0,0,1-1.18l-1-5.24,4.09-3.73A1,1,0,0,0,22,9.81Z" fill={`url(#${gradientId})`} />
    </svg>
  );
};

export default BookCard;
