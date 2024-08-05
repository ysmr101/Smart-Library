import React, { useEffect, useState } from 'react';
import styles from './AdimPanel.module.css'
import { fetchBooks, fetchUsers, deleteBook, createBook, updateBook, deleteUser } from '../../services/api';
import removeIcon from '../../assets/removeUser.svg'
import authIcon from '../../assets/authLogged.svg'
import addIcon from '../../assets/addBook.svg'
import editIcon from '../../assets/editBook.svg'

interface Book {
    book_id: number
    thumbnail: string;
    title: string;
    author: string;
    published_year: string;
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

    const [refresh, setRefresh] = useState<boolean>(false);
    const [books, setBooks] = useState<Book[]>([]);
    const [users, setUsers] = useState<Users[]>([]);
    const [editBookId, setEditBookId] = useState<number | null>(null);
    const [newBook, setNewBook] = useState({
        title: '',
        author: '',
        published_year: '',
        genre: '',
        description: '',
        average_rating: '',
        thumbnail: 'none',
    });
    const [editBook, setEditBook] = useState({
        title: '',
        author: '',
        published_year: '',
        genre: '',
        description: '',
        average_rating: '',
        thumbnail: 'none',
    });

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
    }, [refresh]);

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

    const handleCreate = () => {
        const createBooks = async () => {
            try {
                const createdBook = await createBook(
                    newBook.title,
                    newBook.author,
                    newBook.genre,
                    newBook.published_year,
                    newBook.description,
                    newBook.average_rating,
                    newBook.thumbnail
                );
                setBooks([...books, createdBook]);
                setNewBook({
                    title: '',
                    author: '',
                    genre: '',
                    published_year: '',
                    description: '',
                    average_rating: '',
                    thumbnail:'none'
                });
            } catch (error) {
                console.error("Error creating book:", error);
            }
        };
        createBooks();
    };

    const handleUpdate = () => {
        if (editBookId !== null) {
            const updateBooks = async () => {
                try {
                    const updatedBook = await updateBook(editBookId, editBook.title, editBook.author, editBook.genre, editBook.published_year.toString(), editBook.description, editBook.average_rating, editBook.thumbnail,);
                    setBooks(books.map(book => book.book_id === editBookId ? updatedBook : book));
                    setEditBook({
                        title: '',
                        author: '',
                        genre: '',
                        published_year: '',
                        description: '',
                        average_rating: '',
                        thumbnail:'none'
                    });                    
                    setEditBookId(null);
                    setRefresh(!refresh)
                } catch (error) {
                    console.error("Error updating book:", error);
                }
            };
            updateBooks();
        }
    };

    const handleInputChangeCreate = (event: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = event.target;
        setNewBook(prevState => ({
            ...prevState,
            [name]: value
        }));
    };

    const handleInputChangeUpdate = (event: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = event.target;
        setEditBook(prevState => ({
            ...prevState,
            [name]: value
        }));
    };

    const startEditing = (book: Book) => {
        setEditBookId(book.book_id);
        setEditBook(book);
    };

    const handleDeleteUser = (user_id: string) => {
        const deleteUsers = async () => {
            try {
                await deleteUser(user_id);
                setUsers(users.filter(user => user.user_id !== user_id));
            } catch (error) {
                console.error("Error deleting user:", error);
            }
        };
        deleteUsers();
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
                            <div className={styles.container_for_button} id={styles.extra_header}/>
                                <p className={styles.book_title} id={styles.book_header}>
                                    Title
                                </p>
                                <p className={styles.book_author} id={styles.header}>
                                    Author
                                </p>
                                <p className={styles.book_genre} id={styles.header}>
                                    Genre
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
                                        <div className={styles.book_title}>
                                        <input
                                            type="text"
                                            name="title"
                                            className={styles.input}
                                            value={editBookId === book.book_id ? editBook.title || '' : book.title.length > 15 ? book.title.slice(0, 15)+'...' : book.title}
                                            onChange={handleInputChangeUpdate}
                                            onFocus={() => startEditing(book)}
                                        />
                                        </div>        
                                        <p className={styles.book_author}>
                                        <input
                                            type="text"
                                            name="author"
                                            className={styles.input}
                                            value={editBookId === book.book_id ? editBook.author || '' : book.author}
                                            onChange={handleInputChangeUpdate}
                                            onFocus={() => startEditing(book)}
                                        />
                                        </p>
                                        <p className={styles.book_genre}>
                                        <input
                                            type="text"
                                            name="genre"
                                            className={styles.input}
                                            value={editBookId === book.book_id ? editBook.genre || '' : book.genre}
                                            onChange={handleInputChangeUpdate}
                                            onFocus={() => startEditing(book)}
                                        />                                       
                                        </p>
                                        <p className={styles.book_year}>
                                        <input
                                            type="text"
                                            name="published_year"
                                            className={styles.input}
                                            value={editBookId === book.book_id ? (Math.floor(parseFloat(editBook.published_year))) || '' : (Math.floor(parseFloat(book.published_year)))}
                                            onChange={handleInputChangeUpdate}
                                            onFocus={() => startEditing(book)}
                                        />   
                                        </p>
                                        <p className={styles.book_description}>
                                            <input
                                                type="text"
                                                name="description"
                                                className={styles.input}
                                                value={editBookId === book.book_id ? editBook.description || '' : book.description.length > 40 ? book.description.slice(0, 40)+'...' : book.description}
                                                onChange={handleInputChangeUpdate}
                                                onFocus={() => startEditing(book)}
                                            />    
                                        </p>
                                        <p className={styles.book_rating}>
                                            <input
                                                type="text"
                                                name="average_rating"
                                                className={styles.input}
                                                value={editBookId === book.book_id ? editBook.average_rating || '' : book.average_rating}
                                                onChange={handleInputChangeUpdate}
                                                onFocus={() => startEditing(book)}
                                            />  
                                        </p>
                                        <div className={styles.container_for_button}>
                                            <img src={editIcon} onClick={handleUpdate}/>
                                        </div>
                                    </div>
                                ))}
                                <div className={styles.last_row}>
                                <div className={styles.book}>
                                        <div className={styles.container_for_button} onClick={handleCreate}>
                                            <img src={addIcon}/>
                                        </div>
                                        <div className={styles.book_title}>
                                            <input type="text" className={styles.input} placeholder='add title...' name="title" value={newBook.title} onChange={handleInputChangeCreate}/>
                                        </div>
                                        <div className={styles.book_author}>
                                            <input type="text" className={styles.input} placeholder='add author...' name="author" value={newBook.author} onChange={handleInputChangeCreate}/>
                                        </div>
                                        <div className={styles.book_genre}>
                                            <input type="text" className={styles.input} placeholder='add genre...' name="genre" value={newBook.genre} onChange={handleInputChangeCreate}/>
                                        </div>
                                        <div className={styles.book_year}>
                                            <input type="text" className={styles.input} placeholder='add year...' name="published_year" value={newBook.published_year} onChange={handleInputChangeCreate}/>
                                        </div>
                                        <div className={styles.book_description}>
                                            <input type="text" className={styles.input} placeholder='add description...' name="description" value={newBook.description} onChange={handleInputChangeCreate}/>
                                        </div>
                                        <div className={styles.book_rating}>
                                            <input type="text" className={styles.input} placeholder='add rating...' name="average_rating" value={newBook.average_rating} onChange={handleInputChangeCreate}/>
                                        </div>
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
                                        <img src={removeIcon} onClick={() => handleDeleteUser(user.user_id)}/>
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
