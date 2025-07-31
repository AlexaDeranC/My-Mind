import React, { useContext, useState, useEffect } from 'react';
import styles from './Home.module.css';
import moonLogo from '../../assets/images/logo/crescent-moon.png';
import Greeting from '../../components/Greeting';
import EmotionSelector from '../../mood/EmotionSelector/EmotionSelector';
import AffirmationCard from '../../mood/AffirmationCard/AffirmationCard';
import WeatherWidget from '../../weather/WeatherWidget/WeatherWidget';
import TaskManager from "../../tasks/TaskManager/TaskManager";
import BottomNav from '../../components/Navigation/BottomNav';

import { AppContext } from '../../context/AppContext';

const Home = () => {
  const { selectedEmotion } = useContext(AppContext);

  const [tasks, setTasks] = useState(() => {
    const saved = localStorage.getItem('lunarTasks');
    return saved ? JSON.parse(saved) : [];
  });

  useEffect(() => {
    localStorage.setItem('lunarTasks', JSON.stringify(tasks));
  }, [tasks]);

  const mediumPriorityTasks = tasks.filter(
    (task) => task.priority === 'Medium' && task.completed !== 'Yes'
  );

  const highPriorityTasks = tasks.filter(
    (task) => task.priority === 'High' && task.completed !== 'Yes'
  );

  return (
    <div className={`${styles.homeContainer} ${styles[selectedEmotion]}`}>
      <div className={styles.logoWrapper}>
        <img src={moonLogo} alt="Crescent Moon" className={styles.moonImage} />
        <h1 className={styles.appTitle}>Pages of Me</h1>
      </div>

      <Greeting />
      <EmotionSelector />
      <AffirmationCard />

      <div className={styles.taskRowLayout}>
        <div className={styles.leftColumn}>
          <WeatherWidget />
        </div>

        <div className={styles.centerColumn}>
          <h3> ⁑ Medium</h3>
          {mediumPriorityTasks.length > 0 ? (
            mediumPriorityTasks.map((task, i) => (
              <div key={i} className={styles.taskCard}>
                <p><strong>{task.task}</strong></p>
                <p>Duration: {task.duration} min</p>
              </div>
            ))
          ) : (
            <p>No tasks</p>
          )}
        </div>

        <div className={styles.rightColumn}>
          <h3> ⁂ High</h3>
          {highPriorityTasks.length > 0 ? (
            highPriorityTasks.map((task, i) => (
              <div key={i} className={styles.taskCard}>
                <p><strong>{task.task}</strong></p>
                <p>Duration: {task.duration} min</p>
              </div>
            ))
          ) : (
            <p>No tasks</p>
          )}
        </div>
      </div>

      <section className={styles.taskSection}>
        <h2 className={styles.sectionTitle}>Tasks ₍ᐢ. ̫.ᐢ₎ </h2>
        <TaskManager tasks={tasks} setTasks={setTasks} />
      </section>

      <BottomNav />
    </div>
  );
};

export default Home;