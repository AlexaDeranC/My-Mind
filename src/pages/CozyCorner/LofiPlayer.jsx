import React, { useEffect, useRef } from 'react';
import styles from './CozyCorner.module.css';

const LofiPlayer = ({ playing }) => {
  const videoRef = useRef(null);
  const audioRef = useRef(null);

  useEffect(() => {
    if (playing) {
      audioRef.current?.play();
      videoRef.current?.play();
    } else {
      audioRef.current?.pause();
      videoRef.current?.pause();
    }
  }, [playing]);

  return (
    <div className={styles.lofiContainer}>
      <video 
        ref={videoRef}
        className={styles.lofiVideo}
        src="/cozycorner/video/lofi-loop.mp4" 
        loop 
        muted 
        playsInline 
      />
      <audio 
        ref={audioRef} 
        src="/cozycorner/audio/lofi-track.mp3" 
        loop 
      />
    </div>
  );
};

export default LofiPlayer;
