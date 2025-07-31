import React, { useState, useEffect } from 'react';
import styles from './MoodBoard.module.css';



const emotionColors = {
  Happy: '#FFD97D',
  Sad: '#A5C9FF',
  Angry: '#FF9AA2',
  Anxious: '#CBAACB',
  Surprised: '#FFDAC1'
};

const moodColors = {
  Happy: {
    Joyful: '#FFE599',   
    Excited: '#FFD966',  
    Content: '#FFC107',  
    Cheerful: '#FFEB3B',  // bright yellow
    Optimistic: '#FFF176'  // soft sunny yellow
  },
  Sad: {
    Lonely: '#B3AEDC',       
    Disappointed: '#9F90C3', 
    Hopeless: '#7A67AA',      
    Melancholy: '#8C7AA9',   // muted purple
    Gloomy: '#6B5B95'        // deep purple
  },
  Angry: {
    Frustrated: '#FFB3B3', 
    Irritated: '#FF7F7F',  
    Betrayed: '#E55353',    
    Resentful: '#D84315',   // dark orange-red
    Enraged: '#B71C1C'      // deep red
  },
  Anxious: {
    Worried: '#D8BFD8',    
    Overwhelmed: '#C4A3C7',
    Panic: '#A175A1',       
    Nervous: '#9C27B0',     // purple
    Uneasy: '#7B1FA2'       // dark purple
  },
  Surprised: {
    Shocked: '#FFE5B4',    
    Amazed: '#FFCC80',     
    Confused: '#FFB347',   
    Startled: '#FF9E80',   // light coral
    Bewildered: '#FF6E40'  // deeper coral
  }
};


const daysOfWeek = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];

const primaryEmotions = ['Happy', 'Sad', 'Angry', 'Anxious', 'Surprised'];

const moodOptions = {
  Happy: ['Joyful', 'Excited', 'Content', 'Cheerful', 'Optimistic'],
  Sad: ['Lonely', 'Disappointed', 'Hopeless', 'Melancholy', 'Gloomy'],
  Angry: ['Frustrated', 'Irritated', 'Betrayed', 'Resentful', 'Enraged'],
  Anxious: ['Worried', 'Overwhelmed', 'Panic', 'Nervous', 'Uneasy'],
  Surprised: ['Shocked', 'Amazed', 'Confused', 'Startled', 'Bewildered']
};

