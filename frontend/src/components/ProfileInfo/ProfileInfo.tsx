import React, { useState, useEffect } from 'react';

interface UserProfile {
  user_id: string;
  username: string;
  role: string;
}

const ProfileInfo: React.FC = () => {
  const [profile, setProfile] = useState<UserProfile | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const response = await fetch('http://127.0.0.1:8000/users/me/', {
          headers: {
            'Authorization': `Bearer ${localStorage.getItem('token')}`,
          },
        });

        if (!response.ok) {
          throw new Error('Failed to fetch profile');
        }

        const data = await response.json();
        setProfile(data);
      } catch (err) {
        setError("");
      } finally {
        setLoading(false);
      }
    };

    fetchProfile();
  }, []);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-900 text-white">
        Loading...
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-900 text-red-500">
        {error}
      </div>
    );
  }

  return (
    <div className=" bg-custom-bg text-white flex items-center justify-center h-screen w-full">
      <div className="bg-custom-blue p-6 rounded-lg shadow-lg w-3/6">
        <h2 className="text-2xl font-semibold mb-4">Profile Information</h2>
        {profile && (
          <>
            <p className="mb-2">
              <span className="font-bold">User ID:</span> {profile.user_id}
            </p>
            <p className="mb-2">
              <span className="font-bold">Username:</span> {profile.username}
            </p>
            <p className="mb-2">
              <span className="font-bold">Role:</span> {profile.role}
            </p>
          </>
        )}
      </div>
    </div>
  );
};

export default ProfileInfo;
