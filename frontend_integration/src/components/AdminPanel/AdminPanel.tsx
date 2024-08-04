import React, { useEffect, useState } from 'react';
import styles from './AdimPanel.module.css'
import { fetchBooks, fetchUsers } from '../../services/api';
import Authors from '../Authors/Authors';

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
                                <svg width="20" height="19" viewBox="0 0 20 19" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path fill-rule="evenodd" clip-rule="evenodd" d="M7.89158 11.9832C7.73379 11.9832 7.576 11.9254 7.45602 11.8091C7.21522 11.5771 7.21522 11.2019 7.45602 10.9699L11.3942 7.17623C11.635 6.94427 12.0245 6.94427 12.2653 7.17623C12.5061 7.40819 12.5061 7.78344 12.2653 8.01539L8.32715 11.8091C8.20717 11.9254 8.04938 11.9832 7.89158 11.9832Z" fill="#FF0000"/>
                                    <path fill-rule="evenodd" clip-rule="evenodd" d="M11.8314 11.9855C11.6736 11.9855 11.5158 11.9277 11.3958 11.8114L7.45437 8.01375C7.21357 7.78179 7.21357 7.40654 7.45437 7.17458C7.69599 6.94262 8.08553 6.94262 8.3255 7.17458L12.267 10.9722C12.5078 11.2042 12.5078 11.5794 12.267 11.8114C12.147 11.9277 11.9884 11.9855 11.8314 11.9855Z" fill="#FF0000"/>
                                    <path fill-rule="evenodd" clip-rule="evenodd" d="M6.29929 2.77084C4.22007 2.77084 2.87638 4.1428 2.87638 6.26684V12.7332C2.87638 14.8572 4.22007 16.2292 6.29929 16.2292H13.4229C15.5029 16.2292 16.8474 14.8572 16.8474 12.7332V6.26684C16.8474 4.1428 15.5029 2.77084 13.4237 2.77084H6.29929ZM13.4229 17.4167H6.29929C3.51412 17.4167 1.64365 15.5341 1.64365 12.7332V6.26684C1.64365 3.46593 3.51412 1.58334 6.29929 1.58334H13.4237C16.2089 1.58334 18.0802 3.46593 18.0802 6.26684V12.7332C18.0802 15.5341 16.2089 17.4167 13.4229 17.4167Z" fill="#FF0000"/>
                                </svg>
                                </button>
                                <div className={styles.user_icon}>
                                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <mask id="mask0_85_14461" style={{ mask: "luminance" }} maskUnits="userSpaceOnUse" x="4" y="14" width="16" height="8">
                                        <path fill-rule="evenodd" clip-rule="evenodd" d="M4 14.4961H19.8399V21.8701H4V14.4961Z" fill="white"/>
                                        </mask>
                                        <g mask="url(#mask0_85_14461)">
                                        <path fill-rule="evenodd" clip-rule="evenodd" d="M11.9209 15.9961C7.65988 15.9961 5.49988 16.7281 5.49988 18.1731C5.49988 19.6311 7.65988 20.3701 11.9209 20.3701C16.1809 20.3701 18.3399 19.6381 18.3399 18.1931C18.3399 16.7351 16.1809 15.9961 11.9209 15.9961ZM11.9209 21.8701C9.96188 21.8701 3.99988 21.8701 3.99988 18.1731C3.99988 14.8771 8.52088 14.4961 11.9209 14.4961C13.8799 14.4961 19.8399 14.4961 19.8399 18.1931C19.8399 21.4891 15.3199 21.8701 11.9209 21.8701Z" fill="#41D0C8"/>
                                        </g>
                                        <mask id="mask1_85_14461" style={{ mask: "luminance" }} maskUnits="userSpaceOnUse" x="6" y="2" width="12" height="11">
                                        <path fill-rule="evenodd" clip-rule="evenodd" d="M6.60986 2.00009H17.2299V12.6187H6.60986V2.00009Z" fill="white"/>
                                        </mask>
                                        <g mask="url(#mask1_85_14461)">
                                        <path fill-rule="evenodd" clip-rule="evenodd" d="M11.9209 3.42769C9.77989 3.42769 8.03789 5.16869 8.03789 7.30969C8.03089 9.4437 9.75989 11.1837 11.8919 11.1917L11.9209 11.9057V11.1917C14.0609 11.1917 15.8019 9.44969 15.8019 7.30969C15.8019 5.16869 14.0609 3.42769 11.9209 3.42769ZM11.9209 12.6187H11.8889C8.9669 12.6097 6.59989 10.2267 6.60989 7.30669C6.60989 4.3817 8.99189 1.99969 11.9209 1.99969C14.8489 1.99969 17.2299 4.38169 17.2299 7.30969C17.2299 10.2377 14.8489 12.6187 11.9209 12.6187Z" fill="#41D0C8"/>
                                        </g>
                                        <path d="M10.2114 4.88041C10.2114 5.78054 10.2114 6.68066 10.2114 7.58079C10.2114 8.04082 10.4211 8.14721 10.8715 8.18057C11.141 8.20053 11.2377 8.07049 11.3453 7.82453C11.6745 7.07197 11.262 6.41966 10.7072 5.94577C10.3955 5.67956 10.1862 5.63486 9.81707 5.52127C9.71347 5.4894 9.32358 5.33781 9.23647 5.43363C9.09036 5.59436 9.08074 6.15192 9.07762 6.34837C9.0731 6.63329 9.03347 6.91451 9.02832 7.19737C9.00226 8.63105 10.0123 10.6481 11.6411 10.6481C12.2251 10.6481 12.8833 10.6568 13.3993 10.3305C13.7465 10.1109 13.9765 9.728 14.2155 9.40477C14.4871 9.03721 14.7676 8.67677 15.0535 8.32024C15.2806 8.03707 15.5612 7.66763 15.6232 7.29596C15.7239 6.69165 15.3557 6.52319 14.8919 6.23334C14.2224 5.81488 13.6436 5.25433 12.9967 4.80647C12.7471 4.63367 12.5227 4.52458 12.2217 4.53534C11.6913 4.55428 11.6272 4.9186 11.7506 5.33504C11.9053 5.85699 11.9201 6.44402 12.0382 6.97553C12.0664 7.10243 12.2099 7.20504 12.2299 7.34526C12.2712 7.63456 12.2961 7.93564 12.3285 8.22712C12.3654 8.55925 12.5733 8.52881 12.7256 8.2326C12.9342 7.82699 13.1908 7.41507 13.465 7.04948" stroke="#41D0C8" stroke-width="3" stroke-linecap="round"/>
                                        <path d="M12.4791 18.5849C11.4844 18.5849 10.5071 18.4478 9.52949 18.2645C8.98978 18.1633 8.44033 18.151 7.89721 18.0646C7.38417 17.983 6.88474 18.0033 6.36627 17.9934C6.16902 17.9896 6.03612 17.8928 6.27316 17.7743C6.53482 17.6434 6.87249 17.5701 7.15502 17.5004C8.01629 17.288 8.9784 17.2147 9.86087 17.1334C11.0236 17.0263 12.192 17.0567 13.3582 17.0567C14.3418 17.0567 15.2144 17.2848 16.1517 17.5278C16.4212 17.5976 16.6695 17.7223 16.9158 17.8455C17.2313 18.0032 17.1617 18.0438 17.0254 18.2891C16.7622 18.7628 16.0992 18.8309 15.6231 18.9519C14.8954 19.1369 14.188 19.3581 13.4513 19.5188C11.9992 19.8356 10.4555 19.7681 8.97901 19.7681C8.65656 19.7681 8.28644 19.7898 7.98211 19.6695C7.86107 19.6216 7.40151 19.4475 7.40151 19.3244" stroke="#41D0C8" stroke-width="3" stroke-linecap="round"/>
                                    </svg>
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
