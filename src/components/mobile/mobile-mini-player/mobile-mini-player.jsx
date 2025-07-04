'use client'
import { AccessContext } from '@/context/context'
import Link from 'next/link';
import React, { useContext, useEffect, useRef, useState } from 'react'
import "./mobile-mini-player.scss";

const MobileMiniPlayer = () => {
    const { playingSong, isPlaying, togglePlayPause, audioRef, setIsPlaying, playNextSong, isRepeat, isLiked } = useContext(AccessContext);
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
    return (
        <div className='mini-player'>
            <div className="full-line">
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
                                    data-encore-id="icon"
                                    role="img"
                                    aria-hidden="true"
                                    className="e-9960-icon e-9960-baseline"
                                    viewBox="0 0 24 24"
                                >
                                    <path d="M5.21 1.57a6.76 6.76 0 0 1 6.708 1.545.124.124 0 0 0 .165 0 6.74 6.74 0 0 1 5.715-1.78l.004.001a6.8 6.8 0 0 1 5.571 5.376v.003a6.69 6.69 0 0 1-1.49 5.655l-7.954 9.48a2.518 2.518 0 0 1-3.857 0L2.12 12.37A6.68 6.68 0 0 1 .627 6.714 6.76 6.76 0 0 1 5.21 1.57m3.12 1.803a4.757 4.757 0 0 0-5.74 3.725l-.001.002a4.68 4.68 0 0 0 1.049 3.969l.009.01 7.958 9.485a.518.518 0 0 0 .79 0l7.968-9.495a4.69 4.69 0 0 0 1.049-3.965 4.8 4.8 0 0 0-3.931-3.794 4.74 4.74 0 0 0-4.023 1.256l-.008.008a2.123 2.123 0 0 1-2.9 0l-.007-.007a4.76 4.76 0 0 0-2.214-1.194z" />
                                </svg>

                            )
                        }
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