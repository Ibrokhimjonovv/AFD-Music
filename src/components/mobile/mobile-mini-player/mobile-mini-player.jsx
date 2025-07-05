'use client'
import { AccessContext } from '@/context/context'
import Link from 'next/link';
import React, { useContext, useEffect, useRef, useState } from 'react'
import "./mobile-mini-player.scss";
import AudioPlayer from '@/components/audio-player/audioPlayer';

const MobileMiniPlayer = () => {
    const { playingSong, isPlaying, togglePlayPause, audioRef, setIsPlaying, playNextSong, isRepeat, toggleLike, likedSongs, shuffleMode, playPreviousSong, isRepeatCount, setIsRepeat, setIsRepeatCount, setShuffleMode, setPlayedShuffleIds } = useContext(AccessContext);
    const [progress, setProgress] = useState(0);
    const [duration, setDuration] = useState(0);
    const [currentTime, setCurrentTime] = useState(0);
    const [isFullScreen, setIsFullScreen] = useState(false)

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

    const handleRepeatToggle = () => {
        setIsRepeat(prev => !prev);
        setIsRepeatCount(prev => (prev + 1) % 2); // 0,1,2,3 dan keyin yana 0
    };

    const formatTime = (time) => {
        if (isNaN(time)) return "0:00";

        const minutes = Math.floor(time / 60);
        const seconds = Math.floor(time % 60);
        return `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
    };

    const toggleShuffle = () => {
        setShuffleMode(prev => {
            if (!prev) setPlayedShuffleIds([]); // shuffle yoqilganda tozalanadi
            return !prev;

        });
    };

    const isLiked = likedSongs.some((s) => s.id === playingSong?.id);


    return (
        <div className={`mini-player ${isFullScreen ? "fullPlayer" : ""}`} >
            <div className="full-line" onClick={() => setIsFullScreen(true)}>
                <div className="current-song-detail">
                    <div className="current-song-img">
                        <img src={playingSong?.imageUrl} alt="" />
                    </div>
                    <div className="current-song-title">
                        <Link href="#">{playingSong ? playingSong.title : "Loading..."}</Link>
                        <Link href='#'>{playingSong ? playingSong.artist : "Loading..."}</Link>
                    </div>
                </div>
                <div className="current-song-actions">
                    <button className="add-to-liked" onClick={(e) => {
                        e.stopPropagation(); // <--- bu hodisani to‘xtatadi
                        toggleLike(playingSong);
                    }}>
                        {
                            isLiked ? (
                                <svg
                                    fill="#2ed16d"
                                    data-encore-id="icon"
                                    role="img"
                                    aria-hidden="true"
                                    className="e-9960-icon e-9960-baseline"
                                    viewBox="0 0 16 16"
                                    style={{
                                        '--encore-icon-fill': 'var(--text-bright-accent, #107434)',
                                        '--encore-icon-height': 'var(--encore-graphic-size-decorative-smaller)',
                                        '--encore-icon-width': 'var(--encore-graphic-size-decorative-smaller)',
                                    }}
                                >
                                    <path d="M0 8a8 8 0 1 1 16 0A8 8 0 0 1 0 8m11.748-1.97a.75.75 0 0 0-1.06-1.06l-4.47 4.47-1.405-1.406a.75.75 0 1 0-1.061 1.06l2.466 2.467 5.53-5.53z" />
                                </svg>
                            ) : (
                                <svg
                                    fill="transparent"
                                    data-encore-id="icon"
                                    role="img"
                                    aria-hidden="true"
                                    className="e-9960-icon e-9960-baseline"
                                    viewBox="0 0 24 24"
                                    strokeWidth='2'
                                    stroke='#fff'
                                >
                                    <path d="M5.21 1.57a6.76 6.76 0 0 1 6.708 1.545.124.124 0 0 0 .165 0 6.74 6.74 0 0 1 5.715-1.78l.004.001a6.8 6.8 0 0 1 5.571 5.376v.003a6.69 6.69 0 0 1-1.49 5.655l-7.954 9.48a2.518 2.518 0 0 1-3.857 0L2.12 12.37A6.68 6.68 0 0 1 .627 6.714 6.76 6.76 0 0 1 5.21 1.57z" />
                                </svg>

                            )
                        }
                    </button>
                    <button
                        className={`control-btn ${isPlaying ? 'playing' : ''}`}
                        onClick={(e) => {
                            e.stopPropagation(); // <--- bu ham
                            handlePlayPause();
                        }}

                    >
                        {isPlaying ? (
                            <span className="pause-icon">❚❚</span>
                        ) : (
                            <span className="play-icon">▶</span>
                        )}
                    </button>
                </div>
            </div>
            <div className="progress-container">
                {/* <span className="time-current">{formatTime(currentTime)}</span> */}
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
                {/* <span className="time-total">{formatTime(duration)}</span> */}
            </div>

            <div className="full-screen-container">
                <div className="top-controls">
                    <button className="small-btn" onClick={() => setIsFullScreen(false)}>
                        <svg
                            data-encore-id="icon"
                            role="img"
                            aria-hidden="true"
                            className="e-9960-icon e-9960-baseline"
                            viewBox="0 0 24 24"
                        >
                            <path d="M2.793 8.043a1 1 0 0 1 1.414 0L12 15.836l7.793-7.793a1 1 0 1 1 1.414 1.414L12 18.664 2.793 9.457a1 1 0 0 1 0-1.414"></path>
                        </svg>
                    </button>
                    <p className="playlist-title">
                        Liked Songs
                    </p>
                    <button className="more-tools">
                        <svg
                            data-encore-id="icon"
                            role="img"
                            aria-hidden="true"
                            className="e-9960-icon e-9960-baseline"
                            viewBox="0 0 24 24"
                        >
                            <path d="M4.5 13.5a1.5 1.5 0 1 0 0-3 1.5 1.5 0 0 0 0 3m15 0a1.5 1.5 0 1 0 0-3 1.5 1.5 0 0 0 0 3m-7.5 0a1.5 1.5 0 1 0 0-3 1.5 1.5 0 0 0 0 3"></path>
                        </svg>
                    </button>
                </div>

                <div className="current-song-img">
                    <img src={playingSong?.imageUrl} alt="" />
                </div>
                <div className="song-authors">
                    <div className="song-texts">
                        <p>{playingSong?.title}</p>
                        <p>{playingSong?.artist}</p>
                    </div>

                    <button className="add-to-liked" onClick={() => toggleLike(playingSong)}>
                        {
                            isLiked ? (
                                <svg
                                    fill="#2ed16d"
                                    data-encore-id="icon"
                                    role="img"
                                    aria-hidden="true"
                                    className="e-9960-icon e-9960-baseline"
                                    viewBox="0 0 16 16"
                                    style={{
                                        '--encore-icon-fill': 'var(--text-bright-accent, #107434)',
                                        '--encore-icon-height': 'var(--encore-graphic-size-decorative-smaller)',
                                        '--encore-icon-width': 'var(--encore-graphic-size-decorative-smaller)',
                                    }}
                                >
                                    <path d="M0 8a8 8 0 1 1 16 0A8 8 0 0 1 0 8m11.748-1.97a.75.75 0 0 0-1.06-1.06l-4.47 4.47-1.405-1.406a.75.75 0 1 0-1.061 1.06l2.466 2.467 5.53-5.53z" />
                                </svg>
                            ) : (
                                <svg
                                    fill="transparent"
                                    data-encore-id="icon"
                                    role="img"
                                    aria-hidden="true"
                                    className="e-9960-icon e-9960-baseline"
                                    viewBox="0 0 24 24"
                                    strokeWidth='2'
                                    stroke='#fff'
                                >
                                    <path d="M5.21 1.57a6.76 6.76 0 0 1 6.708 1.545.124.124 0 0 0 .165 0 6.74 6.74 0 0 1 5.715-1.78l.004.001a6.8 6.8 0 0 1 5.571 5.376v.003a6.69 6.69 0 0 1-1.49 5.655l-7.954 9.48a2.518 2.518 0 0 1-3.857 0L2.12 12.37A6.68 6.68 0 0 1 .627 6.714 6.76 6.76 0 0 1 5.21 1.57z" />
                                </svg>
                            )
                        }
                    </button>
                </div>
                <div className="mini-p">
                    <div className="music-player-full">
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
                            <div className="song-durations">
                                <span className="time-current">{formatTime(currentTime)}</span>
                                <span className="time-total">{formatTime(duration)}</span>
                            </div>
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
                </div>
            </div>



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
    )
}

export default MobileMiniPlayer