const MoodBoard = () => {
  const [selectedPrimary, setSelectedPrimary] = useState('');
  const [selectedMood, setSelectedMood] = useState('');
  const [moodByDay, setMoodByDay] = useState(() => {
    try {
      const saved = localStorage.getItem('moodByDay');
      return saved ? JSON.parse(saved) : {};
    } catch {
      return {};
    }
  });
  const [confirmation, setConfirmation] = useState('');
  const [calendarDays, setCalendarDays] = useState([]);

  // Selected day for editing mood (defaults to today)
  const [selectedDay, setSelectedDay] = useState(() => {
    const today = new Date();
    return today.getDate();
  });

  // Update localStorage whenever moodByDay changes
  useEffect(() => {
    localStorage.setItem('moodByDay', JSON.stringify(moodByDay));
  }, [moodByDay]);

  // Prepare calendar days for current month
  useEffect(() => {
    const today = new Date();
    const year = today.getFullYear();
    const month = today.getMonth();

    const firstDay = new Date(year, month, 1);
    let startWeekDay = firstDay.getDay(); // Sunday=0, Monday=1, etc.
    startWeekDay = startWeekDay === 0 ? 6 : startWeekDay - 1; // adjust Monday=0

    const daysInMonth = new Date(year, month + 1, 0).getDate();

    const daysArray = [];

    for (let i = 0; i < startWeekDay; i++) {
      daysArray.push(null);
    }

    for (let dayNum = 1; dayNum <= daysInMonth; dayNum++) {
      daysArray.push(dayNum);
    }

    while (daysArray.length < 35) {
      daysArray.push(null);
    }

    setCalendarDays(daysArray);
  }, []);

  // Update selectedMood when selectedDay or moodByDay changes
  useEffect(() => {
    const moodForDay = moodByDay[selectedDay] || '';
    setSelectedMood(moodForDay);

    // Also update selectedPrimary based on mood for that day
    const primary = getPrimaryEmotionByMood(moodForDay);
    setSelectedPrimary(primary || '');
  }, [selectedDay, moodByDay]);

  const getPrimaryEmotionByMood = (mood) => {
    for (const [emotion, moods] of Object.entries(moodOptions)) {
      if (moods.includes(mood)) return emotion;
    }
    return null;
  };

  const handlePrimaryClick = (emotion) => {
    setSelectedPrimary(emotion);
    setSelectedMood('');
    setConfirmation('');
  };

  const handleMoodClick = (mood) => {
    if (!selectedDay) return; // safety check
    setSelectedMood(mood);
    setMoodByDay(prev => ({ ...prev, [selectedDay]: mood }));
    setConfirmation(`Logged "${mood}" for day ${selectedDay}.`);
  };

  const getContrastColor = (bg) => {
    if (!bg) return '#283618';
    const hex = bg.replace('#', '');
    const r = parseInt(hex.substr(0, 2), 16);
    const g = parseInt(hex.substr(2, 2), 16);
    const b = parseInt(hex.substr(4, 2), 16);
    const luminance = (0.299 * r + 0.587 * g + 0.114 * b);
    return luminance > 186 ? '#283618' : '#fff';
  };

  const todayDate = new Date().getDate();

  return (
    <div className={styles.moodContainer}>
      <h2 className={styles.title}>Mood Board ✨</h2>

      {/* Day Selector */}
      <label style={{ marginBottom: '1rem', display: 'block' }}>
        Select Day to Edit Mood:{' '}
        <select value={selectedDay} onChange={e => setSelectedDay(Number(e.target.value))}>
          {calendarDays.filter(day => day !== null).map(day => (
            <option key={day} value={day}>
              {day} {day === todayDate ? '(Today)' : ''}
            </option>
          ))}
        </select>
      </label>

      {/* Primary Emotions */}
      <div className={styles.primaryEmotions}>
        {primaryEmotions.map((emotion) => (
          <button
            key={emotion}
            className={`${styles.primaryBtn} ${selectedPrimary === emotion ? styles.active : ''}`}
            style={{
              backgroundColor: selectedPrimary === emotion ? emotionColors[emotion] : '#d4a5c2',
              color: selectedPrimary === emotion ? '#fff' : '#283618'
            }}
            onClick={() => handlePrimaryClick(emotion)}
          >
            {emotion}
          </button>
        ))}
      </div>

      {/* Secondary Moods */}
      {selectedPrimary && (
        <div className={styles.moodGrid}>
          {moodOptions[selectedPrimary].map((mood) => (
            <button
              key={mood}
              className={`${styles.moodBtn} ${selectedMood === mood ? styles.selected : ''}`}
              onClick={() => handleMoodClick(mood)}
              style={{
               backgroundColor:
  selectedMood === mood
    ? (moodColors[selectedPrimary]?.[mood] || '#f0d9ff')
    : '#f0d9ff',

              }}
            >
              {mood}
            </button>
          ))}
        </div>
      )}

      <h3 className={styles.subtitle}>Monthly Mood Calendar</h3>

      <div className={styles.calendarGrid}>
        {daysOfWeek.map((day) => (
          <div key={day} className={styles.dayLabel}>
            {day}
          </div>
        ))}

        {calendarDays.map((day, index) => {
          const isToday = day === todayDate;
          const mood = day ? moodByDay[day] : null;
          const moodPrimary = mood ? getPrimaryEmotionByMood(mood) : null;
          const bgColor =
            day && mood
              ? (moodColors[moodPrimary]?.[mood] || emotionColors[moodPrimary])
              : '#f9f3f3';

          return (
            <div
              key={index}
              className={styles.calendarCell}
              style={{
                backgroundColor: bgColor,
                color: day ? getContrastColor(bgColor) : 'transparent',
                fontWeight: isToday ? 'bold' : 'normal',
                cursor: day ? 'pointer' : 'default'
              }}
              onClick={() => {
                if (day) {
                  setSelectedDay(day);
                  setConfirmation(`Select a mood for day ${day} using the buttons above.`);
                }
              }}
            >
              <span className={styles.dayNumber}>{day || ''}</span>
              <span className={styles.moodText}>{day ? mood || '--' : ''}</span>
            </div>
          );
        })}
      </div>

      {confirmation && <p className={styles.confirmation}>{confirmation}</p>}
    </div>
  );
};

export default MoodBoard;
