import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { CheckCircle2, Circle, AlertCircle, ExternalLink, MapPin } from 'lucide-react';
import PollingBoothMap from './PollingBoothMap';

const VoterChecklist = ({ checklist, toggleStep }) => {
  const [showMap, setShowMap] = useState(false);

  if (!checklist || checklist.length === 0) return null;

  return (
    <div className="space-y-4">
      {checklist.map((item, index) => {
        const isWarning = item.status === 'warning';
        const isCompleted = item.status === 'completed';
        
        return (
          <motion.div
            key={item.id}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: index * 0.1, duration: 0.4 }}
            className={`p-5 rounded-2xl border-2 transition-all ${
              isWarning 
                ? 'bg-red-50 border-red-200' 
                : isCompleted 
                  ? 'bg-green-50 border-green-200' 
                  : 'bg-white border-gray-100 hover:border-blue-200 hover:shadow-md'
            }`}
          >
            <div className="flex items-start gap-4">
              {/* Checkbox / Status Icon */}
              <button 
                onClick={() => !isWarning && toggleStep(item.id)}
                className="mt-1 focus:outline-none flex-shrink-0"
                disabled={isWarning}
              >
                {isWarning ? (
                  <AlertCircle className="w-7 h-7 text-red-500" />
                ) : isCompleted ? (
                  <CheckCircle2 className="w-7 h-7 text-green-500" />
                ) : (
                  <Circle className="w-7 h-7 text-gray-300 hover:text-blue-400 transition-colors" />
                )}
              </button>

              {/* Content */}
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-1">
                  <span className={`text-xs font-bold px-2 py-0.5 rounded-full ${
                    isWarning ? 'bg-red-100 text-red-700' : 'bg-blue-100 text-blue-700'
                  }`}>
                    Step {item.step}
                  </span>
                  <h3 className={`font-semibold text-lg ${
                    isWarning ? 'text-red-900' : isCompleted ? 'text-gray-900 line-through opacity-70' : 'text-gray-900'
                  }`}>
                    {item.title}
                  </h3>
                </div>
                
                <p className={`text-sm mt-2 leading-relaxed ${
                  isWarning ? 'text-red-700' : isCompleted ? 'text-gray-500' : 'text-gray-600'
                }`}>
                  {item.description}
                </p>

                {/* Action Buttons / Links */}
                {item.link && !isCompleted && (
                  <a 
                    href={item.link} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1 mt-3 text-sm font-medium text-blue-600 hover:text-blue-800 transition-colors"
                  >
                    Open Portal <ExternalLink className="w-4 h-4" />
                  </a>
                )}

                {/* Mock Maps Integration Button for Polling Booth */}
                {item.id === 'find_polling_booth' && !isCompleted && (
                  <div className="mt-3">
                    <button 
                      onClick={() => setShowMap(!showMap)}
                      className="inline-flex items-center gap-1 text-sm font-medium text-indigo-600 bg-indigo-50 px-3 py-1.5 rounded-lg hover:bg-indigo-100 transition-colors"
                    >
                      <MapPin className="w-4 h-4" /> {showMap ? 'Hide Map' : 'Open Maps Locator'}
                    </button>
                    {showMap && <PollingBoothMap />}
                  </div>
                )}
              </div>
            </div>
          </motion.div>
        );
      })}
    </div>
  );
};

export default VoterChecklist;
