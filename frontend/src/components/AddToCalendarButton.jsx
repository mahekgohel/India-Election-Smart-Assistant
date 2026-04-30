import React, { useState } from 'react';
import { Calendar, CalendarCheck, Loader2, AlertCircle } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { addEventToCalendarAPI, generateGoogleCalendarLink } from '../utils/calendarApi';

const AddToCalendarButton = ({ eventDetails, useApiMethod = false, userToken = null }) => {
  const [status, setStatus] = useState('idle'); // idle, loading, success, error
  const [errorMessage, setErrorMessage] = useState('');

  const handleAddToCalendar = async () => {
    if (useApiMethod && userToken) {
      // Use Backend API Integration
      try {
        setStatus('loading');
        await addEventToCalendarAPI(eventDetails, userToken);
        setStatus('success');
        
        // Reset to idle after 3 seconds
        setTimeout(() => setStatus('idle'), 3000);
      } catch (error) {
        setStatus('error');
        setErrorMessage(error.message);
        setTimeout(() => setStatus('idle'), 4000);
      }
    } else {
      // Use Instant Web Link Method (Zero Friction)
      const url = generateGoogleCalendarLink(eventDetails);
      window.open(url, '_blank', 'noopener,noreferrer');
      
      // Briefly show success state for visual feedback
      setStatus('success');
      setTimeout(() => setStatus('idle'), 2000);
    }
  };

  return (
    <div className="relative inline-block">
      <motion.button
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
        onClick={handleAddToCalendar}
        disabled={status === 'loading'}
        className={`relative flex items-center justify-center px-4 py-2.5 rounded-xl font-medium text-sm transition-all shadow-sm ${
          status === 'success' 
            ? 'bg-green-100 text-green-700 border border-green-200' 
            : status === 'error'
              ? 'bg-red-100 text-red-700 border border-red-200'
              : 'bg-white border border-gray-200 text-gray-800 hover:border-blue-300 hover:text-blue-600 hover:shadow-md'
        }`}
      >
        <AnimatePresence mode="wait">
          {status === 'idle' && (
            <motion.div
              key="idle"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="flex items-center"
            >
              <Calendar className="w-4 h-4 mr-2 text-blue-500" />
              Add to Calendar
            </motion.div>
          )}

          {status === 'loading' && (
            <motion.div
              key="loading"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="flex items-center"
            >
              <Loader2 className="w-4 h-4 mr-2 animate-spin text-blue-500" />
              Syncing...
            </motion.div>
          )}

          {status === 'success' && (
            <motion.div
              key="success"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0 }}
              className="flex items-center"
            >
              <CalendarCheck className="w-4 h-4 mr-2 text-green-600" />
              Added Successfully!
            </motion.div>
          )}

          {status === 'error' && (
            <motion.div
              key="error"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="flex items-center"
            >
              <AlertCircle className="w-4 h-4 mr-2 text-red-500" />
              Failed to Add
            </motion.div>
          )}
        </AnimatePresence>
      </motion.button>

      {/* Error Tooltip */}
      <AnimatePresence>
        {status === 'error' && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 10 }}
            className="absolute top-full mt-2 w-48 text-center bg-red-800 text-white text-xs px-2 py-1.5 rounded-lg shadow-lg z-10 left-1/2 transform -translate-x-1/2"
          >
            {errorMessage || 'Something went wrong.'}
            {/* Tooltip arrow */}
            <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 border-4 border-transparent border-b-red-800"></div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default AddToCalendarButton;
