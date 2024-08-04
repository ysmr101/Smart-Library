import React from 'react';
import styles from './AdminPage.module.css'
import Header from '../../components/Header/Header';
import AdimPanel from '../../components/AdminPanel/AdminPanel';

const AdminPage: React.FC = () => {

    return (     
        <div className={styles.adminPage}>
            <Header />
            <AdimPanel />
        </div>
    );
};

export default AdminPage;
