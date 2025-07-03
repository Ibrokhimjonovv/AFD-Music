'use client'
import React, { useContext, useState } from 'react';
import "./playingSong.scss";
import Link from 'next/link';
import { AccessContext } from '@/context/context';

const PlayingSong = () => {
    const { currentMusicCategory, musicCategories, playingSong } = useContext(AccessContext);

    const getCategoryName = (categoryId) => {
        const category = musicCategories.find(cat => cat.id === categoryId);
        return category ? category.title : "Loading...";
    };


    return (
        <div id='current-song'>
            <div className="bar">
                <div className="playing-full-btn">
                    <svg
                        data-encore-id="icon"
                        role="img"
                        aria-hidden="true"
                        className="e-9960-icon e-9960-baseline e-9960-icon--auto-mirror"
                        viewBox="0 0 16 16"
                        style={{
                            '--encore-icon-height': 'var(--encore-graphic-size-decorative-smaller)',
                            '--encore-icon-width': 'var(--encore-graphic-size-decorative-smaller)',
                        }}
                    >
                        <path d="M10.03 10.53a.75.75 0 1 1-1.06-1.06L10.44 8 8.97 6.53a.75.75 0 0 1 1.06-1.06l2 2a.75.75 0 0 1 0 1.06z" />
                        <path d="M15 16a1 1 0 0 0 1-1V1a1 1 0 0 0-1-1H1a1 1 0 0 0-1 1v14a1 1 0 0 0 1 1zm-8.5-1.5v-13h8v13zm-1.5 0H1.5v-13H5z" />
                    </svg>

                </div>
                <Link href="#">{getCategoryName(currentMusicCategory)}</Link>
                <div className="playing-song-actions">
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
                            <path d="M3 8a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0m6.5 0a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0M16 8a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0" />
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
                            <path d="M6.53 9.47a.75.75 0 0 1 0 1.06l-2.72 2.72h1.018a.75.75 0 0 1 0 1.5H1.25v-3.579a.75.75 0 0 1 1.5 0v1.018l2.72-2.72a.75.75 0 0 1 1.06 0zm2.94-2.94a.75.75 0 0 1 0-1.06l2.72-2.72h-1.018a.75.75 0 1 1 0-1.5h3.578v3.579a.75.75 0 0 1-1.5 0V3.81l-2.72 2.72a.75.75 0 0 1-1.06 0" />
                        </svg>

                    </button>
                </div>
            </div>
            <div className="current-song-details">
                <div className="song-img">
                    <img src={playingSong?.imageUrl} alt="" />
                </div>
                <p className="song-name">
                    {playingSong ? playingSong.title : "Loading..."}
                </p>
                <div className="song-author">
                    {playingSong ? playingSong.artist : "Loading..."}
                </div>
            </div>
        </div>
    )
}

export default PlayingSong