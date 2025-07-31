import React, { useState, useEffect } from 'react';
import styles from './TaskManager.module.css';
import useLocalStorage from '../../hooks/useLocalStorage'; // adjust path if needed

// Import sticker images
import sticker1 from '../../assets/stickers/sticker1.png';
import sticker2 from '../../assets/stickers/sticker2.png';
import sticker3 from '../../assets/stickers/sticker3.png';
import sticker4 from '../../assets/stickers/sticker4.png';
import sticker5 from '../../assets/stickers/sticker5.png';
import sticker6 from '../../assets/stickers/sticker6.png';
import sticker7 from '../../assets/stickers/sticker7.png';
import sticker8 from '../../assets/stickers/sticker8.png';
import sticker9 from '../../assets/stickers/sticker9.png';
import sticker10 from '../../assets/stickers/sticker10.png';

const stickers = [
  sticker1, sticker2, sticker3, sticker4, sticker5,
  sticker6, sticker7, sticker8, sticker9, sticker10,
];

const TaskManager = ({ tasks, setTasks }) => {
  const [showPopup, setShowPopup] = useState(false);
  const [earnedSticker, setEarnedSticker] = useState(null);
  const [earnedStickers, setEarnedStickers] = useLocalStorage('earnedStickers', []);

  // Filter only valid sticker indexes that exist in stickers array
  const validEarnedStickers = earnedStickers.filter(
    index => Number.isInteger(index) && index >= 0 && index < stickers.length
  );

  // Cleanup invalid indexes in localStorage on mount
  useEffect(() => {
    if (validEarnedStickers.length !== earnedStickers.length) {
      setEarnedStickers(validEarnedStickers);
    }
  }, []);

  const addTask = () => {
    if (tasks.length > 0) {
      const lastTask = tasks[tasks.length - 1];
      if (lastTask.task.trim() === '' && lastTask.duration === '') return;
    }
    setTasks([
      ...tasks,
      { task: '', duration: '', priority: 'Medium', completed: false },
    ]);
  };

  const updateTaskField = (index, field, value) => {
    const newTasks = [...tasks];
    newTasks[index][field] = value;
    setTasks(newTasks);
  };

  const toggleCompleted = (index) => {
    const newTasks = [...tasks];
    newTasks[index].completed = !newTasks[index].completed;
    setTasks(newTasks);
  };

  const deleteTask = (index) => {
    const newTasks = tasks.filter((_, i) => i !== index);
    setTasks(newTasks);
  };

  const calculateProgress = () => {
    let total = 0;
    tasks.forEach((task) => {
      if (task.completed) {
        if (task.priority === 'High') total += 15;
        else if (task.priority === 'Medium') total += 10;
        else if (task.priority === 'Low') total += 5;
      }
    });
    return Math.min(total, 100);
  };

  const progress = calculateProgress();

  useEffect(() => {
    if (progress === 100) {
      const availableIndexes = stickers
        .map((_, index) => index)
        .filter(index => !validEarnedStickers.includes(index));

      if (availableIndexes.length > 0) {
        const randomIndex = availableIndexes[Math.floor(Math.random() * availableIndexes.length)];

        const updatedStickers = [...validEarnedStickers, randomIndex];
        setEarnedStickers(updatedStickers);
        setEarnedSticker(randomIndex);
        setShowPopup(true);

        setTimeout(() => {
          setShowPopup(false);
        }, 3000);
      }
    }
  }, [progress]);

  return (
    <div className={styles.container}>
      {/* Progress Bar */}
      <div className={styles.progressContainer}>
        <div className={styles.progressBar}>
          <div
            className={styles.progressFill}
            style={{ width: `${progress}%` }}
          />
        </div>
        <span className={styles.progressText}>{progress}% Completed</span>
      </div>

      {/* Earned Sticker Popup */}
      {showPopup && earnedSticker !== null && (
        <div className={styles.popup}>
          <img
            src={stickers[earnedSticker]}
            alt="Earned Sticker"
            className={styles.popupImage}
          />
          <p>You earned a new sticker! 🎉</p>
        </div>
      )}

      {/* Earned Sticker Display */}
      {validEarnedStickers.length > 0 && !showPopup && (
        <div className={styles.earnedStickerSection}>
          <h3>ꕤ Your Stickers ꕤ</h3>
          <div className={styles.stickerGallery}>
            {validEarnedStickers.map((index, i) => (
              <img
                key={i}
                src={stickers[index]}
                alt={`Sticker ${index + 1}`}
                className={styles.earnedStickerImage}
              />
            ))}
          </div>
        </div>
      )}

      {/* Task Table */}
      <table className={styles.taskTable}>
        <thead>
          <tr>
            <th>Task</th>
            <th>Duration (min)</th>
            <th>Priority</th>
            <th>Status</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {tasks.length === 0 ? (
            <tr>
              <td colSpan="5" className={styles.noTasks}>
                No tasks yet. Click "+ Add Task" to start.
              </td>
            </tr>
          ) : (
            tasks.map((task, i) => (
              <tr key={i} className={styles.taskRow}>
                <td>
                  <input
                    type="text"
                    value={task.task}
                    onChange={(e) => updateTaskField(i, 'task', e.target.value)}
                    placeholder="Task name"
                    className={styles.input}
                  />
                </td>
                <td>
                  <input
                    type="number"
                    min="0"
                    value={task.duration}
                    onChange={(e) =>
                      updateTaskField(i, 'duration', e.target.value)
                    }
                    placeholder="Duration"
                    className={styles.input}
                  />
                </td>
                <td>
                  <select
                    value={task.priority}
                    onChange={(e) =>
                      updateTaskField(i, 'priority', e.target.value)
                    }
                    className={styles.select}
                  >
                    <option value="Low">Low</option>
                    <option value="Medium">Medium</option>
                    <option value="High">High</option>
                  </select>
                </td>
                <td>
                  <button
                    onClick={() => toggleCompleted(i)}
                    className={styles.markDoneBtn}
                    aria-label={task.completed ? "Undo done" : "Mark done"}
                  >
                    {task.completed ? '✓ Done' : 'Mark Done'}
                  </button>
                </td>
                <td className={styles.actionCell}>
                  <button
                    onClick={() => deleteTask(i)}
                    className={styles.deleteBtn}
                    aria-label="Delete task"
                  >
                    ✕
                  </button>
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>

      <button onClick={addTask} className={styles.addBtn}>
        + Add Task
      </button>
    </div>
  );
};

export default TaskManager;
