import React, { useState } from 'react';
import styles from './Header.module.css';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../utils/Auth';
import authIcon from '../../assets/auth.svg'
import authIconLogged from '../../assets/authLogged.svg'

const Header: React.FC = () => {
  const { logout, getUserInfo } = useAuth();
  const navigate = useNavigate();
  const userInfo = getUserInfo()

  const navigateToLogin = () => {
    navigate('/login');
  };

  const navigateToMain = () => {
    navigate('/');
  };

  const navigateToPanel = () => {
    navigate('/adminPanel')
  }

  const [isAuthOpen, setIsAuthOpen] = useState(false);
  
  const handleAuth = () => {
    setIsAuthOpen(!isAuthOpen);
  };

  const handleLogout = () => {
    logout();
    setIsAuthOpen(!isAuthOpen);
  };

  return (
    <div className={styles.header}>
      <button className={styles.title_button} onClick={navigateToMain}>
        <h1 className={styles.title}>Smart Library</h1>
      </button>
      {userInfo ? (
        <>
          <button className={styles.auth_button} onClick={handleAuth}>
            <img src={authIconLogged}/>
          </button>
          {isAuthOpen && (
            <div className={styles.auth_window} id={styles.logged}>
              <button className={styles.auth_window_section}>
                Profile
              </button>
              {userInfo.role === 'Admin' ? (
              <button className={styles.auth_window_section} onClick={navigateToPanel}>
                Admin Panel
              </button>
              ) : (
                <></>
              )
            }
              <button className={styles.auth_window_section} id={styles.sign_out} onClick={handleLogout}>
                Sign Out
              </button>
            </div>
          )}
        </>
      ) : (
        <>
          <button className={styles.auth_button} onClick={handleAuth}>
            <img src={authIcon}/>
          </button>

          {isAuthOpen && (
            <div className={styles.auth_window}>
              <button className={styles.auth_window_section} onClick={navigateToLogin}>
                Log in
              </button>
              <button className={styles.auth_window_section} id={styles.signu_p} onClick={navigateToLogin}>
                Sign up
              </button>
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default Header;
