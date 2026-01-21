import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Link, useNavigate } from 'react-router-dom';
import { LogIn, ArrowRight } from 'lucide-react';
import { useAuth } from '../context/AuthContext';

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);
    const { login } = useAuth();
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        setLoading(true);
        const res = await login(email, password);
        if (res.success) {
            navigate('/');
        } else {
            setError(res.message);
        }
        setLoading(false);
    };

    return (
        <div className="min-h-screen bg-white flex items-center justify-center p-6">
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="w-full max-w-md bg-white border-2 border-gray-100 rounded-[2.5rem] p-10 shadow-2xl shadow-gray-200/50"
            >
                <div className="text-center mb-10">
                    <div className="inline-flex items-center justify-center w-20 h-20 bg-primary/10 rounded-3xl mb-6 text-primary">
                        <LogIn size={40} />
                    </div>
                    <h1 className="text-4xl font-black text-secondary tracking-tight">Login to Canteen.</h1>
                    <p className="text-text-muted mt-3 font-medium">Welcome back! Please enter your details.</p>
                </div>

                {error && (
                    <div className="bg-red-50 text-red-600 p-4 rounded-2xl mb-6 font-bold text-center border-2 border-red-100 italic">
                        {error}
                    </div>
                )}

                <form className="space-y-6" onSubmit={handleSubmit}>
                    <div>
                        <label className="block text-sm font-black text-secondary uppercase tracking-widest mb-2">Email Address</label>
                        <input
                            type="email"
                            required
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            placeholder="name@campus.com"
                            className="w-full px-6 py-4 rounded-2xl bg-surface border-2 border-transparent focus:border-primary/20 focus:bg-white outline-none transition-all font-bold text-lg"
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-black text-secondary uppercase tracking-widest mb-2">Password</label>
                        <input
                            type="password"
                            required
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            placeholder="••••••••"
                            className="w-full px-6 py-4 rounded-2xl bg-surface border-2 border-transparent focus:border-primary/20 focus:bg-white outline-none transition-all font-bold text-lg"
                        />
                    </div>

                    <button
                        disabled={loading}
                        className="w-full bg-primary hover:bg-primary-dark text-white py-5 rounded-2xl font-black text-xl shadow-xl shadow-primary/20 flex items-center justify-center gap-3 transition-all hover:-translate-y-1 disabled:opacity-50"
                    >
                        {loading ? 'Signing In...' : 'Sign In'} <ArrowRight size={24} />
                    </button>
                </form>

                <div className="mt-10 text-center">
                    <p className="text-text-muted font-bold">
                        New to Canteen? <Link to="/signup" className="text-primary hover:underline">Create an account</Link>
                    </p>
                </div>
            </motion.div>
        </div>
    );
};

export default Login;
