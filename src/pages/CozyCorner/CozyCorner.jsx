import React, { useEffect, useRef, useState } from 'react';
import styles from './CozyCorner.module.css';

const asmrSounds = {
  rain: import.meta.env.BASE_URL + 'cozycorner/asmr/rain.mp3',
  firewood: import.meta.env.BASE_URL + 'cozycorner/asmr/firewood.mp3',
  night: import.meta.env.BASE_URL + 'cozycorner/asmr/night.mp3',
};

const CozyCorner = () => {
  const videoRef = useRef(null);
  const lofiAudioRef = useRef(null);
  const asmrAudioRefs = {
    rain: useRef(null),
    firewood: useRef(null),
    night: useRef(null),
  };

  const [videoPlaying, setVideoPlaying] = useState(true);
  const [lofiOn, setLofiOn] = useState(true);
  const [asmrPlaying, setAsmrPlaying] = useState({
    rain: false,
    firewood: false,
    night: false,
  });

  // Autoplay lofi and video on mount, with debugging logs for video
  useEffect(() => {
    if (videoRef.current) {
      console.log('Video element found:', videoRef.current);
      videoRef.current.play()
        .then(() => {
          console.log('Video is playing');
        })
        .catch((e) => {
          console.error('Video play failed:', e);
        });
    }
    if (lofiAudioRef.current) {
      lofiAudioRef.current.volume = 0.5;
      lofiAudioRef.current.play().catch(() => {});
    }
  }, []);

  const toggleVideo = () => {
    if (videoRef.current.paused) {
      videoRef.current.play();
      setVideoPlaying(true);
    } else {
      videoRef.current.pause();
      setVideoPlaying(false);
    }
  };

  const toggleLofi = () => {
    if (lofiAudioRef.current.paused) {
      lofiAudioRef.current.play();
      setLofiOn(true);
    } else {
      lofiAudioRef.current.pause();
      setLofiOn(false);
    }
  };

  const toggleAsmr = (sound) => {
    const isPlaying = asmrPlaying[sound];
    if (isPlaying) {
      asmrAudioRefs[sound].current.pause();
      setAsmrPlaying(prev => ({ ...prev, [sound]: false }));
    } else {
      asmrAudioRefs[sound].current.volume = 0.5;
      asmrAudioRefs[sound].current.play();
      setAsmrPlaying(prev => ({ ...prev, [sound]: true }));
    }
  };

  return (
    <div className={styles.cozyCornerContainer}>
      {/* Background Video */}
      <video
        ref={videoRef}
        src={import.meta.env.BASE_URL + 'cozycorner/video/lofi-loop.mp4'}
        autoPlay
        loop
        muted
        playsInline
        style={{
          width: '100vw',
          height: '100vh',
          objectFit: 'cover',
          backgroundColor: '#222',  // fallback background color if video fails
          display: 'block',
        }}
        className={styles.backgroundVideo} // keep if you want to add styles later
      />

      {/* Audio Elements */}
      <audio ref={lofiAudioRef} src={import.meta.env.BASE_URL + 'cozycorner/audio/lofi-track.mp3'} loop />
      {Object.entries(asmrSounds).map(([key, src]) => (
        <audio key={key} ref={asmrAudioRefs[key]} src={src} loop />
      ))}

      {/* Controls */}
      <div className={styles.controls}>
        <h1>🎧 Cozy Corner</h1>

        {/* Video Controls */}
        <button onClick={toggleVideo} className={styles.controlBtn}>
          {videoPlaying ? 'Pause Video' : 'Play Video'}
        </button>

        {/* Lofi Controls */}
        <button onClick={toggleLofi} className={styles.controlBtn}>
          {lofiOn ? 'Pause Lofi' : 'Play Lofi'}
        </button>

        {/* ASMR Controls */}
        <div className={styles.asmrControls}>
          <p>ASMR Sounds (can combine):</p>
          {Object.keys(asmrSounds).map((sound) => (
            <button
              key={sound}
              onClick={() => toggleAsmr(sound)}
              className={`${styles.controlBtn} ${
                asmrPlaying[sound] ? styles.activeBtn : ''
              }`}
            >
              {sound.charAt(0).toUpperCase() + sound.slice(1)}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default CozyCorner;
