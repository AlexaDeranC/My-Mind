import { useContext } from 'react';
import { AppContext } from '../../context/AppContext';
import styles from './EmotionSelector.module.css';

import HappyImg from '../../assets/images/emotions/Happy.png';
import SadImg from '../../assets/images/emotions/Sad.png';
import AngerImg from '../../assets/images/emotions/Anger.png';
import FearImg from '../../assets/images/emotions/Fear.png';
import SurpriseImg from '../../assets/images/emotions/Surprise.png';
import NeutralImg from '../../assets/images/emotions/Neutral.png';

const emotions = [
  { name: 'Neutral', img: NeutralImg },
  { name: 'Happy', img: HappyImg },
  { name: 'Sad', img: SadImg },
  { name: 'Anger', img: AngerImg },
  { name: 'Fear', img: FearImg },
  { name: 'Surprise', img: SurpriseImg },
];

export default function EmotionSelector() {
  const { selectedEmotion, setSelectedEmotion } = useContext(AppContext);

  return (
    <div className={styles.selectorContainer}>
      <div className={styles.selector}>
        {emotions.map((emotion) => (
          <button
            key={emotion.name}
            className={`${styles.emotionBtn} ${
              selectedEmotion.toLowerCase() === emotion.name.toLowerCase() ? styles.active : ''
            }`}
            onClick={() => setSelectedEmotion(emotion.name)}
            aria-label={emotion.name}
          >
            <img
              src={emotion.img}
              alt={emotion.name}
              className={styles.emotionImg}
              draggable={false}
            />
            <span className={styles.emotionLabel}>{emotion.name}</span>
          </button>
        ))}
      </div>
    </div>
  );
}
