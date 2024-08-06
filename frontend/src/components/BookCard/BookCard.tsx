import React, {useState} from 'react';
import Favorite from '../../assets/Favorite.svg';
import Star from '../../assets/Star.svg';
import FavoriteClicked from "../../assets/FavoriteClicked.svg";

interface BookCardProps {
  thumbnail: string;
  title: string;
  author: string;
  publish_year: number;
  genre: string;
  rating: number;
}

const BookCard: React.FC<BookCardProps> = ({ thumbnail, title, author, publish_year, genre, rating }) => {
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
                  <img src={isFavorite ? FavoriteClicked : Favorite} alt="Favorite Icon" className="h-6 w-6 text-pink-500"/>
              </button>

          </div>
          <div className="flex justify-between">
              <p className="text-gray-400 text-sm">{author}</p>
              <p className="text-gray-400 text-sm">{publish_year}</p>
          </div>
          <div className="flex-grow flex justify-center items-center">
              <img src={thumbnail} alt="Book Cover" className="w-4/6 h-5/6 rounded-lg object-cover"/>
          </div>
          <div className="flex justify-between items-end">
              <p className="text-gray-400 text-sm">{genre}</p>
              <div className="flex items-center">
                  <img src={Star} alt="Star Icon" className="h-6 w-6 text-yellow-500"/>
                  <span className="text-white ml-1">{rating}</span>
              </div>
          </div>
      </div>
  );
}

export default BookCard;
