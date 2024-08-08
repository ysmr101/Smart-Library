import React, { useState } from 'react';
import styles from './FavoritePage.module.css';
import Header from '../../components/Header/Header';
import Search from '../../components/Search/Search';
import Chatbot from '../../components/Chatbot/Chatbot';
import FavoriteBooks from '../../components/FavoriteBooks/FavoriteBooks';
import { useAuth } from '../../utils/Auth';

const FavoritePage: React.FC = () => {
    const [searchQuery, setSearchQuery] = useState('');
    const [sortBy, setSortBy] = useState<string>('');
    const [genre, setGenre] = useState<string>('');
    const { getUserInfo } = useAuth()
    const userInfo = getUserInfo()

  

        return (
            <div className={styles.mainPage}>
                <Header />
                <Search setSearchQuery={setSearchQuery} setSortBy={setSortBy} setGenre={setGenre} />
                {userInfo ? (
                    <FavoriteBooks searchQuery={searchQuery} user_id={userInfo.user_id} />
                ) : (
                    window.location.href = '/login'
                )}                
                <Chatbot />
            </div>
        );
};

export default FavoritePage;
