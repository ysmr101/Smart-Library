import React, { useEffect, useState } from 'react';
import styles from './Books.module.css';
import StarRating from '../Rating/Rating';
import ReactCardFlip from 'react-card-flip';
import { fetchBooks, fetchFavorites, addFavorite, deleteFavorite } from '../../services/api';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../utils/Auth';
import heartFull from '../../assets/heartFull.svg';
import heartEmpty from '../../assets/heartEmpty.svg';

interface Book {
    book_id: number
    thumbnail: string;
    title: string;
    published_year: string;
    genre: string;
    description: string;
    average_rating: string;
    author: string;
}

interface BooksProps {
    searchQuery: string;
    sortBy: string;
    genre: string;
}

const Books: React.FC<BooksProps> = ({ searchQuery, sortBy, genre }) => {
    const { getUserInfo, token } = useAuth();
    const userInfo = getUserInfo();
    const [books, setBooks] = useState<Book[]>([]);
    const [favoriteBooks, setFavoriteBooks] = useState<{ [key: number]: boolean }>({});
    const [flipStates, setFlipStates] = useState<boolean[]>([]);
    const navigate = useNavigate();
    const isAuthenticated = !!token;

    useEffect(() => {
        const getBooks = async () => {
            try {
                const data = await fetchBooks(sortBy, genre);
                setBooks(data);
                setFlipStates(Array(data.length).fill(false));

                if (isAuthenticated && userInfo) {
                    const favorites = await fetchFavorites(userInfo.user_id);
                    const favoriteStatus = favorites.reduce((acc, book) => {
                        acc[book.book_id] = true;
                        return acc;
                    }, {} as { [key: number]: boolean });
                    setFavoriteBooks(favoriteStatus);
                }
            } catch (error) {
                console.error('Error fetching books:', error);
            }
        };
        getBooks();
    }, [sortBy, genre, isAuthenticated]);

    const handleFlip = (index: number) => {
        const newFlipStates = [...flipStates];
        newFlipStates[index] = !newFlipStates[index];
        setFlipStates(newFlipStates);
    };

    const handleFavoriteToggle = async (book: Book) => {
        if (!isAuthenticated) {
            navigate('/login');
            return;
        }
        
        if (userInfo) {
            try {
                if (favoriteBooks[book.book_id]) {
                    await deleteFavorite(userInfo.user_id, book.book_id);
                    setFavoriteBooks(prevState => ({
                        ...prevState,
                        [book.book_id]: false,
                    }));
                } else {
                    await addFavorite(userInfo.user_id, book.book_id);
                    setFavoriteBooks(prevState => ({
                        ...prevState,
                        [book.book_id]: true,
                    }));
                }
            } catch (error) {
                console.error('Error updating favorite status:', error);
            }
        }
    };

    const filteredBooks = books.filter(book =>
        book.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        book.genre.toLowerCase().includes(searchQuery.toLowerCase()) ||
        book.author.toLowerCase().includes(searchQuery.toLowerCase())
    );

    return (
        <div>
            <div className={styles.gallery}>
                {filteredBooks.map((book, index) => (
                    <div className={styles.book} key={book.book_id}>
                        <div className={styles.book_header}>
                            <div className={styles.book_header_texts}>
                                <h1 className={styles.book_title}>
                                    {book.title.length > 19 ? book.title.slice(0, 19) + '...' : book.title}
                                </h1>
                                <div className={styles.book_header_author_and_year}>
                                    <p className={styles.author}>
                                        {book.author}
                                    </p>
                                    <p className={styles.year}>
                                        {Math.floor(parseFloat(book.published_year))}
                                    </p>
                                </div>
                            </div>
                            <button
                                className={styles.fav_button}
                                onClick={() => handleFavoriteToggle(book)}
                            >
                                <img src={favoriteBooks[book.book_id] ? heartFull : heartEmpty} />
                            </button>
                        </div>

                            <div className={styles.book_body_and_footer} onClick={() => handleFlip(index)}>
                                <ReactCardFlip
                                isFlipped={flipStates[index]}
                                flipDirection="horizontal"
                                infinite
                                flipSpeedFrontToBack={0.5}
                                flipSpeedBackToFront={0.5}
                                >
                                <img src={book.thumbnail} alt={book.title} className={styles.book_thumbnail} />
                                <div className={styles.book_description_section}>
                                    <p className={styles.book_description}>{book.description}</p>
                                </div>
                                
                                </ReactCardFlip>
                                <div className={styles.book_footer}>
                                    <p className={styles.genre}>{book.genre}</p>
                                    <div className={styles.rating}>
                                        <div className={styles.rating_star}>
                                            <StarRating rating={parseFloat(book.average_rating)} />
                                        </div>
                                        <p className={styles.rating_number}>
                                            {Math.floor(parseFloat(book.average_rating)).toString()}
                                        </p>
                                    </div>
                                </div>
                            </div>
                            
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Books;
