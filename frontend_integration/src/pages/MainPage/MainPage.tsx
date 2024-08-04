import React, { useState } from 'react';
import styles from './MainPage.module.css';
import Header from '../../components/Header/Header';
import Search from '../../components/Search/Search';
import Chatbot from '../../components/Chatbot/Chatbot';
import Books from '../../components/Books/Books';

const MainPage: React.FC = () => {
    const [searchQuery, setSearchQuery] = useState('');


    return (
        <div className={styles.mainPage}>
            <Header />
            <Search setSearchQuery={setSearchQuery} />
            <Books searchQuery={searchQuery} />
            <Chatbot />
        </div>
    );
};

export default MainPage;
