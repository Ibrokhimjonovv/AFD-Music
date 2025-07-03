"use client"

import React, { useState, useRef, useEffect, useContext } from 'react';
import './audioPlayer.scss';
import { AccessContext } from '@/context/context';

const AudioPlayer = () => {
    const { playingSong, isPlaying, togglePlayPause, audioRef, setIsPlaying, playPreviousSong, playNextSong, isRepeat, setIsRepeat, isRepeatCount, setIsRepeatCount, shuffleMode, setShuffleMode,setPlayedShuffleIds,  } = useContext(AccessContext);
    const [progress, setProgress] = useState(0);
    const [duration, setDuration] = useState(0);
    const [currentTime, setCurrentTime] = useState(0);

    const progressBarRef = useRef(null);

    useEffect(() => {
        if (audioRef.current) {
            if (isPlaying) {
                audioRef.current.play();
            } else {
                audioRef.current.pause();
            }
        }
    }, [isPlaying]);

    const handlePlayPause = () => {
        togglePlayPause(playingSong);
        setIsPlaying(!isPlaying)
    };

    const handleTimeUpdate = () => {
        const currentProgress = (audioRef.current.currentTime / audioRef.current.duration) * 100;
        setProgress(currentProgress);
        setCurrentTime(audioRef.current.currentTime);
        setDuration(audioRef.current.duration);
    };

    const handleProgressBarClick = (e) => {
        const progressBar = progressBarRef.current;
        const clickPosition = e.nativeEvent.offsetX;
        const progressBarWidth = progressBar.clientWidth;
        const seekPercentage = (clickPosition / progressBarWidth) * 100;
        const seekTime = (seekPercentage / 100) * duration;

        audioRef.current.currentTime = seekTime;
        setProgress(seekPercentage);
        setCurrentTime(seekTime);
    };

    const formatTime = (time) => {
        if (isNaN(time)) return "0:00";

        const minutes = Math.floor(time / 60);
        const seconds = Math.floor(time % 60);
        return `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
    };

    const handleRepeatToggle = () => {
        setIsRepeat(prev => !prev);
        setIsRepeatCount(prev => (prev + 1) % 2); // 0,1,2,3 dan keyin yana 0
    };

    const toggleShuffle = () => {
        setShuffleMode(prev => {
            if (!prev) setPlayedShuffleIds([]); // shuffle yoqilganda tozalanadi
            return !prev;

        });
    };

    return (
        <div className="music-player">
            <div className="player-controls">
                <button className={`shuffle-song ${shuffleMode ? 'active' : ''}`} disabled={isRepeat} onClick={toggleShuffle}>
                    <svg
                        data-encore-id="icon"
                        role="img"
                        aria-hidden="true"
                        className="e-9960-icon e-9960-baseline"
                        viewBox="0 0 16 16"
                        style={{
                            '--encore-icon-height': 'var(--encore-graphic-size-decorative-smaller)',
                            '--encore-icon-width': 'var(--encore-graphic-size-decorative-smaller)',
                        }}
                    >
                        <path d="M13.151.922a.75.75 0 1 0-1.06 1.06L13.109 3H11.16a3.75 3.75 0 0 0-2.873 1.34l-6.173 7.356A2.25 2.25 0 0 1 .39 12.5H0V14h.391a3.75 3.75 0 0 0 2.873-1.34l6.173-7.356a2.25 2.25 0 0 1 1.724-.804h1.947l-1.017 1.018a.75.75 0 0 0 1.06 1.06L15.98 3.75zM.391 3.5H0V2h.391c1.109 0 2.16.49 2.873 1.34L4.89 5.277l-.979 1.167-1.796-2.14A2.25 2.25 0 0 0 .39 3.5z" />
                        <path d="m7.5 10.723.98-1.167.957 1.14a2.25 2.25 0 0 0 1.724.804h1.947l-1.017-1.018a.75.75 0 1 1 1.06-1.06l2.829 2.828-2.829 2.828a.75.75 0 1 1-1.06-1.06L13.109 13H11.16a3.75 3.75 0 0 1-2.873-1.34l-.787-.938z" />
                    </svg>

                </button>
                <button className='prev-song-btn' onClick={playPreviousSong}>
                    <svg
                        data-encore-id="icon"
                        role="img"
                        aria-hidden="true"
                        className="e-9960-icon e-9960-baseline"
                        viewBox="0 0 16 16"
                        style={{
                            '--encore-icon-height': 'var(--encore-graphic-size-decorative-smaller)',
                            '--encore-icon-width': 'var(--encore-graphic-size-decorative-smaller)',
                        }}
                    >
                        <path d="M3.3 1a.7.7 0 0 1 .7.7v5.15l9.95-5.744a.7.7 0 0 1 1.05.606v12.575a.7.7 0 0 1-1.05.607L4 9.149V14.3a.7.7 0 0 1-.7.7H1.7a.7.7 0 0 1-.7-.7V1.7a.7.7 0 0 1 .7-.7z" />
                    </svg>
                </button>
                <button
                    className={`control-btn ${isPlaying ? 'playing' : ''}`}
                    onClick={handlePlayPause}
                >
                    {isPlaying ? (
                        <span className="pause-icon">❚❚</span>
                    ) : (
                        <span className="play-icon">▶</span>
                    )}
                </button>
                <button className='next-song-btn' onClick={playNextSong}>
                    <svg
                        data-encore-id="icon"
                        role="img"
                        aria-hidden="true"
                        className="e-9960-icon e-9960-baseline"
                        viewBox="0 0 16 16"
                        style={{
                            '--encore-icon-height': 'var(--encore-graphic-size-decorative-smaller)',
                            '--encore-icon-width': 'var(--encore-graphic-size-decorative-smaller)',
                        }}
                    >
                        <path d="M3.3 1a.7.7 0 0 1 .7.7v5.15l9.95-5.744a.7.7 0 0 1 1.05.606v12.575a.7.7 0 0 1-1.05.607L4 9.149V14.3a.7.7 0 0 1-.7.7H1.7a.7.7 0 0 1-.7-.7V1.7a.7.7 0 0 1 .7-.7z" />
                    </svg>
                </button>
                <button className={`repeat-song ${isRepeat ? "active" : ""}`} disabled={shuffleMode} title={
                    isRepeatCount === 0 ? "Repeat off" :
                        isRepeatCount === 1 ? "Repeat all" :
                            "Shuffle"
                } onClick={handleRepeatToggle}>
                    <svg
                        data-encore-id="icon"
                        role="img"
                        aria-hidden="true"
                        className="e-9960-icon e-9960-baseline"
                        viewBox="0 0 16 16"
                        style={{
                            '--encore-icon-height': 'var(--encore-graphic-size-decorative-smaller)',
                            '--encore-icon-width': 'var(--encore-graphic-size-decorative-smaller)',
                        }}
                    >
                        <path d="M0 4.75A3.75 3.75 0 0 1 3.75 1h8.5A3.75 3.75 0 0 1 16 4.75v5a3.75 3.75 0 0 1-3.75 3.75H9.81l1.018 1.018a.75.75 0 1 1-1.06 1.06L6.939 12.75l2.829-2.828a.75.75 0 1 1 1.06 1.06L9.811 12h2.439a2.25 2.25 0 0 0 2.25-2.25v-5a2.25 2.25 0 0 0-2.25-2.25h-8.5A2.25 2.25 0 0 0 1.5 4.75v5A2.25 2.25 0 0 0 3.75 12H5v1.5H3.75A3.75 3.75 0 0 1 0 9.75z" />
                    </svg>
                </button>
            </div>

            <div className="progress-container">
                <span className="time-current">{formatTime(currentTime)}</span>
                <div
                    className="progress-bar"
                    ref={progressBarRef}
                    onClick={handleProgressBarClick}
                >
                    <div
                        className={`progress`}
                        style={{ width: `${progress}%` }}
                    >
                        {
                            Number(progress) !== 0 && <div className={`circle ${Number(progress) < 5 ? "less" : ""}`}></div>
                        }
                    </div>
                </div>
                <span className="time-total">{formatTime(duration)}</span>
            </div>

            {/* <input 
        type="file" 
        id="file-input" 
        accept="audio/*" 
        onChange={handleFileChange}
      />
      <label htmlFor="file-input" className="select-song-btn">
        Select Song
      </label> */}

            {playingSong && (
                <audio
                    ref={audioRef}
                    src={playingSong}
                    onTimeUpdate={handleTimeUpdate}
                    onLoadedMetadata={handleTimeUpdate}
                    onEnded={() => {
                        if (isRepeat) {
                            if (isRepeatCount === 1) {
                                // doimiy takror
                                audioRef.current.currentTime = 0;
                                audioRef.current.play();
                            }
                        } else {
                            playNextSong();
                            setIsPlaying(false);
                        }
                    }}


                />
            )}
        </div>
    );
};

export default AudioPlayer;