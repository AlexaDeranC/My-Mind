// context/AppContext.jsx
import { createContext, useState, useEffect } from 'react';

export const AppContext = createContext();

export function AppProvider({ children }) {
  const [appState, setAppState] = useState(() => {
    const savedTheme = localStorage.getItem('themeMode') || 'light';
    return {
      selectedEmotion: 'neutral',
      themeMode: savedTheme,
    };
  });

  useEffect(() => {
    localStorage.setItem('themeMode', appState.themeMode);
    document.body.className = ''; // Reset all classes
    document.body.classList.add(appState.themeMode);
    document.body.classList.add(appState.selectedEmotion);
  }, [appState.themeMode, appState.selectedEmotion]);

  const setSelectedEmotion = (emotion) => {
    setAppState((prev) => ({ ...prev, selectedEmotion: emotion }));
  };

  const setThemeMode = (mode) => {
    setAppState((prev) => ({ ...prev, themeMode: mode }));
  };

  return (
    <AppContext.Provider
      value={{
        appState,
        setAppState,
        setSelectedEmotion,
        setThemeMode,
        selectedEmotion: appState.selectedEmotion,
        themeMode: appState.themeMode,
      }}
    >
      {children}
    </AppContext.Provider> ); }