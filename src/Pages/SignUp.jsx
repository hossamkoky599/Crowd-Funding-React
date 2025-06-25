import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Mail, Lock, User, ArrowRight } from 'lucide-react';
import axios from 'axios';


function SignUp() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log({ name, email, password });
  };

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9, y: 20 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      transition={{ duration: 0.5, ease: 'easeOut' }}
      className="min-h-screen flex items-center justify-center bg-gradient-to-r from-pink-500 via-red-500 to-yellow-500 p-6"
    >
      <form
        onSubmit={handleSubmit}
        className="bg-white rounded-3xl shadow-xl max-w-md w-full p-10"
      >
        <h2 className="text-4xl font-extrabold text-gray-900 mb-8 text-center">
          Join Us!
        </h2>

        {/* Name */}
        <label className="block mb-4">
          <div className="flex items-center text-pink-600 mb-1">
            <User />
            <span className="ml-2 font-semibold">Full Name</span>
          </div>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Your full name"
            required
            className="w-full border-2 border-pink-300 rounded-xl px-4 py-2 transition-colors focus:border-pink-600 focus:outline-none"
          />
        </label>

        {/* Email */}
        <label className="block mb-4">
          <div className="flex items-center text-red-600 mb-1">
            <Mail />
            <span className="ml-2 font-semibold">Email Address</span>
          </div>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="you@example.com"
            required
            className="w-full border-2 border-red-300 rounded-xl px-4 py-2 transition-colors focus:border-red-600 focus:outline-none"
          />
        </label>

        {/* Password */}
        <label className="block mb-6">
          <div className="flex items-center text-yellow-600 mb-1">
            <Lock />
            <span className="ml-2 font-semibold">Password</span>
          </div>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Create a password"
            required
            className="w-full border-2 border-yellow-300 rounded-xl px-4 py-2 transition-colors focus:border-yellow-600 focus:outline-none"
          />
        </label>

        <button
          type="submit"
          className="w-full bg-gradient-to-r from-pink-500 via-red-500 to-yellow-500 text-white font-bold py-3 rounded-2xl shadow-lg hover:brightness-110 transition"
        >
          Sign Up <ArrowRight className="inline ml-2" size={20} />
        </button>
      </form>
    </motion.div>
  );
}

export default SignUp;
