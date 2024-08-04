import React, { useState } from 'react';
import styles from './Header.module.css';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../utils/Auth';

const Header: React.FC = () => {
  const { token, logout } = useAuth();
  const isAuthenticated = !!token; 
  const navigate = useNavigate();

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
      {isAuthenticated ? (
        <>
          <button className={styles.auth_button} onClick={handleAuth}>
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <mask id="mask0_85_12154" style={{ mask: "luminance" }} maskUnits="userSpaceOnUse" x="4" y="14" width="16" height="8">
                <path fillRule="evenodd" clipRule="evenodd" d="M4 14.4961H19.8399V21.8701H4V14.4961Z" fill="white" />
              </mask>
              <g mask="url(#mask0_85_12154)">
                <path fillRule="evenodd" clipRule="evenodd" d="M11.9209 15.9961C7.65988 15.9961 5.49988 16.7281 5.49988 18.1731C5.49988 19.6311 7.65988 20.3701 11.9209 20.3701C16.1809 20.3701 18.3399 19.6381 18.3399 18.1931C18.3399 16.7351 16.1809 15.9961 11.9209 15.9961ZM11.9209 21.8701C9.96188 21.8701 3.99988 21.8701 3.99988 18.1731C3.99988 14.8771 8.52088 14.4961 11.9209 14.4961C13.8799 14.4961 19.8399 14.4961 19.8399 18.1931C19.8399 21.4891 15.3199 21.8701 11.9209 21.8701Z" fill="#41D0C8" />
              </g>
              <mask id="mask1_85_12154" style={{ mask: "luminance" }} maskUnits="userSpaceOnUse" x="6" y="2" width="12" height="11">
                <path fillRule="evenodd" clipRule="evenodd" d="M6.60986 2.00012H17.2299V12.6187H6.60986V2.00012Z" fill="white" />
              </mask>
              <g mask="url(#mask1_85_12154)">
                <path fillRule="evenodd" clipRule="evenodd" d="M11.9209 3.42769C9.77989 3.42769 8.03789 5.16869 8.03789 7.30969C8.03089 9.4437 9.75989 11.1837 11.8919 11.1917L11.9209 11.9057V11.1917C14.0609 11.1917 15.8019 9.44969 15.8019 7.30969C15.8019 5.16869 14.0609 3.42769 11.9209 3.42769ZM11.9209 12.6187H11.8889C8.9669 12.6097 6.59989 10.2267 6.60989 7.30669C6.60989 4.3817 8.99189 1.99969 11.9209 1.99969C14.8489 1.99969 17.2299 4.38169 17.2299 7.30969C17.2299 10.2377 14.8489 12.6187 11.9209 12.6187Z" fill="#41D0C8" />
              </g>
              <path d="M10.2114 4.88041C10.2114 5.78054 10.2114 6.68066 10.2114 7.58079C10.2114 8.04082 10.4211 8.14721 10.8715 8.18057C11.141 8.20053 11.2377 8.07049 11.3453 7.82453C11.6745 7.07197 11.262 6.41966 10.7072 5.94577C10.3955 5.67956 10.1862 5.63486 9.81707 5.52127C9.71347 5.4894 9.32358 5.33781 9.23647 5.43363C9.09036 5.59436 9.08074 6.15192 9.07762 6.34837C9.0731 6.63329 9.03347 6.91451 9.02832 7.19737C9.00226 8.63105 10.0123 10.6481 11.6411 10.6481C12.2251 10.6481 12.8833 10.6568 13.3993 10.3305C13.7465 10.1109 13.9765 9.728 14.2155 9.40477C14.4871 9.03721 14.7676 8.67677 15.0535 8.32024C15.2806 8.03707 15.5612 7.66763 15.6232 7.29596C15.7239 6.69165 15.3557 6.52319 14.8919 6.23334C14.2224 5.81488 13.6436 5.25433 12.9967 4.80647C12.7471 4.63367 12.5227 4.52458 12.2217 4.53534C11.6913 4.55428 11.6272 4.9186 11.7506 5.33504C11.9053 5.85699 11.9201 6.44402 12.0382 6.97553C12.0664 7.10243 12.2099 7.20504 12.2299 7.34526C12.2712 7.63456 12.2961 7.93564 12.3285 8.22712C12.3654 8.55925 12.5733 8.52881 12.7256 8.2326C12.9342 7.82699 13.1908 7.41507 13.465 7.04948" stroke="#41D0C8" strokeWidth="3" strokeLinecap="round" />
              <path d="M12.4791 18.5849C11.4844 18.5849 10.5071 18.4478 9.52955 18.2645C8.98984 18.1633 8.44039 18.151 7.89727 18.0646C7.38423 17.983 6.8848 18.0033 6.36633 17.9934C6.16908 17.9896 6.03618 17.8928 6.27322 17.7743C6.53488 17.6434 6.87255 17.5701 7.15508 17.5004C8.01635 17.288 8.97846 17.2147 9.86093 17.1334C11.0237 17.0263 12.192 17.0567 13.3583 17.0567C14.3419 17.0567 15.2145 17.2848 16.1518 17.5278C16.4212 17.5976 16.6695 17.7223 16.9159 17.8455C17.2314 18.0032 17.1617 18.0438 17.0254 18.2891C16.7623 18.7628 16.0993 18.8309 15.6232 18.9519C14.8954 19.1369 14.1881 19.3581 13.4514 19.5188C11.9993 19.8356 10.4556 19.7681 8.97907 19.7681C8.65662 19.7681 8.2865 19.7898 7.98218 19.6695C7.86113 19.6216 7.40157 19.4475 7.40157 19.3244" stroke="#41D0C8" strokeWidth="3" strokeLinecap="round" />
            </svg>
          </button>

          {isAuthOpen && (
            <div className={styles.auth_window_logged}>
              <button className={styles.profile}>
                Profile
              </button>
              <button className={styles.admin_panel} onClick={navigateToPanel}>
                Admin Panel
              </button>
              <button className={styles.sign_out} onClick={handleLogout}>
                Sign Out
              </button>
            </div>
          )}
        </>
      ) : (
        <>
          <button className={styles.auth_button} onClick={handleAuth}>
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <mask id="mask0_85_10022" style={{ mask: "luminance" }} maskUnits="userSpaceOnUse" x="4" y="14" width="16" height="8">
                <path fillRule="evenodd" clipRule="evenodd" d="M4 14.4961H19.8399V21.8701H4V14.4961Z" fill="white" />
              </mask>
              <g mask="url(#mask0_85_10022)">
                <path fillRule="evenodd" clipRule="evenodd" d="M11.921 15.9961C7.66 15.9961 5.5 16.7281 5.5 18.1731C5.5 19.6311 7.66 20.3701 11.921 20.3701C16.181 20.3701 18.34 19.6381 18.34 18.1931C18.34 16.7351 16.181 15.9961 11.921 15.9961ZM11.921 21.8701C9.962 21.8701 4 21.8701 4 18.1731C4 14.8771 8.521 14.4961 11.921 14.4961C13.88 14.4961 19.84 14.4961 19.84 18.1931C19.84 21.4891 15.32 21.8701 11.921 21.8701Z" fill="#41D0C8" />
              </g>
              <mask id="mask1_85_10022" style={{ mask: "luminance" }} maskUnits="userSpaceOnUse" x="6" y="2" width="12" height="11">
                <path fillRule="evenodd" clipRule="evenodd" d="M6.61035 2.00012H17.2304V12.6187H6.61035V2.00012Z" fill="white" />
              </mask>
              <g mask="url(#mask1_85_10022)">
                <path fillRule="evenodd" clipRule="evenodd" d="M11.9214 3.42769C9.78038 3.42769 8.03838 5.16869 8.03838 7.30969C8.03138 9.4437 9.76038 11.1837 11.8924 11.1917L11.9214 11.9057V11.1917C14.0614 11.1917 15.8024 9.44969 15.8024 7.30969C15.8024 5.16869 14.0614 3.42769 11.9214 3.42769ZM11.9214 12.6187H11.8894C8.96738 12.6097 6.60038 10.2267 6.61038 7.30669C6.61038 4.3817 8.99238 1.99969 11.9214 1.99969C14.8494 1.99969 17.2304 4.38169 17.2304 7.30969C17.2304 10.2377 14.8494 12.6187 11.9214 12.6187Z" fill="#41D0C8" />
              </g>
            </svg>
          </button>

          {isAuthOpen && (
            <div className={styles.auth_window}>
              <button className={styles.log_in} onClick={navigateToLogin}>
                Log in
              </button>
              <button className={styles.sign_up} onClick={navigateToLogin}>
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
