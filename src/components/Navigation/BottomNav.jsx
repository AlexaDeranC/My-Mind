import React from 'react';
import { Link } from 'react-router-dom';
import styles from './BottomNav.module.css';

const BottomNav = () => {
  return (
    <nav className={styles.bottomNav}>
      <ul>
       <li><Link to="/"> ☾ Home</Link></li>
        <li><Link to="/mood"> ☺ Mood Board</Link></li>
        <li><Link to="/journal"> 🖊 My Journal</Link></li>
        <li><Link to="/cozycorner"> ☮ Cozy Corner</Link></li>
    <li><Link to="/profile"> 𐀪 Profile</Link></li>
      </ul>
    </nav>
  );
};

export default BottomNav;