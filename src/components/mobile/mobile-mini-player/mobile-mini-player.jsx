'use client'
import { AccessContext } from '@/context/context'
import Link from 'next/link';
import React, { useContext, useEffect, useRef, useState } from 'react'
import "./mobile-mini-player.scss";

const MobileMiniPlayer = () => {
    const { playingSong, isPlaying, togglePlayPause, audioRef, setIsPlaying, playNextSong, isRepeat, toggleLike, likedSongs } = useContext(AccessContext);
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

    const isLiked = likedSongs.some((s) => s.id === playingSong?.id);


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
                                    viewBox="0 0 16 16"
                                    style={{
                                        '--encore-icon-height': 'var(--encore-graphic-size-decorative-smaller)',
                                        '--encore-icon-width': 'var(--encore-graphic-size-decorative-smaller)',
                                    }}
                                >
                                    <path d="M8 1.5a6.5 6.5 0 1 0 0 13 6.5 6.5 0 0 0 0-13M0 8a8 8 0 1 1 16 0A8 8 0 0 1 0 8" />
                                    <path d="M11.75 8a.75.75 0 0 1-.75.75H8.75V11a.75.75 0 0 1-1.5 0V8.75H5a.75.75 0 0 1 0-1.5h2.25V5a.75.75 0 0 1 1.5 0v2.25H11a.75.75 0 0 1 .75.75" />
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