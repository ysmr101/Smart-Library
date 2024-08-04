// import React, { useState } from 'react';
//
// interface SignupFormProps {
//   onSignupSuccess: () => void; // Callback prop for successful signup
// }
//
// const SignupForm: React.FC<SignupFormProps> = ({ onSignupSuccess }) => {
//   const [userName, setUserName] = useState('');
//   const [password, setPassword] = useState('');
//   const [error, setError] = useState('');
//   const [success, setSuccess] = useState('');
//
//   const handleSubmit = async (e: React.FormEvent) => {
//     e.preventDefault();
//
//     const bodyData = {
//       user_name: userName,
//       password: password,
//     };
//
//     try {
//       const response = await fetch('http://127.0.0.1:8000/users/register', {
//         method: 'POST',
//         headers: {
//           'Accept': 'application/json',
//           'Content-Type': 'application/json',
//         },
//         body: JSON.stringify(bodyData), // Send data as JSON
//       });
//
//       if (response.ok) {
//         const data = await response.json();
//         setSuccess('Registration successful!');
//         setError('');
//         console.log('Registration successful:', data);
//         // Delay the navigation to books
//         setTimeout(() => {
//           onSignupSuccess(); // Notify parent component of successful signup
//         }, 1000); // 1000 milliseconds = 1 second
//       } else {
//         const errorData = await response.json();
//         setError(errorData.message || 'Registration failed');
//         setSuccess('');
//         console.error('Registration failed:', errorData);
//       }
//     } catch (err) {
//       console.error('Error during registration:', err);
//       setError('An error occurred during registration.');
//       setSuccess('');
//     }
//   };
//
//   return (
//     <form className="bg-custom-blue p-6 rounded-md w-6/12" onSubmit={handleSubmit}>
//       <h2 className="text-white text-xl mb-4 flex justify-center">Sign Up</h2>
//       {error && <div className="text-red-500 mb-4">{error}</div>}
//       {success && <div className="text-green-500 mb-4">{success}</div>}
//       <label className="block text-white">User Name</label>
//       <input
//         type="text"
//         className="w-full p-2 mb-4 border-2 rounded-md text-white bg-custom-blue"
//         placeholder="User123"
//         value={userName}
//         onChange={(e) => setUserName(e.target.value)}
//       />
//       <label className="block text-white">Password</label>
//       <input
//         type="password"
//         className="w-full p-2 mb-4 border-2 rounded-md text-white bg-custom-blue"
//         placeholder="Password"
//         value={password}
//         onChange={(e) => setPassword(e.target.value)}
//       />
//       <div className="flex justify-center">
//         <button type="submit" className="bg-custom-teal text-white p-2 rounded-md">
//           Sign Up
//         </button>
//       </div>
//     </form>
//   );
// };
//
// export default SignupForm;

// src/components/SignupForm/SignupForm.tsx
import React, { useState } from 'react';

interface SignupFormProps {
  onSignupSuccess: (token: string, role: string) => void; // Updated signature
}

const SignupForm: React.FC<SignupFormProps> = ({ onSignupSuccess }) => {
  const [userName, setUserName] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const bodyData = {
      user_name: userName,
      password: password,
    };

    try {
      const response = await fetch('http://127.0.0.1:8000/users/register', {
        method: 'POST',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(bodyData),
      });

      if (response.ok) {
        const data = await response.json();
        const token = data.token;
        const role = data.role; // Assume the role is returned from the backend
        localStorage.setItem('token', token);
        localStorage.setItem('role', role);
        setSuccess('Registration successful!');
        setError('');
        console.log('Registration successful:', data);
        setTimeout(() => {
          onSignupSuccess(token, role); // Pass token and role to the callback
        }, 1000);
      } else {
        const errorData = await response.json();
        setError(errorData.message || 'Registration failed');
        setSuccess('');
        console.error('Registration failed:', errorData);
      }
    } catch (err) {
      console.error('Error during registration:', err);
      setError('An error occurred during registration.');
      setSuccess('');
    }
  };

  return (
    <form className="bg-custom-blue p-6 rounded-md w-6/12" onSubmit={handleSubmit}>
      <h2 className="text-white text-xl mb-4 flex justify-center">Sign Up</h2>
      {error && <div className="text-red-500 mb-4">{error}</div>}
      {success && <div className="text-green-500 mb-4">{success}</div>}
      <label className="block text-white">User Name</label>
      <input
        type="text"
        className="w-full p-2 mb-4 border-2 rounded-md text-white bg-custom-blue"
        placeholder="User123"
        value={userName}
        onChange={(e) => setUserName(e.target.value)}
      />
      <label className="block text-white">Password</label>
      <input
        type="password"
        className="w-full p-2 mb-4 border-2 rounded-md text-white bg-custom-blue"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <div className="flex justify-center">
        <button type="submit" className="bg-custom-teal text-white p-2 rounded-md">
          Sign Up
        </button>
      </div>
    </form>
  );
};

export default SignupForm;

