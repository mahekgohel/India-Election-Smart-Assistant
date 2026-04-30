import React from 'react';
import { motion } from 'framer-motion';

const AuthLogin = ({ onGuest }) => {
  return (
    <motion.div 
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      className="max-w-md w-full mx-auto bg-white rounded-3xl shadow-xl overflow-hidden border border-gray-100 p-8 text-center"
    >
      <div className="bg-blue-100 w-20 h-20 mx-auto rounded-full flex items-center justify-center mb-6 shadow-inner">
        <span className="text-4xl">🇮🇳</span>
      </div>
      <h2 className="text-3xl font-bold text-gray-900 mb-3">Welcome Voter!</h2>
      <p className="text-gray-500 mb-8 text-md leading-relaxed">Your personalized guide to participating in the world's largest democracy. Get all the details about your polling booth, election dates, and voter ID.</p>
      
      <button 
        onClick={onGuest}
        className="w-full flex items-center justify-center gap-2 bg-blue-600 hover:bg-blue-700 text-white font-bold py-4 px-4 rounded-xl transition-all shadow-md hover:shadow-lg transform hover:-translate-y-1"
      >
        Get Started Now
      </button>
    </motion.div>
  );
};

export default AuthLogin;
