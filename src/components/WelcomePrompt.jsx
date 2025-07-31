import { useState, useContext, useEffect } from 'react';
import { AppContext } from '../context/AppContext';
import styles from './WelcomePrompt.module.css';  // Import CSS module

export default function WelcomePrompt() {
  const { appState, setAppState } = useContext(AppContext);
  const [name, setName] = useState('');
  const [birthday, setBirthday] = useState('');
  const [showPrompt, setShowPrompt] = useState(false);

  useEffect(() => {
    const storedName = localStorage.getItem('userName');
    const storedBirthday = localStorage.getItem('userBirthday');

    if (!storedName || !storedBirthday) {
      setShowPrompt(true);
    } else {
      setAppState(prev => ({
        ...prev,
        userName: storedName,
        userBirthday: storedBirthday,
      }));
      setShowPrompt(false);
    }
  }, [setAppState]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!name || !birthday) {
      alert('Please enter your name and birthday');
      return;
    }

    localStorage.setItem('userName', name);
    localStorage.setItem('userBirthday', birthday);

    setAppState(prev => ({
      ...prev,
      userName: name,
      userBirthday: birthday,
    }));

    setShowPrompt(false);
  };

  if (!showPrompt) return null;

  return (
    <div className={styles['welcome-prompt-overlay']}>
      <div className={styles['welcome-prompt']}>
        <h2>Welcome to Lunar Mind 🌙</h2>
        <form onSubmit={handleSubmit}>
          <label htmlFor="name">What’s your name?</label>
          <input
            id="name"
            type="text"
            value={name}
            onChange={e => setName(e.target.value)}
            required
            autoFocus
          />

          <label htmlFor="birthday">Birthday</label>
          <input
            id="birthday"
            type="date"
            value={birthday}
            onChange={e => setBirthday(e.target.value)}
            required
          />

          <button type="submit">Let’s get started!</button>
        </form>
      </div>
    </div>
  );
}
