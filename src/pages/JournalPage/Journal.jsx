import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import styles from './Journal.module.css';

const Journal = () => {
  const [selectedMood, setSelectedMood] = useState('');
  const [prompt, setPrompt] = useState('');
  const [entry, setEntry] = useState('');
  const [entries, setEntries] = useState(() => {
    try {
      const saved = localStorage.getItem('journalEntries');
      const parsed = JSON.parse(saved);
      return Array.isArray(parsed) ? parsed : [];
    } catch {
      return [];
    }
  });

  const emotionPrompts = {
    happy: [
      "What made you smile today?",
      "Describe a recent joyful memory.",
      "Write about something you're grateful for.",
      "What about today brought you peace?",
      "How do you hold onto happiness during harder times?",
      "Who or what makes you feel the most alive?"
    ],
    sad: [
      "What's been weighing on your heart lately?",
      "Describe a moment of vulnerability.",
      "How are you comforting yourself right now?",
      "What do you wish someone would say to you right now?",
      "Where in your body do you feel sadness?",
      "What helps you feel safe when you're down?"
    ],
    angry: [
      "What triggered your anger?",
      "How can you express your feelings in a healthy way?",
      "What do you need to feel calm again?",
      "What boundary may have been crossed?",
      "What is your anger trying to protect?",
      "How do you typically respond to frustration?"
    ],
    stressed: [
      "What's been overwhelming you?",
      "How can you simplify your day?",
      "Write about one small step toward peace.",
      "What are you holding onto that you could release?",
      "Where is your energy going right now?",
      "How can you be more compassionate to yourself?"
    ],
    surprised: [
      "What unexpected moment did you experience?",
      "Did something throw you off today?",
      "How do you handle the unexpected?",
      "What did today teach you that you didn't expect?",
      "Was today's surprise a challenge or a gift?",
      "How did your body react to being caught off guard?"
    ],
    neutral: [
      "Describe your day in 3 words.",
      "How are you feeling, honestly?",
      "What are you observing around you?",
      "What thoughts are quietly looping in your mind?",
      "What do you need more or less of today?",
      "What does stillness feel like for you right now?"
    ]
  };

  const getEmotionColor = (emotion) => {
    const colorMap = {
      happy: '#fff8e7',
      sad: '#d0e8f2',
      angry: '#ffd6d6',
      stressed: '#f5e1fd',
      surprised: '#e7f6d5',
      neutral: '#eeeeee',
    };
    return colorMap[emotion] || '#ffffff';
  };

  const getRandomPrompt = (mood) => {
    if (!mood || !emotionPrompts[mood]) return '';
    const prompts = emotionPrompts[mood];
    return prompts[Math.floor(Math.random() * prompts.length)];
  };

  const handleNewPrompt = () => {
    if (!selectedMood) return;

    const currentPrompts = emotionPrompts[selectedMood];
    const availablePrompts = currentPrompts.filter(p => p !== prompt);
    const promptsToChooseFrom = availablePrompts.length > 0 ? availablePrompts : currentPrompts;
    const newPrompt = promptsToChooseFrom[Math.floor(Math.random() * promptsToChooseFrom.length)];
    setPrompt(newPrompt);
  };

  const handleNewEntry = () => {
    setPrompt('');
    setEntry('');
    setSelectedMood('');
  };

  const handleSubmit = () => {
    if (!entry.trim() || !selectedMood) return;

    const newEntry = {
      text: entry,
      prompt: prompt,
      emotion: selectedMood,
      color: getEmotionColor(selectedMood),
      date: new Date().toISOString(),
    };

    const updatedEntries = [newEntry, ...(Array.isArray(entries) ? entries : [])].slice(0, 6);
    setEntries(updatedEntries);
    localStorage.setItem('journalEntries', JSON.stringify(updatedEntries));
    setEntry('');
  };

  return (
    <div className={styles.journalPage}>
      {/* New Entry Button */}
      <div className={styles.topBar}>
        <button className={styles.newEntryBtn} onClick={handleNewEntry}>+ New Entry</button>
      </div>

      {/* Mood Selector */}
      <div className={styles.moodSelector}>
        <label htmlFor="mood">What emotion would you like to write about?</label>
        <select
          id="mood"
          value={selectedMood}
          onChange={(e) => {
            const mood = e.target.value;
            setSelectedMood(mood);
            setPrompt(getRandomPrompt(mood));
          }}
        >
          <option value="">Select an emotion</option>
          <option value="happy">😊 Happy</option>
          <option value="sad">😢 Sad</option>
          <option value="angry">😠 Angry</option>
          <option value="stressed">😰 Stressed</option>
          <option value="surprised">😲 Surprised</option>
          <option value="neutral">😐 Neutral</option>
        </select>
      </div>

      {/* Prompt Box with New Prompt Button */}
      <div className={styles.promptSection}>
        <div className={styles.promptBox}>
          <p>{prompt || `Prompt will appear here after selecting a mood.`}</p>
        </div>
        {selectedMood && prompt && (
          <button
            className={styles.newPromptBtn}
            onClick={handleNewPrompt}
            title="Get a different prompt for this emotion"
          >
            New Prompt
          </button>
        )}
      </div>

      {/* Entry Box */}
      <textarea
        className={styles.entryBox}
        value={entry}
        onChange={(e) => setEntry(e.target.value)}
        placeholder="Write your thoughts here..."
      />

      {/* Submit Button */}
      <div className={styles.bottomBar}>
        <button
          className={styles.submitBtn}
          onClick={handleSubmit}
          disabled={!entry.trim() || !selectedMood}
        >
          Submit
        </button>
      </div>

      {/* Saved Entries */}
      <div className={styles.entriesContainer}>
        {entries.map((e, index) => (
          <div key={index} className={styles.entryCover} style={{ backgroundColor: e.color }}>
            <p>{new Date(e.date).toLocaleDateString()}</p>
            <p>{e.prompt}</p>
          </div>
        ))}
      </div>

      <div className={styles.seeAllContainer}>
      <Link to="/all-entries" className={styles.seeAllBtn}>📚 See All Entries</Link>

      </div>
    </div>
  );
};

export default Journal;
