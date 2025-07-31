import React, { useEffect, useState } from 'react';
import styles from './AllEntries.module.css';

const AllEntries = () => {
  const [allEntries, setAllEntries] = useState([]);
  const [selectedEntry, setSelectedEntry] = useState(null);

  useEffect(() => {
    const stored = localStorage.getItem('journalEntries');
    if (stored) {
      setAllEntries(JSON.parse(stored));
    }
  }, []);

  const handleEntryClick = (entry) => {
    setSelectedEntry(entry);
  };

  const handleBack = () => {
    setSelectedEntry(null);
  };

  const handleDelete = (indexToDelete) => {
    const updatedEntries = allEntries.filter((_, index) => index !== indexToDelete);
    setAllEntries(updatedEntries);
    localStorage.setItem('journalEntries', JSON.stringify(updatedEntries));
    setSelectedEntry(null); // Return to list view after deletion
  };

  return (
    <div className={styles.allEntriesPage}>
      <h2>📖 All Journal Entries</h2>

      {selectedEntry ? (
        <div className={styles.singleEntryView}>
          <button className={styles.backButton} onClick={handleBack}>← Back to all entries</button>
          <div
            className={styles.entryCard}
            style={{ backgroundColor: selectedEntry.color }}
          >
            <h3>{new Date(selectedEntry.date).toLocaleDateString()}</h3>
            <p><strong>Mood:</strong> {selectedEntry.emotion}</p>
            <p><strong>Prompt:</strong> {selectedEntry.prompt}</p>
            <p><strong>Entry:</strong> {selectedEntry.text}</p>

            {/* Delete button for single entry view */}
            <button
              className={styles.deleteButton}
              onClick={() => handleDelete(allEntries.findIndex(entry => entry.date === selectedEntry.date))}
            >
              🗑️ Delete Entry
            </button>
          </div>
        </div>
      ) : allEntries.length === 0 ? (
        <p>No entries found.</p>
      ) : (
        <div className={styles.entriesGrid}>
          {allEntries.map((entry, index) => (
            <div
              key={index}
              className={styles.entryCard}
              style={{ backgroundColor: entry.color }}
              onClick={() => handleEntryClick(entry)}
            >
              <p><strong>Date:</strong> {new Date(entry.date).toLocaleDateString()}</p>
              <p><strong>Mood:</strong> {entry.emotion}</p>
              <p><strong>Prompt:</strong> {entry.prompt}</p>
              <p className={styles.preview}><strong>Entry:</strong> {entry.text.slice(0, 80)}...</p>
              <p className={styles.readMore}>👀 Click to read more</p>

              {/* Delete button for card view */}
              <button
                className={styles.deleteButton}
                onClick={(e) => {
                  e.stopPropagation(); // Prevent click from opening full view
                  handleDelete(index);
                }}
              >
                🗑️ Delete Entry
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default AllEntries;
