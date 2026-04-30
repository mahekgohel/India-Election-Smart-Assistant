# 🇮🇳 India Election Smart Assistant

## 1. Project Overview
India Election Smart Assistant is an AI-powered, highly interactive web application designed to help Indian citizens understand and complete the entire election process. It acts as a personalized, step-by-step guide, answering questions, providing official ECI guidelines, and helping users navigate the complexities of voter registration, eligibility, and polling locations.

## 2. India Election Context
India is the world's largest democracy, with hundreds of millions of eligible voters. The election process, governed by the Election Commission of India (ECI), involves multiple steps from registration (NVSP portal) to checking the voter list, finding polling booths, and casting the vote. The sheer scale and complexity often leave new voters or migrants confused about the process.

## 3. Problem Statement
Many citizens, especially first-time voters or individuals who have recently relocated, find the voting process intimidating. Finding accurate information about voter ID registration, polling booth locations, eligibility criteria, and key dates is often difficult and fragmented across multiple portals. There is a need for a unified, intelligent assistant that provides clear, neutral, and accessible guidance.

## 4. Solution Approach
The **India Election Smart Assistant** solves this by providing a unified, conversational interface powered by Google Gemini. It personalizes the experience based on user demographics (Age, State, First-time voter status) and provides step-by-step guidance. Integrations with Google Maps and Google Calendar enhance usability by making it easy to find polling stations and remember key dates.

## 5. Architecture
The application uses a modern full-stack architecture:
- **Frontend**: React.js with Tailwind CSS for a highly responsive, accessible, and clean UI.
- **Backend**: Node.js and Express.js providing robust RESTful APIs to interface with frontend clients and third-party services.
- **Database**: Firebase Firestore for storing user preferences, registration progress, and chat context.
- **Authentication**: Firebase Authentication supporting Google Sign-in.

## 6. Google Services Integration
- **Google Gemini API**: Powers the conversational assistant to answer election queries intelligently in multiple languages.
- **Google Maps API**: Provides the "Polling Booth Locator" with maps, directions, and travel times.
- **Google Calendar API**: Enables users to add important election events (registration deadlines, voting days) directly to their calendars.
- **Google Translate API**: Provides seamless translation for regional language support.
- **Firebase**: Used for Auth and Firestore database.

## 7. Features
- **🤖 AI Conversational Assistant**: Natural language chat with Gemini.
- **🧠 Smart Personalization Engine**: Customized eligibility and timeline based on user details.
- **🗺️ Polling Booth Locator**: Find nearby stations using Google Maps.
- **📅 Calendar Integration**: Add election events to Google Calendar.
- **🪜 Step-by-Step Guide**: Interactive checklist for the voting process.
- **📊 Dynamic Timeline**: Visual representation of election phases.
- **♿ Accessibility**: High contrast UI, text-to-speech, voice input.

## 8. Setup Instructions
### Prerequisites
- Node.js (v18 or higher)
- npm or yarn
- Firebase Account
- Google Cloud Console Project (with Gemini, Maps, Calendar, Translate APIs enabled)

## 9. How to run locally
1. Clone the repository.
2. Setup the **Backend**:
   ```bash
   cd backend
   npm install
   cp .env.example .env # Update with your API keys
   npm run dev
   ```
3. Setup the **Frontend**:
   ```bash
   cd frontend
   npm install
   cp .env.example .env # Update with your Firebase/API keys
   npm start
   ```

## 10. Assumptions
- Mock election timeline data may be used if real-time ECI APIs are unavailable.
- Information provided by the assistant is subject to ECI's official announcements.

## 11. Future Scope
- **Live Queue Tracking**: Integration with crowd-sourced or official APIs to show wait times at polling booths.
- **Candidate Information**: Neutral, factual profiles of candidates based on official affidavits.
- **Voter Ride Sharing**: Integrating with local transport to help elderly/disabled voters reach booths.
