import React from 'react';
import styles from './CozyCorner.module.css';

const AsmrToggle = ({ current, onChange }) => {
  const options = [
    { label: 'Rain 🌧️', value: 'rain' },
    { label: 'Fire 🔥', value: 'fire' },
    { label: 'Night 🌙', value: 'night' },
    { label: 'Off ❌', value: null },
  ];

  return (
    <div className={styles.asmrToggle}>
      {options.map(({ label, value }) => (
        <button 
          key={value || 'off'} 
          className={`${styles.asmrBtn} ${current === value ? styles.active : ''}`}
          onClick={() => onChange(value)}
        >
          {label}
        </button>
      ))}
    </div>
  );
};

export default AsmrToggle;
