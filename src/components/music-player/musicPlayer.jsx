'use client'

import React, { useContext, useEffect, useRef, useState } from 'react';
import "./musicPlayer.scss";
import Link from 'next/link';
import AudioPlayer from '../audio-player/audioPlayer';
import { AccessContext } from '@/context/context';

const MusicPlayer = () => {
    const [volume, setVolume] = useState(0.7); // Default volume (70%)
    const [isMuted, setIsMuted] = useState(false);
    const { audioRef, playingSong, isRightPlayingSong, setIsRightPlayingSong, likedSongs, toggleLike } = useContext(AccessContext)
    const [isDraggingVolume, setIsDraggingVolume] = useState(false);
    const volumeSliderRef = useRef(null);

    useEffect(() => {
        if (audioRef.current) {
            audioRef.current.volume = isMuted ? 0 : volume;
        }
    }, [volume, isMuted]);

    const toggleMute = () => {
        setIsMuted(!isMuted);
    };

    const handleVolumeMouseDown = (e) => {
        setIsDraggingVolume(true);
        updateVolume(e);
        document.addEventListener('mousemove', handleVolumeDrag);
        document.addEventListener('mouseup', handleVolumeMouseUp);
    };

    const handleVolumeDrag = (e) => {
        if (isDraggingVolume) {
            updateVolume(e);
        }
    };

    const handleVolumeMouseUp = () => {
        setIsDraggingVolume(false);
        document.removeEventListener('mousemove', handleVolumeDrag);
        document.removeEventListener('mouseup', handleVolumeMouseUp);
    };

    const updateVolume = (e) => {
        const volumeSlider = volumeSliderRef.current;
        const rect = volumeSlider.getBoundingClientRect();
        let offsetX = e.clientX - rect.left;
        offsetX = Math.max(0, Math.min(offsetX, rect.width));

        const newVolume = offsetX / rect.width;
        setVolume(newVolume);
        if (newVolume === 0) {
            setIsMuted(true);
        } else if (isMuted) {
            setIsMuted(false);
        }
    };

    const handleVolumeClick = (e) => {
        updateVolume(e);
    };

    const isLiked = likedSongs.some((s) => s.id === playingSong?.id);

    return (
        <div id='player'>
            <div className="current-song">
                <div className="current-song-img">
                    <img src={playingSong?.imageUrl} alt="" />
                </div>
                <div className="current-song-title">
                    <Link href="#">{playingSong ? playingSong.title : "Loading..."}</Link>
                    <Link href='#'>{playingSong ? playingSong.artist : "Loading..."}</Link>
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
            </div>
            <AudioPlayer />
            <div className="instructions">
                <button className={isRightPlayingSong ? "active" : ""} onClick={() => setIsRightPlayingSong(!isRightPlayingSong)}>
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
                        <path d="M11.196 8 6 5v6z" />
                        <path d="M15.002 1.75A1.75 1.75 0 0 0 13.252 0h-10.5a1.75 1.75 0 0 0-1.75 1.75v12.5c0 .966.783 1.75 1.75 1.75h10.5a1.75 1.75 0 0 0 1.75-1.75zm-1.75-.25a.25.25 0 0 1 .25.25v12.5a.25.25 0 0 1-.25.25h-10.5a.25.25 0 0 1-.25-.25V1.75a.25.25 0 0 1 .25-.25z" />
                    </svg>

                </button>

                <button>
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
                        <path d="M13.426 2.574a2.831 2.831 0 0 0-4.797 1.55l3.247 3.247a2.831 2.831 0 0 0 1.55-4.797M10.5 8.118l-2.619-2.62L4.74 9.075 2.065 12.12a1.287 1.287 0 0 0 1.816 1.816l3.06-2.688 3.56-3.129zM7.12 4.094a4.331 4.331 0 1 1 4.786 4.786l-3.974 3.493-3.06 2.689a2.787 2.787 0 0 1-3.933-3.933l2.676-3.045z" />
                    </svg>

                </button>
                <button>
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
                        <path d="M15 15H1v-1.5h14zm0-4.5H1V9h14zm-14-7A2.5 2.5 0 0 1 3.5 1h9a2.5 2.5 0 0 1 0 5h-9A2.5 2.5 0 0 1 1 3.5m2.5-1a1 1 0 0 0 0 2h9a1 1 0 1 0 0-2z" />
                    </svg>

                </button>
                <button>
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
                        <path d="M6 2.75C6 1.784 6.784 1 7.75 1h6.5c.966 0 1.75.784 1.75 1.75v10.5A1.75 1.75 0 0 1 14.25 15h-6.5A1.75 1.75 0 0 1 6 13.25zm1.75-.25a.25.25 0 0 0-.25.25v10.5c0 .138.112.25.25.25h6.5a.25.25 0 0 0 .25-.25V2.75a.25.25 0 0 0-.25-.25zm-6 0a.25.25 0 0 0-.25.25v6.5c0 .138.112.25.25.25H4V11H1.75A1.75 1.75 0 0 1 0 9.25v-6.5C0 1.784.784 1 1.75 1H4v1.5zM4 15H2v-1.5h2z" />
                        <path d="M13 10a2 2 0 1 1-4 0 2 2 0 0 1 4 0m-1-5a1 1 0 1 1-2 0 1 1 0 0 1 2 0" />
                    </svg>
                </button>

                <div className="volume-controls">
                    <button className="volume-btn" onClick={toggleMute}>
                        {isMuted || volume === 0 ? (
                            <span className="volume-icon">
                                <svg
                                    data-encore-id="icon"
                                    role="presentation"
                                    aria-label="Volume off"
                                    aria-hidden="false"
                                    id="volume-icon"
                                    className="e-9960-icon e-9960-baseline"
                                    viewBox="0 0 16 16"
                                    style={{
                                        '--encore-icon-height': 'var(--encore-graphic-size-informative-smaller)',
                                        '--encore-icon-width': 'var(--encore-graphic-size-informative-smaller)',
                                    }}
                                >
                                    <path d="M13.86 5.47a.75.75 0 0 0-1.061 0l-1.47 1.47-1.47-1.47A.75.75 0 0 0 8.8 6.53L10.269 8l-1.47 1.47a.75.75 0 1 0 1.06 1.06l1.47-1.47 1.47 1.47a.75.75 0 0 0 1.06-1.06L12.39 8l1.47-1.47a.75.75 0 0 0 0-1.06" />
                                    <path d="M10.116 1.5A.75.75 0 0 0 8.991.85l-6.925 4a3.64 3.64 0 0 0-1.33 4.967 3.64 3.64 0 0 0 1.33 1.332l6.925 4a.75.75 0 0 0 1.125-.649v-1.906a4.7 4.7 0 0 1-1.5-.694v1.3L2.817 9.852a2.14 2.14 0 0 1-.781-2.92c.187-.324.456-.594.78-.782l5.8-3.35v1.3c.45-.313.956-.55 1.5-.694z" />
                                </svg>

                            </span>
                        ) : volume > 0.5 ? (
                            <span className="volume-icon">
                                <svg
                                    data-encore-id="icon"
                                    role="presentation"
                                    aria-label="Volume high"
                                    aria-hidden="false"
                                    id="volume-icon"
                                    className="e-9960-icon e-9960-baseline"
                                    viewBox="0 0 16 16"
                                    style={{
                                        '--encore-icon-height': 'var(--encore-graphic-size-informative-smaller)',
                                        '--encore-icon-width': 'var(--encore-graphic-size-informative-smaller)',
                                    }}
                                >
                                    <path d="M9.741.85a.75.75 0 0 1 .375.65v13a.75.75 0 0 1-1.125.65l-6.925-4a3.64 3.64 0 0 1-1.33-4.967 3.64 3.64 0 0 1 1.33-1.332l6.925-4a.75.75 0 0 1 .75 0zm-6.924 5.3a2.14 2.14 0 0 0 0 3.7l5.8 3.35V2.8zm8.683 4.29V5.56a2.75 2.75 0 0 1 0 4.88" />
                                    <path d="M11.5 13.614a5.752 5.752 0 0 0 0-11.228v1.55a4.252 4.252 0 0 1 0 8.127z" />
                                </svg>

                            </span>
                        ) : (
                            <span className="volume-icon">
                                <svg
                                    data-encore-id="icon"
                                    role="presentation"
                                    aria-label="Volume low"
                                    aria-hidden="false"
                                    id="volume-icon"
                                    className="e-9960-icon e-9960-baseline"
                                    viewBox="0 0 16 16"
                                    style={{
                                        '--encore-icon-height': 'var(--encore-graphic-size-informative-smaller)',
                                        '--encore-icon-width': 'var(--encore-graphic-size-informative-smaller)',
                                    }}
                                >
                                    <path d="M9.741.85a.75.75 0 0 1 .375.65v13a.75.75 0 0 1-1.125.65l-6.925-4a3.64 3.64 0 0 1-1.33-4.967 3.64 3.64 0 0 1 1.33-1.332l6.925-4a.75.75 0 0 1 .75 0zm-6.924 5.3a2.14 2.14 0 0 0 0 3.7l5.8 3.35V2.8zm8.683 4.29V5.56a2.75 2.75 0 0 1 0 4.88" />
                                </svg>
                            </span>
                        )}
                    </button>
                    <div
                        className="volume-slider-container"
                        ref={volumeSliderRef}
                        onClick={handleVolumeClick}
                        onMouseDown={handleVolumeMouseDown}
                    >
                        <div className="volume-slider-track">
                            <div
                                className="volume-slider-progress"
                                style={{ width: `${isMuted ? 0 : volume * 100}%` }}
                            ></div>
                            <div
                                className="volume-slider-thumb"
                                style={{ left: `${isMuted ? 0 : volume * 95}%` }}
                            ></div>
                        </div>
                    </div>
                </div>

                <button>
                    <svg
                        width="16"
                        height="16"
                        viewBox="0 0 16 16"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                    >
                        <path
                            fillRule="evenodd"
                            clipRule="evenodd"
                            d="M0.25 3C0.25 2.0335 1.0335 1.25 2 1.25H5.375V2.75H2C1.86193 2.75 1.75 2.86193 1.75 3V5.42857H0.25V3ZM14 2.75H10.625V1.25H14C14.9665 1.25 15.75 2.0335 15.75 3V5.42857H14.25V3C14.25 2.86193 14.1381 2.75 14 2.75ZM1.75 10.5714V13C1.75 13.1381 1.86193 13.25 2 13.25H5.375V14.75H2C1.0335 14.75 0.25 13.9665 0.25 13V10.5714H1.75ZM14.25 13V10.5714H15.75V13C15.75 13.9665 14.9665 14.75 14 14.75H10.625V13.25H14C14.1381 13.25 14.25 13.1381 14.25 13Z"
                            fill="currentColor"
                        />
                    </svg>
                </button>
            </div>
        </div>
    )
}

export default MusicPlayer