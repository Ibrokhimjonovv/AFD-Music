'use client'
import React, { useContext, useEffect, useRef, useState } from 'react';
import "./likedSongs.scss";
import LikedSongsList from '../likedSongsList/likedSongsList';
import { AccessContext } from '@/context/context';

// SVG komponentlarini alohida yaratamiz
const AddIcon = () => (
    <svg role="img" aria-hidden="true" viewBox="0 0 16 16" className="e-9960-icon e-9960-baseline gPxvvwdrTY6FbTx3mvl1">
        <path d="M15.25 8a.75.75 0 0 1-.75.75H8.75v5.75a.75.75 0 0 1-1.5 0V8.75H1.5a.75.75 0 0 1 0-1.5h5.75V1.5a.75.75 0 0 1 1.5 0v5.75h5.75a.75.75 0 0 1 .75.75"></path>
    </svg>
);

const ExpandIcon = () => (
    <svg role="img" aria-hidden="true" viewBox="0 0 16 16" className="e-9960-icon e-9960-baseline">
        <path d="M6.53 9.47a.75.75 0 0 1 0 1.06l-2.72 2.72h1.018a.75.75 0 0 1 0 1.5H1.25v-3.579a.75.75 0 0 1 1.5 0v1.018l2.72-2.72a.75.75 0 0 1 1.06 0zm2.94-2.94a.75.75 0 0 1 0-1.06l2.72-2.72h-1.018a.75.75 0 1 1 0-1.5h3.578v3.579a.75.75 0 0 1-1.5 0V3.81l-2.72 2.72a.75.75 0 0 1-1.06 0"></path>
    </svg>
);

const SearchIcon = () => (
    <svg role="img" aria-hidden="true" viewBox="0 0 16 16" className="e-9960-icon e-9960-baseline CIVozJ8XNPJ60uMN23Yg">
        <path d="M7 1.75a5.25 5.25 0 1 0 0 10.5 5.25 5.25 0 0 0 0-10.5M.25 7a6.75 6.75 0 1 1 12.096 4.12l3.184 3.185a.75.75 0 1 1-1.06 1.06L11.304 12.2A6.75 6.75 0 0 1 .25 7"></path>
    </svg>
);

const RecentIcon = () => (
    <svg role="img" aria-hidden="true" viewBox="0 0 16 16" className="e-9960-icon e-9960-baseline e-9960-icon--auto-mirror">
        <path d="M15 14.5H5V13h10zm0-5.75H5v-1.5h10zM15 3H5V1.5h10zM3 3H1V1.5h2zm0 11.5H1V13h2zm0-5.75H1v-1.5h2z"></path>
    </svg>
);

const sortOptions = [
    "Recents",
    "Recently Added",
    "Alphabetical",
    "Creator",
];

const SortIcon = () => (
    <svg
        data-encore-id="icon"
        role="img"
        aria-hidden="true"
        className="e-9960-icon e-9960-baseline"
        viewBox="0 0 16 16"
        style={{
            "--encore-icon-height": "var(--encore-graphic-size-decorative-smaller)",
            "--encore-icon-width": "var(--encore-graphic-size-decorative-smaller)",
        }}
    >
        <path d="M15.53 2.47a.75.75 0 0 1 0 1.06L4.907 14.153.47 9.716a.75.75 0 0 1 1.06-1.06l3.377 3.376L14.47 2.47a.75.75 0 0 1 1.06 0"></path>
    </svg>
);

const LikedSongs = () => {

    const [showInput, setShowInput] = useState(false);
    const searchRef = useRef(null);
    const [inputValue, setInputValue] = useState('')
    const [activeOption, setActiveOption] = useState("Recents");
    const [showRecentModal, setShowRecentModal] = useState(false);
    const recentModal = useRef(null)
    const { isSmaller, setIsSmaller } = useContext(AccessContext);

    const handleShowInput = () => {
        setShowInput(true);
    }

    // Tashqariga bosilganda inputni yopish
    useEffect(() => {
        const handleClickOutside = (e) => {
            if (searchRef.current && !searchRef.current.contains(e.target)) {
                if (inputValue.trim() === '') {
                    setShowInput(false)
                };
            }
        };

        const handleRecentClickOutside = (e) => {
            if (recentModal.current && !recentModal.current.contains(e.target)) {
                setShowRecentModal(false);
            }
        }

        document.addEventListener("mousedown", handleClickOutside);
        document.addEventListener("mousedown", handleRecentClickOutside);
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
            document.removeEventListener("mousedown", handleRecentClickOutside);
        };
    }, [inputValue]);

    const handleClick = (option) => {
        setActiveOption(option);
        setShowRecentModal(false)
    };

    return (
        <div id='liked-container' className={isSmaller ? "liked-container-active" : ""}>
            <div className="liked-top">
                <div className="liked-full-btn" onClick={() => setIsSmaller(!isSmaller)}>
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
                <p className={isSmaller ? "hidden-action" : ""}>Your Library</p>
                <div className={`liked-top-actions ${isSmaller ? "hidden-action" : ""}`}>
                    <button className="add-playlist-folder">
                        <AddIcon />
                    </button>
                    <button className="expand-liked-container">
                        <ExpandIcon />
                    </button>
                </div>
            </div>
            {
                isSmaller && <button className="add-playlist-folder">
                    <AddIcon />
                </button>
            }
            <div className={`liked-search-recents ${isSmaller ? "hidden-action" : ""}`}>
                <div className="liked-search" ref={searchRef}>
                    <button className="open-search-btn" onClick={handleShowInput}>
                        <SearchIcon />
                    </button>
                    <div className={`liked-search-input ${showInput ? "focused" : ""}`}>
                        <input
                            type="text"
                            placeholder='Search in your library'
                            value={inputValue}
                            onChange={(e) => setInputValue(e.target.value)} />
                    </div>
                </div>
                <button className="recent-btn" onClick={() => setShowRecentModal(true)}>
                    <span className={showInput ? "hide" : ""}>Recents</span>
                    <RecentIcon />
                </button>
                {
                    showRecentModal && (
                        <div className="recent-modal" ref={recentModal}>
                            <p>Sort by</p>
                            <div className="recent-actions">
                                {sortOptions.map((option) => (
                                    <button
                                        key={option}
                                        className={option === activeOption ? 'active' : ''}
                                        onClick={() => handleClick(option)}
                                    >
                                        {option}
                                        {option === activeOption && <SortIcon />}
                                    </button>
                                ))}
                            </div>
                        </div>
                    )
                }
            </div>
            <div className="list">
                <LikedSongsList isSmaller={isSmaller} />
            </div>
        </div>
    )
}

export default LikedSongs;