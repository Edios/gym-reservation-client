import React, { useState } from 'react';
import {register} from '../../services/authService';
import { useNavigate } from 'react-router-dom';

const Register = () => {
    const [name, setName] = useState(''); 
    const [email, setEmail] = useState(''); 
    const [password, setPassword] = useState(''); 
    const [error,setError]=useState('');
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        // Clear any previous error messages
        setError(''); 
        try {
          await register(name,email, password);
          alert('Successfully registered!');
          navigate('/');
        } catch (error) {
          setError(error.message);
          console.error(error);
        }
    };

    return (
        <div className="flex items-center justify-center min-h-screen bg-gray-100">
          <div className="bg-white p-6 rounded shadow-lg w-full max-w-md">
            <h2 className="text-2xl font-semibold mb-4">Register</h2>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700">Name</label>
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  required
                  className="mt-1 px-3 py-2 border border-gray-300 rounded w-full"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Email</label>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  className="mt-1 px-3 py-2 border border-gray-300 rounded w-full"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Password</label>
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  className="mt-1 px-3 py-2 border border-gray-300 rounded w-full"
                />
              </div>
              {error && <p className="text-red-500 text-sm">{error}</p>}
              <button type="submit" className="w-full py-2 px-4 bg-blue-600 text-white rounded hover:bg-blue-700">
                Register
              </button>
            </form>
          </div>
        </div>
      );
}
export default Register;