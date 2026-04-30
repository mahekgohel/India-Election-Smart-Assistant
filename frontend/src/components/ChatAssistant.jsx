import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MessageSquare, Send, X, Mic } from 'lucide-react';
import axios from 'axios';
import SpeechRecognition, { useSpeechRecognition } from 'react-speech-recognition';

const ChatAssistant = ({ userContext }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([{ role: 'ai', text: 'Hi! Ask me anything about the election process. I am here to help in simple terms.' }]);
  const [input, setInput] = useState('');
  
  // Accessibility: Voice Input Feature
  const { transcript, listening, resetTranscript, browserSupportsSpeechRecognition } = useSpeechRecognition();

  const handleSend = async () => {
    const textToSend = input || transcript;
    if (!textToSend.trim()) return;

    const newMsgs = [...messages, { role: 'user', text: textToSend }];
    setMessages(newMsgs);
    setInput('');
    resetTranscript();

    try {
      const res = await axios.post('http://localhost:5000/api/chat', {
        message: textToSend,
        context: userContext
      });
      setMessages([...newMsgs, { role: 'ai', text: res.data.reply }]);
    } catch (error) {
      setMessages([...newMsgs, { role: 'ai', text: 'Sorry, I am facing a technical issue right now.' }]);
    }
  };

  return (
    <div className="fixed bottom-6 right-6 z-50">
      <AnimatePresence>
        {isOpen && (
          <motion.div 
            initial={{ opacity: 0, y: 20, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.9 }}
            className="bg-white w-80 sm:w-96 rounded-2xl shadow-2xl overflow-hidden border border-gray-100 mb-4"
          >
            <div className="bg-blue-600 text-white p-4 flex justify-between items-center">
              <h3 className="font-bold flex items-center"><MessageSquare className="w-5 h-5 mr-2"/> Election Assistant</h3>
              <button onClick={() => setIsOpen(false)}><X className="w-5 h-5 hover:text-gray-200"/></button>
            </div>
            
            <div className="h-80 overflow-y-auto p-4 space-y-4 bg-gray-50">
              {messages.map((m, i) => (
                <div key={i} className={`flex ${m.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                  <div className={`p-3 rounded-2xl max-w-[80%] text-sm ${m.role === 'user' ? 'bg-blue-600 text-white rounded-br-none' : 'bg-white border shadow-sm text-gray-800 rounded-bl-none'}`}>
                    {m.text}
                  </div>
                </div>
              ))}
              {listening && (
                <div className="text-xs text-gray-400 italic">Listening...</div>
              )}
            </div>

            <div className="p-3 bg-white border-t flex items-center gap-2">
              {browserSupportsSpeechRecognition && (
                <button 
                  onClick={listening ? SpeechRecognition.stopListening : SpeechRecognition.startListening}
                  className={`p-2 rounded-full transition-colors ${listening ? 'bg-red-100 text-red-600 animate-pulse' : 'bg-gray-100 text-gray-600 hover:bg-gray-200'}`}
                >
                  <Mic className="w-5 h-5" />
                </button>
              )}
              <input 
                type="text" 
                value={input || transcript}
                onChange={(e) => setInput(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && handleSend()}
                placeholder="Ask a question..."
                className="flex-1 px-3 py-2 text-sm border rounded-xl focus:outline-none focus:border-blue-500"
              />
              <button onClick={handleSend} className="p-2 bg-blue-600 text-white rounded-xl hover:bg-blue-700">
                <Send className="w-4 h-4" />
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {!isOpen && (
        <motion.button 
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => setIsOpen(true)}
          className="bg-blue-600 text-white p-4 rounded-full shadow-2xl hover:bg-blue-700 transition-colors flex items-center justify-center"
        >
          <MessageSquare className="w-6 h-6" />
        </motion.button>
      )}
    </div>
  );
};

export default ChatAssistant;
