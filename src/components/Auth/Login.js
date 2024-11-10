import React, { useState } from 'react';
import {login} from '../../services/authService';
import { useNavigate } from 'react-router-dom';

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();


const handleLogin = async (e) => {
        e.preventDefault();
        try{
            await login(email, password);
            navigate('/calendar');
        }
        catch(error){
            console.error(error);
            alert('Invalid credentials');
        }
    }

    return (
        <div className='flex items-center justify-center min-h-screen bg-gray-100'>
            <form onSubmit={handleLogin} className="bg-white p-8 rounded-lg shadow-md w-full max-w-sm">
                <h2 className='text-2xl font-semibold text-center mb-6'>Login</h2>
                <input type="email" placeholder='Email' 
                value={email} 
                onChange={(e) => setEmail(e.target.value)} 
                className="w-full p-2 mb-4 border rounded-md focus:outline-none focus:border-indigo-500" /> 
                
                <input type="password" placeholder='Password' 
                value={password} 
                onChange={(e) => setPassword(e.target.value)} 
                className="w-full p-2 mb-4 border rounded-md focus:outline-none focus:border-indigo-500" /> 

                <button type="submit" className="w-full bg-indigo-600 text-white py-2 rounded-md hover:bg-indigo-700">
                    Login
                </button>
            </form>
        </div>
    );
};
export default Login;