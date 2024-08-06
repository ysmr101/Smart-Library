
import React from 'react';

import ProfileButton from '../ProfileButton/ProfileButton';

const Header: React.FC = () => {
  return (
    <div>
      <div className="flex place-content-center">
        <div className="w-11/12 p-4 flex justify-between items-center rounded-md px-3 py-2 font-work-sans">
            <a href="/" className="text-white text-xl hover:underline">
                Library
            </a>
            <ProfileButton/>
        </div>
      </div>
        <div className="flex place-content-center">
        <div className="w-11/12 h-0.5 bg-custom-placeholder rounded-md flex self-center"></div>
      </div>
    </div>
  );
};

export default Header;
