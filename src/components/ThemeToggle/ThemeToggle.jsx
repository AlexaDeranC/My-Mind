// components/ThemeToggle/ThemeToggle.jsx
import React, { useContext } from 'react';
import { AppContext } from '../../context/AppContext';
import './ThemeToggle.css';

function ThemeToggle() {
  const { themeMode, toggleTheme } = useContext(AppContext);

  return (
    <button 
      className="theme-toggle"
      onClick={toggleTheme}
      aria-label={`Switch to ${themeMode === 'light' ? 'dark' : 'light'} mode`}
    >
      <span className="theme-toggle-icon">
        {themeMode === 'light' ? '🌙' : '☀️'}
      </span>
      <span className="theme-toggle-text">
        {themeMode === 'light' ? 'Dark' : 'Light'}
      </span>
    </button>
  );
}

export default ThemeToggle;