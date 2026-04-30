import React, { useState } from 'react';
import axios from 'axios';
import PersonalizationEngine from '../components/PersonalizationEngine';
import VoterChecklist from '../components/VoterChecklist';
import ChatAssistant from '../components/ChatAssistant';
import AddToCalendarButton from '../components/AddToCalendarButton';
import AuthLogin from '../components/AuthLogin';
import { motion, AnimatePresence } from 'framer-motion';
import { Info, CheckCircle2, LogOut, Calendar } from 'lucide-react';

const Dashboard = () => {
  const [authStepPassed, setAuthStepPassed] = useState(false);
  const [userData, setUserData] = useState(null); 
  const [dashboardData, setDashboardData] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const handleGuest = () => {
    setAuthStepPassed(true);
  };

  const handleLogout = () => {
    setAuthStepPassed(false);
    setUserData(null);
    setDashboardData(null);
  };

  const handlePersonalize = async (data) => {
    setUserData(data);
    setIsLoading(true);
    try {
      const res = await axios.post('http://localhost:5000/api/election/dashboard', data);
      setDashboardData(res.data);
    } catch (error) {
      console.error("Error fetching dashboard data", error);
      alert("Failed to connect to backend. Please ensure the Node server is running on port 5000.");
    }
    setIsLoading(false);
  };

  const toggleChecklistStep = (id) => {
    setDashboardData(prev => ({
      ...prev,
      checklist: prev.checklist.map(item => 
        item.id === id 
          ? { ...item, status: item.status === 'completed' ? 'pending' : 'completed' } 
          : item
      )
    }));
  };

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
      {/* Decorative background blobs */}
      <div className="absolute top-0 left-0 w-full h-96 bg-gradient-to-b from-blue-100 to-transparent opacity-50 pointer-events-none"></div>

      <div className="max-w-4xl mx-auto relative z-10">
        
        {/* Header */}
        <div className="text-center mb-10 relative">
          {authStepPassed && (
            <button onClick={handleLogout} className="absolute right-0 top-0 text-gray-500 hover:text-gray-800 flex items-center text-sm font-medium">
              <LogOut className="w-4 h-4 mr-1"/> Exit
            </button>
          )}
          <h1 className="text-4xl font-extrabold text-gray-900 tracking-tight mb-2">
            🇮🇳 India Election Smart Assistant
          </h1>
          <p className="text-lg text-gray-500">Your personalized guide to participating in the world's largest democracy.</p>
        </div>

        <AnimatePresence mode="wait">
          {!authStepPassed ? (
            <motion.div key="auth" exit={{ opacity: 0, y: -20 }}>
              <AuthLogin onGuest={handleGuest} />
            </motion.div>
          ) : !userData ? (
            <motion.div key="form" exit={{ opacity: 0, y: -20 }}>
              <PersonalizationEngine onSubmit={handlePersonalize} />
              {isLoading && <p className="text-center mt-4 text-blue-600 font-medium animate-pulse">Loading your personalized guide...</p>}
            </motion.div>
          ) : dashboardData ? (
            <motion.div 
              key="dashboard" 
              initial={{ opacity: 0, y: 20 }} 
              animate={{ opacity: 1, y: 0 }}
              className="space-y-8"
            >
              {/* Dashboard Header Status */}
              <div className="bg-white rounded-3xl p-8 shadow-xl overflow-hidden border border-gray-100 flex flex-col md:flex-row items-center justify-between gap-6">
                <div>
                  <h2 className="text-3xl font-bold text-gray-900 tracking-tight">
                    {userData.isFirstTimeVoter ? '✨ First-Time Voter Journey' : '✅ Voter Journey'}
                  </h2>
                  <p className="text-gray-500 mt-2 text-lg">
                    State: <span className="font-semibold text-gray-700">{userData.state}</span> | Age: <span className="font-semibold text-gray-700">{userData.age}</span>
                  </p>
                </div>
                
                {dashboardData.eligibility.isEligible ? (
                  <div className="bg-green-50 text-green-700 px-6 py-3 rounded-2xl font-bold border border-green-200 flex items-center shadow-sm">
                    <CheckCircle2 className="w-6 h-6 mr-2" /> Eligible to Vote
                  </div>
                ) : (
                  <div className="bg-yellow-50 text-yellow-700 px-6 py-3 rounded-2xl font-bold border border-yellow-200 flex items-center shadow-sm">
                    <Info className="w-6 h-6 mr-2" /> Not Eligible Yet
                  </div>
                )}
              </div>

              {/* Action Buttons row */}
              {dashboardData.eligibility.isEligible && dashboardData.upcomingElections && dashboardData.upcomingElections.length > 0 && (
                <div className="flex justify-end mb-4">
                  <AddToCalendarButton 
                    eventDetails={{
                      title: `${dashboardData.upcomingElections[0].electionType} Voting Day 🇮🇳`,
                      description: 'Remember to cast your vote and carry your valid ID (EPIC)!',
                      startDate: new Date(new Date().getTime() + 7 * 24 * 60 * 60 * 1000).toISOString(),
                    }}
                  />
                </div>
              )}

              {/* Checklist Section */}
              <div className="bg-white p-8 rounded-3xl shadow-xl border border-gray-100">
                <h3 className="text-2xl font-bold text-gray-900 mb-6 flex items-center">
                  Your Step-by-Step Guide
                </h3>
                <VoterChecklist 
                  checklist={dashboardData.checklist} 
                  toggleStep={toggleChecklistStep} 
                />
              </div>

              {/* Reset Button */}
              <div className="text-center mt-12 pb-12">
                <button 
                  onClick={() => setUserData(null)}
                  className="text-gray-500 hover:text-gray-800 font-medium transition-colors border border-gray-200 px-6 py-2 rounded-full hover:bg-white shadow-sm"
                >
                  Edit Personalization
                </button>
              </div>

              {/* AI Chat Widget */}
              <ChatAssistant userContext={userData} />

            </motion.div>
          ) : null}
        </AnimatePresence>
      </div>
    </div>
  );
};

export default Dashboard;
