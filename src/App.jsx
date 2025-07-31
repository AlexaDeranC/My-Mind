import React from 'react';
import { Routes, Route } from 'react-router-dom';  
import { AppProvider } from './context/AppContext';

import Layout from './components/Layout/Layout';
import Home from './pages/Home/Home';
import ProfilePage from './pages/ProfilePage/ProfilePage';
import MoodBoard from './pages/MoodBoardPage/MoodBoard';
import Journal from './pages/JournalPage/Journal';
import AllEntries from './pages/JournalPage/AllEntries';
import WelcomePrompt from './components/WelcomePrompt';
import CozyCorner from './pages/CozyCorner/CozyCorner';

function App() {
  return (
    <AppProvider>
      <Routes>
        <Route path="/" element={<Layout />}>
    <Route index element={<Home />} />
    <Route path="journal" element={<Journal />} />
    <Route path="all-entries" element={<AllEntries />} />

          <Route path="moodboard" element={<MoodBoard />} />
          <Route path="mood" element={<MoodBoard />} />
          <Route path="profile" element={<ProfilePage />} />
          <Route path="cozycorner" element={<CozyCorner />} />
        </Route>
      </Routes>
      <WelcomePrompt />
    </AppProvider>
  );
}

export default App;
