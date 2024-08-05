import React, { useEffect, useState } from 'react';
import styles from './AdimPanel.module.css'
import { fetchBooks, fetchUsers } from '../../services/api';
import removeIcon from '../../assets/removeUser.svg'
import authIcon from '../../assets/authLogged.svg'
import addIcon from '../../assets/addBook.svg'
import { deleteBook } from '../../services/api';

interface Book {
    book_id: number
    thumbnail: string;
    title: string;
    author: string;
    published_year: number;
    genre: string;
    description: string;
    average_rating: string;
}

interface Users {
    password_hash: string;
    user_id: string;
    username: string;
    role: string;
}

const AdimPanel: React.FC = () => {

    const [books, setBooks] = useState<Book[]>([]);
    const [users, setUsers] = useState<Users[]>([]);


    useEffect(() => {
        const getBooks = async () => {
            try {
                const data = await fetchBooks();
                setBooks(data);          
            } catch (error) {
                console.error('Error fetching books:', error);
            }
        };
        getBooks();
    }, []);

    useEffect(() => {
        const getUsers = async () => {
            try {
                const data = await fetchUsers();
                setUsers(data);          
            } catch (error) {
                console.error('Error fetching users:', error);
            }
        };
        getUsers();
    }, []);

    const handleDelete = (book_id: number) => {
        const deleteBooks = async () => {
            try {
                await deleteBook(book_id);
                setBooks(books.filter(book => book.book_id !== book_id));
            } catch (error) {
                console.error("Error deleting book:", error);
            }
        };
        deleteBooks();
    }
    
    return (     
            <div className={styles.adminPanel}>
                <p className={styles.title}>
                    Admin Panel
                </p>
                <div className={styles.books_and_users}>
                    <div className={styles.books}>
                        <p className={styles.books_title}>
                            Books
                        </p>
                        <div className={styles.books_content}>
                            <div className={styles.headers}>
                                <p className={styles.book_title} id={styles.book_header}>
                                    Book Title
                                </p>
                                <p className={styles.book_author} id={styles.header}>
                                    Book Author
                                </p>
                                <p className={styles.book_year} id={styles.header}>
                                    Year                                 
                                </p>
                                <p className={styles.book_description} id={styles.header}>
                                    Book Description
                                </p>
                                <p className={styles.book_rating} id={styles.header}>
                                    Rating
                                </p>
                            </div>
                            <div className={styles.gallery}>
                                {books.map((book, index) => (
                                    <div className={styles.book}>
                                        <div className={styles.container_for_button}>
                                            <img src={removeIcon} onClick={() => handleDelete(book.book_id)}/>
                                        </div>
                                        <p className={styles.book_title}>
                                            {book.title.length > 20 ? book.title.slice(0, 20)+'...' : book.title}
                                        </p>
                                        <p className={styles.book_author}>
                                            {book.author}
                                        </p>
                                        <p className={styles.book_year}>
                                            {(Math.floor(book.published_year)).toString()}                                    
                                        </p>
                                        <p className={styles.book_description}>
                                            {book.description.length > 70 ? book.description.slice(0, 70)+'...' : book.description}
                                        </p>
                                        <p className={styles.book_rating}>
                                            {book.average_rating}
                                        </p>
                                    </div>
                                ))}
                                <div className={styles.last_row}>
                                <div className={styles.book}>
                                        <div className={styles.container_for_button}>
                                            <img src={addIcon}/>
                                        </div>
                                        <p className={styles.book_title}>
                                        </p>
                                        <p className={styles.book_author}>
                                        </p>
                                        <p className={styles.book_year}>
                                        </p>
                                        <p className={styles.book_description}>
                                        </p>
                                        <p className={styles.book_rating}>
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className={styles.users}>
                        <p className={styles.users_title}>
                            Users
                        </p>
                        <div className={styles.users_content}>
                            {users.map((user, index) => (
                                <div className={styles.user}>
                                    <button className={styles.user_remove}>
                                        <img src={removeIcon}/>
                                    </button>
                                    <div className={styles.user_icon}>
                                        <img src={authIcon}/>
                                    </div>
                                    <p className={styles.user_name}>
                                        user
                                    </p>
                                    <p className={styles.user_role}>
                                        {user.role}
                                    </p>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
    );
};

export default AdimPanel;
