import React, { useContext } from 'react';
import { AppContext } from '../../context/AppContext';
import styles from './MoodCalendar.module.css';

// Nested mood colors by primary and secondary moods
const moodColors = {
  Happy: {
    Joyful: '#FFE5A3',
    Excited: '#FFD97D',
    Proud: '#E6C16A',
    Grateful: '#CCAD58',
  },
  Sad: {
    Lonely: '#C3CAD9',
    Heartbroken: '#A6B1C3',
    Tired: '#8A96AD',
    Disappointed: '#6E7B97',
  },
  Angry: {
    Irritated: '#E6A6B0',
    Frustrated: '#D88C9A',
    Fuming: '#BF7280',
    Annoyed: '#A45867',
  },
  'Stressed/Fear': {
    Anxious: '#B9D0CC',
    Overwhelmed: '#A7BCB9',
    Panicked: '#8EA89F',
    Worried: '#768584',
  },
  Surprise: {
    Shocked: '#F7C3A7',
    Amazed: '#F3A683',
    Speechless: '#D88B6C',
    Intrigued: '#B37156',
  },
  Neutral: {
    Calm: '#7A8850',
    Blank: '#606C38',
    Fine: '#505A2F',
    Meh: '#404724',
  },
};

const daysOfWeek = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

const MoodCalendar = () => {
  const { moodLogs } = useContext(AppContext);

 
  const last28Days = Array.from({ length: 28 }, (_, i) => {
    const date = new Date();
    date.setDate(date.getDate() - (27 - i)); 
    const iso = date.toISOString().slice(0, 10); 
    return {
      date: iso,
      day: date.getDay(), 
      number: date.getDate(),
    };
  });

  // Get the color for the given date based on moodLogs
  const getMoodColor = (date) => {
    const log = moodLogs.find((entry) => entry.date === date);
    if (!log) return '#eee'; // default light grey for no mood logged

    const primaryMood = log.primaryMood;
    const secondaryMood = log.secondaryMood;

    if (primaryMood && secondaryMood && moodColors[primaryMood]) {
      // Try to get color for secondary mood, fallback to a base color or default
      return moodColors[primaryMood][secondaryMood] || moodColors[primaryMood]['Excited'] || '#ccc';
    }

    // Fallback color if mood info incomplete
    return '#ccc';
  };

  return (
    <div className={styles.calendarWrapper}>
      <h3 className={styles.heading}>Last 4 Weeks</h3>

      {/* Day labels on top */}
      <div className={styles.daysRow}>
        {daysOfWeek.map((day) => (
          <div key={day} className={styles.dayLabel}>{day}</div>
        ))}
      </div>

      {/* Wrapper for week numbers + mood grid */}
      <div className={styles.gridWrapper}>
        {/* Week numbers on left side */}
        <div className={styles.weekColumn}>
          {[1, 2, 3, 4].map((week) => (
            <div key={week} className={styles.weekLabel}>{week}</div>
          ))}
        </div>

        {/* Mood grid */}
        <div className={styles.grid}>
          {last28Days.map((dayObj, i) => (
            <div
              key={i}
              className={styles.daySquare}
              style={{ backgroundColor: getMoodColor(dayObj.date) }}
              title={`${dayObj.date}`}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default MoodCalendar;
