import React, { useState } from 'react';
import styles from './FavoritePage.module.css';
import Header from '../../components/Header/Header';
import Search from '../../components/Search/Search';
import Chatbot from '../../components/Chatbot/Chatbot';
import FavoriteBooks from '../../components/FavoriteBooks/FavoriteBooks';

const FavoritePage: React.FC = () => {
    const [searchQuery, setSearchQuery] = useState('');
    const [sortBy, setSortBy] = useState<string>('');
    const [genre, setGenre] = useState<string>('');



    return (
        <div className={styles.mainPage}>
            <Header />
            <Search setSearchQuery={setSearchQuery} setSortBy={setSortBy} setGenre={setGenre} />
            <FavoriteBooks searchQuery={searchQuery} user_id={'07dc4816-2d30-49d4-ad97-ed0dd0f97b7b'}/>
            <Chatbot />
        </div>
    );
};

export default FavoritePage;
