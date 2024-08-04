import React, {useState, useEffect} from 'react';
import styles from './Books.module.css';
import StarRating from '../Rating/Rating';
import ReactCardFlip from "react-card-flip";
import { fetchBooks } from '../../services/api';
import Authors from '../Authors/Authors';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../utils/Auth';
import heartFull from '../../assets/heartFull.svg'
import heartEmpty from '../../assets/heartEmpty.svg'

interface Book {
    thumbnail: string;
    title: string;
    author_id: number;
    published_year: number;
    genre: string;
    description: string;
    average_rating: string;
    author: string;
}

interface BooksProps {
    searchQuery: string;
  }

const Books: React.FC<BooksProps> = ({ searchQuery }) => {
    const { getUserInfo, token } = useAuth();
    // const userInfo = getUserInfo();
    const [books, setBooks] = useState<Book[]>([]);
    const [favoriteBooks, setFavoriteBooks] = useState<{ [key: number]: boolean }>({});
    const [flipStates, setFlipStates] = useState<boolean[]>(Array(books.length).fill(false));
    const navigate = useNavigate();
    const isAuthenticated = !!token;

    useEffect(() => {
        const getBooks = async () => {
            try {
                const data = await fetchBooks();
                setBooks(data);
                setFavoriteBooks(data.reduce((acc, book, index) => {
                    acc[index] = false; // Initially, no book is marked as favorite
                    return acc;
                  }, {} as { [key: number]: boolean }));
          
            } catch (error) {
                console.error('Error fetching books:', error);
            }
        };
        getBooks();
    }, []);

    const handleFlip = (index: number) => {
        const newFlipStates = [...flipStates];
        newFlipStates[index] = !newFlipStates[index];
        setFlipStates(newFlipStates);
    };
    
    const handleNotLogged = () => {
      navigate('/login');
    };

    const handleFavoriteToggle = (index: number) => {
        setFavoriteBooks(prevState => ({
          ...prevState,
          [index]: !prevState[index]
        }));
      };

    const filteredBooks = books.filter(book =>
    book.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    book.genre.toLowerCase().includes(searchQuery.toLowerCase())
    );

    // const { username, role } = userInfo;
    return (
        <div>
            <div className={styles.gallery}>
                {filteredBooks.map((book, index) => (
                    <div className={styles.book} key={index}>
                        <div className={styles.book_header}>
                            <div className={styles.book_header_texts}>
                                <h1 className={styles.book_title}>
                                    {book.title}
                                </h1>
                                <div className={styles.book_header_author_and_year}>
                                    <p className={styles.author}>
                                        <Authors author_id={book.author_id}/>
                                    </p>
                                    <p className={styles.year}>
                                        {(Math.floor(book.published_year)).toString()}
                                    </p>
                                </div>
                            </div>
                            {isAuthenticated ? (
                                <button className={styles.fav_button} onClick={() => handleFavoriteToggle(index)}>
                                {favoriteBooks[index] ? (
                                <img src={heartFull}/>
                                ) : (
                                <img src={heartEmpty}/>
                                )}
                                </button>
                            ):(
                                <button className={styles.fav_button} onClick={handleNotLogged}>
                                    <img src={heartEmpty}/>
                                </button>
                            )}
                        </div>
                        <ReactCardFlip isFlipped={flipStates[index]} flipDirection="horizontal" infinite flipSpeedFrontToBack={0.5} flipSpeedBackToFront={0.5} >
                            <div className={styles.book_body_and_footer} onClick={() => handleFlip(index)}>
                                <img src={book.thumbnail} alt={book.title} className={styles.book_thumbnail}/>
                                <div className={styles.book_footer}>
                                    <p className={styles.genre}>
                                        {book.genre}
                                    </p>
                                    <div className={styles.rating}>
                                        <div className={styles.rating_star}>
                                            <StarRating rating={parseFloat(book.average_rating)} />
                                        </div>
                                        <p className={styles.rating_number}>
                                            {(Math.floor(parseFloat(book.average_rating))).toString()}
                                        </p>
                                    </div>
                                </div>
                            </div>
                            <div className={styles.book_description_section} onClick={() => handleFlip(index)}>
                                <p className={styles.book_description}>
                                 {book.description}
                                </p>
                            </div>
                        </ReactCardFlip>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Books;
