// src/weather/WeatherWidget/WeatherWidget.jsx

import { useEffect, useState } from 'react';
import styles from './WeatherWidget.module.css';

export default function WeatherWidget() {
  const [data, setData] = useState(null);

 useEffect(() => {
  const mockOptions = [
    {
      weather: 'Cloudy',
      temperature: '66°F',
      icon: '☁',
      moonPhase: 'Waning Gibbous',
    },
    {
      weather: 'Rain Showers',
      temperature: '58°F',
      icon: '🌦',
      moonPhase: 'New Moon',
    },
    {
      weather: 'Mostly Sunny',
      temperature: '75°F',
      icon: '☼',
      moonPhase: 'Waxing Crescent',
    },
    {
      weather: 'Thunderstorms',
      temperature: '71°F',
      icon: '⛈',
      moonPhase: 'Full Moon',
    },
    {
      weather: 'Partly Cloudy',
      temperature: '70°F',
      icon: '🌥',
      moonPhase: 'First Quarter',
    },
    {
      weather: 'Foggy',
      temperature: '62°F',
      icon: '🌫',
      moonPhase: 'Last Quarter',
    },
    {
      weather: 'Snowy',
      temperature: '32°F',
      icon: '❆',
      moonPhase: 'Waning Crescent',
    },
    {
      weather: 'Clear Night',
      temperature: '60°F',
      icon: '☆',
      moonPhase: 'Waxing Gibbous',
    },
  ];

   
    const random = mockOptions[Math.floor(Math.random() * mockOptions.length)];


    setTimeout(() => {
      setData(random);
    }, 500);
  }, []);

  if (!data) return <div className={styles.loading}>Loading widget...</div>;

  return (
    <div className={styles.widgetWrapper}>
      <div className={styles.circleWidget}>
        <div className={styles.weatherSection}>
          <span className={styles.weatherIcon}>{data.icon}</span>
          <p className={styles.temperature}>{data.temperature}</p>
          <p className={styles.weatherText}>{data.weather}</p>
        </div>
        <div className={styles.moonSection}>
          <p className={styles.moonLabel}>Moon Phase</p>
          <p className={styles.moonPhase}>{data.moonPhase}</p>
        </div>
      </div>
    </div>
  );
}
