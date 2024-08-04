import React from 'react';
import ProfileButton from '../../components/ProfileButton/ProfileButton';

interface HeaderProps {
  onLoginClick: () => void;
  onSignupClick: () => void;
  setView: React.Dispatch<React.SetStateAction<'Home' | 'Admin' | 'Login' | 'Signup'| 'ProfileInfo'>>;
}

const Header: React.FC<HeaderProps> = ({ onLoginClick, onSignupClick, setView }) => {
  return (
    <div>
      <div className="flex place-content-center">
        <div className="w-11/12 p-4 flex justify-between items-center rounded-md px-3 py-2 font-work-sans">

          <button
            onClick={() => setView('Home')}
            className="text-white text-xl hover:underline focus:outline-none"
          >
            Library
          </button>

          <ProfileButton
            onLoginClick={onLoginClick}
            onSignupClick={onSignupClick}
            setView={setView}
          />
        </div>
      </div>

      <div className="flex place-content-center">
        <div className="w-11/12 h-0.5 bg-custom-placeholder rounded-md flex self-center"></div>
      </div>
    </div>
  );
};

export default Header;
