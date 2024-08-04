import React from 'react';
import styles from './LoginPage.module.css'
import Header from '../../components/Header/Header';
import Login from '../../components/Login/Login';

const LoginPage: React.FC = () => {

    return (     
        <div className={styles.loginPage}>
            <Header />
            <Login />
        </div>
    );
};

export default LoginPage;
