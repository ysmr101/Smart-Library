import React, { useState, useEffect, useRef } from 'react';
import Profile from '../../assets/Profile.svg';
import { useNavigate } from 'react-router-dom'; // Add useNavigate for routing
import { useAuth } from '../../hooks/useAuth'; // Assuming you have a custom hook for auth

interface ProfileButtonProps {
  // Include any props you need here, if required
}

const ProfileButton: React.FC<ProfileButtonProps> = () => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const { authData, logout, getRole } = useAuth(); // Use your auth context/hook
  const navigate = useNavigate();

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  const handleLogoutClick = () => {
    logout();
    setIsOpen(false);
    navigate('/'); // Redirect to home or login page after logout
    window.location.reload()
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const isAuthenticated = !!authData; // Check if the user is authenticated
  const isAdmin = getRole() === 'Admin'; // Check if the user's role is admin

  return (
    <div className="relative inline-block text-center" ref={dropdownRef}>
      <div>
        <button
          type="button"
          onClick={toggleDropdown}
          id="menu-button"
          aria-expanded="true"
          aria-haspopup="true"
        >
          <img src={Profile} alt="Profile Icon" />
        </button>
      </div>

      {isOpen && (
        <div
          className="origin-top-right absolute right-0 mt-2 w-32 rounded-md shadow-lg bg-custom-blue ring-1 ring-black ring-opacity-5 focus:outline-none"
          role="menu"
          aria-orientation="vertical"
          aria-labelledby="menu-button"
          tabIndex={-1}
        >
          <div className="py-1" role="none">
            {isAuthenticated ? (
              <>
                <a
                  href=""
                  className="text-white block px-4 py-2 text-sm"
                  role="menuitem"
                  tabIndex={-1}
                  onClick={() => navigate('/profile')}
                >
                  Profile
                </a>
                {isAdmin && (
                  <a
                    href=""
                    className="text-white block px-4 py-2 text-sm"
                    role="menuitem"
                    tabIndex={-1}
                    onClick={() => navigate('/admin')}
                  >
                    Admin Panel
                  </a>
                )}
                <a
                  href=""
                  className="text-red-500 block px-4 py-2 text-sm"
                  role="menuitem"
                  tabIndex={-1}
                  onClick={handleLogoutClick}
                >
                  Sign Out
                </a>
              </>
            ) : (
              <>
                <a
                  href=""
                  className="text-white block px-4 py-2 text-sm"
                  role="menuitem"
                  tabIndex={-1}
                  onClick={() => navigate('/login')}
                >
                  Log In
                </a>
                <a
                  href=""
                  className="text-white block px-4 py-2 text-sm"
                  role="menuitem"
                  tabIndex={-1}
                 onClick={() => navigate('/signup')}
                >
                  Sign Up
                </a>
              </>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default ProfileButton;
