import { useContext } from 'react';
import { AppContext } from '../context/AppContext';
import styles from './Greeting.module.css';

export default function Greeting() {
  const { appState } = useContext(AppContext);
  const name = appState.userName || 'friend';
  const emotion = appState.selectedEmotion;

  const message = emotion
    ? `Hello ${name}, you are feeling ${emotion}.`
    : `Hello ${name}, how are you feeling today?`;

  return (
    <div className={styles.greeting}>
      <h2>{message}</h2>
    </div>
  );
}
