// src/mood/AffirmationCard/AffirmationCard.jsx
import { useContext, useState, useEffect } from 'react';
import { AppContext } from '../../context/AppContext';
import styles from './AffirmationCard.module.css';

const affirmationsByEmotion = {
  Happy: [
    "I am basking in the joy of this moment.",
    "Happiness flows through me with ease.",
    "I am grateful for today’s joy.",
    "My smile is a reflection of my inner peace.",
    "I attract positive energy effortlessly.",
    "Joy is my natural state.",
    "I spread happiness wherever I go.",
    "I celebrate the little things.",
    "Today is full of potential and laughter.",
    "My heart is light and open to joy."
  ],
  Sad: [
    "It’s okay to feel what I feel.",
    "My emotions are valid and temporary.",
    "Healing begins with gentleness toward myself.",
    "I give myself permission to rest and recover.",
    "I am never alone in how I feel.",
    "Sadness is a sign of my depth and compassion.",
    "I allow space for my healing to unfold.",
    "This moment is not forever.",
    "I am allowed to take it slow.",
    "Tears are healing and necessary."
  ],
  Anger: [
    "I acknowledge my anger without letting it control me.",
    "I am safe and grounded.",
    "I choose peace in this moment.",
    "My breath helps me release tension.",
    "I am in control of how I respond.",
    "I channel my anger into positive action.",
    "I am allowed to feel frustrated without shame.",
    "My calm is more powerful than my rage.",
    "I respond with wisdom, not impulse.",
    "Every breath brings me closer to clarity."
  ],
  Fear: [
    "I am stronger than I think.",
    "I can do this, even if I’m scared.",
    "Courage lives inside me.",
    "I release what I cannot control.",
    "Step by step, I rise above fear.",
    "Fear is just a feeling — not a fact.",
    "I trust the process of life.",
    "I am brave even when I tremble.",
    "With every breath, I grow steadier.",
    "I am grounded in the present moment."
  ],
  Surprise: [
    "I welcome the unexpected with curiosity.",
    "Life’s surprises help me grow.",
    "I adapt and thrive through change.",
    "I find peace in uncertainty.",
    "Every twist holds new possibility.",
    "The unknown holds magic and wonder.",
    "I am open to unexpected joy.",
    "Change leads to transformation.",
    "I trust life’s surprises will serve me.",
    "I explore the unfamiliar with courage."
  ],
  Neutral: [
    "Stillness is sacred.",
    "I honor this calm moment.",
    "Neutral does not mean numb.",
    "Even in quiet, I am growing.",
    "Today, I simply exist — and that’s enough.",
    "Balance brings peace.",
    "This pause has purpose.",
    "I am grounded in this simple moment.",
    "I trust the rhythm of my day.",
    "Calm is a gift I give myself."
  ]
};

export default function AffirmationCard() {
  const { appState } = useContext(AppContext);
  const emotion = appState.selectedEmotion || 'neutral';
  const affirmations = affirmationsByEmotion[emotion] || [];

  const [currentAffirmation, setCurrentAffirmation] = useState('');

  useEffect(() => {
    if (affirmations.length > 0) {
      const random = affirmations[Math.floor(Math.random() * affirmations.length)];
      setCurrentAffirmation(random);
    }
  }, [emotion]); // regenerate when emotion changes

  const handleNewAffirmation = () => {
    const random = affirmations[Math.floor(Math.random() * affirmations.length)];
    setCurrentAffirmation(random);
  };

  return (
    <div className={styles.card}>
  <p className={styles.text}>
  {currentAffirmation.split('').map((char, i) => (
    <span key={i} style={{ whiteSpace: char === ' ' ? 'pre' : 'normal' }}>
      {char}
    </span>
  ))}
</p>

      {affirmations.length > 1 && (
        <button onClick={handleNewAffirmation} className={styles.button}>Show another</button>
      )}
    </div>
  );
}
