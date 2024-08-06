import React, { useEffect, useState } from 'react';
import Profile from '../../assets/Profile.svg'; // Make sure this path is correct

interface User {
  user_id: string;
  role: string;
  username: string;
}

const UsersSection: React.FC = () => {
  const [users, setUsers] = useState<User[]>([]);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await fetch('http://127.0.0.1:8000/users/', {
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${localStorage.getItem('token')}`,
          },
        });

        if (!response.ok) {
          throw new Error('Failed to fetch users');
        }

        const data = await response.json();
        setUsers(data);
      } catch (error) {
        console.error('Error fetching the users:', error);
      }
    };

    fetchUsers();
  }, []);

  return (
    <div className="bg-custom-blue rounded-lg p-4 flex-grow h-96 w-full overflow-y-auto custom-scrollbar">
      <h2 className="text-lg font-semibold mb-2">Users</h2>
      <div className="space-y-2">
        {users.map((user) => (
          <div
            key={user.user_id}
            className="flex items-center justify-between bg-custom-blue rounded-md px-3 py-2"
          >
            <span className="flex items-center">
              <img src={Profile} alt="Profile Icon" className="h-6 w-6 mr-2" />
              <span className="text-sm">{user.username}</span>
            </span>
            <span className="flex items-center">
              <span className="text-sm mr-2">{user.role}</span>
            </span>
          </div>
        ))}
        <div className="flex items-center justify-between bg-gray-900 rounded-md px-3 py-2">
          <input
            type="text"
            placeholder="Enter username"
            className="bg-gray-800 text-white placeholder-gray-500 px-2 py-1 text-sm rounded-md w-full mr-2"
          />
          <button className="bg-blue-600 hover:bg-blue-700 text-sm px-2 py-1 rounded-md">
            Add User
          </button>
        </div>
      </div>
    </div>
  );
};

export default UsersSection;
