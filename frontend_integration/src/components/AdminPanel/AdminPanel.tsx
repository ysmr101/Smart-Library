import React, { useEffect, useState } from 'react';
import styles from './AdimPanel.module.css'
import { fetchBooks, fetchUsers } from '../../services/api';
import Authors from '../Authors/Authors';
import removeIcon from '../../assets/removeUser.svg'
import authIcon from '../../assets/authLogged.svg'

interface Book {
    thumbnail: string;
    title: string;
    author_id: number;
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
                                <p className={styles.book_title} id={styles.header}>
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
                            {books.map((book, index) => (
                                <div className={styles.book}>
                                    <p className={styles.book_title}>
                                        {book.title}
                                    </p>
                                    <p className={styles.book_author}>
                                        <Authors author_id={book.author_id}/>
                                    </p>
                                    <p className={styles.book_year}>
                                        {(Math.floor(book.published_year)).toString()}                                    </p>
                                    <p className={styles.book_description}>
                                        {book.description}
                                    </p>
                                    <p className={styles.book_rating}>
                                        {book.average_rating}
                                    </p>
                                </div>
                            ))}
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
                                    {user.username}
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
