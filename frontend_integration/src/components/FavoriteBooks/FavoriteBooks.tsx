import React, { useState, useEffect } from 'react';
import styles from './FavoriteBooks.module.css';
import StarRating from '../Rating/Rating';
import ReactCardFlip from 'react-card-flip';
import { fetchFavorites, deleteFavorite } from '../../services/api';
import heartFull from '../../assets/heartFull.svg';

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

interface FavoriteBooksProps {
    searchQuery: string;
    user_id: string;
}

const FavoriteBooks: React.FC<FavoriteBooksProps> = ({ searchQuery, user_id }) => {
    const [books, setBooks] = useState<Book[]>([]);
    const [flipStates, setFlipStates] = useState<boolean[]>([]);

    useEffect(() => {
        const getBooks = async () => {
            try {
                const data = await fetchFavorites(user_id);
                setBooks(data);
                setFlipStates(Array(data.length).fill(false));
            } catch (error) {
                console.error('Error fetching favorites:', error);
            }
        };
        getBooks();
    }, [user_id]);

    const handleFlip = (index: number) => {
        const newFlipStates = [...flipStates];
        newFlipStates[index] = !newFlipStates[index];
        setFlipStates(newFlipStates);
    };

    const handleRemoveFavorite = async (book_id: number) => {
        try {
            await deleteFavorite(user_id, book_id);
            setBooks(books.filter(book => book.book_id !== book_id));
        } catch (error) {
            console.error('Error removing favorite:', error);
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
                                    <p className={styles.author}>{book.author}</p>
                                    <p className={styles.year}>{Math.floor(parseFloat(book.published_year))}</p>
                                </div>
                            </div>
                            <button
                                className={styles.fav_button}
                                onClick={() => handleRemoveFavorite(book.book_id)}
                            >
                                <img src={heartFull} />
                            </button>
                        </div>
                        <ReactCardFlip
                            isFlipped={flipStates[index]}
                            flipDirection="horizontal"
                            infinite
                            flipSpeedFrontToBack={0.5}
                            flipSpeedBackToFront={0.5}
                        >
                            <div
                                className={styles.book_body_and_footer}
                                onClick={() => handleFlip(index)}
                            >
                                <img src={book.thumbnail} alt={book.title} className={styles.book_thumbnail} />
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
                            <div
                                className={styles.book_description_section}
                                onClick={() => handleFlip(index)}
                            >
                                <p className={styles.book_description}>{book.description}</p>
                            </div>
                        </ReactCardFlip>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default FavoriteBooks;
