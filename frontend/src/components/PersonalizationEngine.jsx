import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { ChevronRight, Info } from 'lucide-react';

const INDIAN_STATES = [
  "Andhra Pradesh", "Arunachal Pradesh", "Assam", "Bihar", "Chhattisgarh", "Goa", "Gujarat", "Haryana", 
  "Himachal Pradesh", "Jharkhand", "Karnataka", "Kerala", "Madhya Pradesh", "Maharashtra", "Manipur", 
  "Meghalaya", "Mizoram", "Nagaland", "Odisha", "Punjab", "Rajasthan", "Sikkim", "Tamil Nadu", "Telangana", 
  "Tripura", "Uttar Pradesh", "Uttarakhand", "West Bengal", "Delhi"
];

const PersonalizationEngine = ({ onSubmit }) => {
  const [formData, setFormData] = useState({
    age: '',
    state: '',
    isFirstTimeVoter: true
  });

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (formData.age && formData.state) {
      onSubmit({
        ...formData,
        age: parseInt(formData.age, 10)
      });
    }
  };

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="max-w-md w-full mx-auto bg-white rounded-3xl shadow-xl overflow-hidden border border-gray-100"
    >
      <div className="bg-gradient-to-r from-blue-600 to-indigo-700 p-8 text-white">
        <h2 className="text-2xl font-bold mb-2">Welcome to your Smart Assistant</h2>
        <p className="text-blue-100 text-sm">Let's personalize your voting journey. It takes less than a minute.</p>
      </div>

      <form onSubmit={handleSubmit} className="p-8 space-y-6">
        {/* Age Input */}
        <div className="space-y-2">
          <label htmlFor="age" className="block text-sm font-medium text-gray-700">
            How old are you?
          </label>
          <input
            type="number"
            id="age"
            name="age"
            min="1"
            max="120"
            required
            value={formData.age}
            onChange={handleChange}
            className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors outline-none"
            placeholder="e.g. 19"
          />
        </div>

        {/* State Selection */}
        <div className="space-y-2">
          <label htmlFor="state" className="block text-sm font-medium text-gray-700">
            Which state do you live in?
          </label>
          <select
            id="state"
            name="state"
            required
            value={formData.state}
            onChange={handleChange}
            className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors outline-none bg-white"
          >
            <option value="" disabled>Select your state</option>
            {INDIAN_STATES.map(state => (
              <option key={state} value={state}>{state}</option>
            ))}
          </select>
        </div>

        {/* First Time Voter Toggle */}
        <div className="bg-blue-50 p-4 rounded-xl border border-blue-100 flex items-start space-x-3">
          <div className="flex-1">
            <h4 className="text-sm font-semibold text-blue-900">First-Time Voter?</h4>
            <p className="text-xs text-blue-700 mt-1">We'll provide extra guidance for registering on the NVSP portal.</p>
          </div>
          <div className="relative inline-block w-12 mr-2 align-middle select-none transition duration-200 ease-in mt-1">
            <input
              type="checkbox"
              name="isFirstTimeVoter"
              id="toggle"
              checked={formData.isFirstTimeVoter}
              onChange={handleChange}
              className="toggle-checkbox absolute block w-6 h-6 rounded-full bg-white border-4 border-blue-200 appearance-none cursor-pointer transition-transform duration-300 ease-in-out"
              style={{ transform: formData.isFirstTimeVoter ? 'translateX(100%)' : 'translateX(0)', borderColor: formData.isFirstTimeVoter ? '#2563eb' : '#e5e7eb' }}
            />
            <label
              htmlFor="toggle"
              className={`toggle-label block overflow-hidden h-6 rounded-full bg-gray-200 cursor-pointer transition-colors duration-300 ease-in-out ${formData.isFirstTimeVoter ? 'bg-blue-500' : 'bg-gray-200'}`}
            ></label>
          </div>
        </div>

        <button
          type="submit"
          className="w-full py-4 bg-gray-900 hover:bg-gray-800 text-white rounded-xl font-medium flex items-center justify-center transition-colors shadow-lg shadow-gray-200"
        >
          Generate My Guide
          <ChevronRight className="w-5 h-5 ml-2" />
        </button>
      </form>
    </motion.div>
  );
};

export default PersonalizationEngine;
