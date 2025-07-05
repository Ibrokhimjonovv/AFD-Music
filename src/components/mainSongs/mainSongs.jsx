'use client';
import React, { useState, useRef, useEffect, useContext } from 'react';
import "./mainSongs.scss"
import Link from 'next/link';
import 'swiper/css';
import { Swiper, SwiperSlide } from 'swiper/react';
import { AccessContext } from '@/context/context';

const MainSongs = () => {
    const { togglePlayPause, currentSongId, isPlaying, popularMusic, isRightPlayingSong, isSmaller } = useContext(AccessContext);

    const [activeCategory, setActiveCategory] = useState("All");
    const swiperRef = useRef(null);
    const [isBeginning, setIsBeginning] = useState(true);
    const [isEnd, setIsEnd] = useState(false);
    const [currentPlayingId, setCurrentPlayingId] = useState(null);
    const audioRef = useRef(null);

    const categories = ["All", "Music", "Podcasts"];

    // Weekly Discoveries data
    const weeklyDiscoveries = [
        {
            id: 1,
            imageUrl: "https://pickasso.spotifycdn.com/image/ab67c0de0000deef/dt/v1/img/dw/cover/en",
            title: "Your shortcut to hidden gems",
            description: "Deep cuts, and future faves, updated every Monday. You'll know when you hear it."
        }
    ];

    // Popular Music data with audio URLs


    useEffect(() => {
        if (swiperRef.current) {
            swiperRef.current.on('slideChange', () => {
                setIsBeginning(swiperRef.current.isBeginning);
                setIsEnd(swiperRef.current.isEnd);
            });
        }

        // Clean up audio on unmount
        return () => {
            if (audioRef.current) {
                audioRef.current.pause();
                audioRef.current = null;
            }
        };
    }, []);

    const handleSongPlay = (music) => {
        togglePlayPause(music);
    };

    return (
        <div id='main-songs' className={`${isRightPlayingSong ? "" : "main-active"} ${isSmaller ? "main-active-2" : ""}`}>

            <div className="mobile-header">
                <h2>Good morning</h2>
                <button>
                    <svg
                        data-encore-id="icon"
                        role="img"
                        aria-hidden="true"
                        className="e-9960-icon e-9960-baseline"
                        viewBox="0 0 24 24"
                    >
                        <path d="m23.2 11.362-1.628-.605a.92.92 0 0 1-.52-.7.88.88 0 0 1 .18-.805l1.2-1.25a1 1 0 0 0 .172-1.145 12.1 12.1 0 0 0-3.084-3.865 1 1 0 0 0-1.154-.086l-1.35.814a.98.98 0 0 1-.931-.02 1.01 1.01 0 0 1-.59-.713l-.206-1.574a1 1 0 0 0-.787-.848 12.15 12.15 0 0 0-4.945 0 1 1 0 0 0-.785.848l-.2 1.524a1.05 1.05 0 0 1-.62.747 1.02 1.02 0 0 1-.968.02l-1.318-.795a1 1 0 0 0-1.152.086 12.1 12.1 0 0 0-3.085 3.867 1 1 0 0 0 .174 1.143l1.174 1.218a.91.91 0 0 1 .182.828.95.95 0 0 1-.532.714l-1.618.6a1 1 0 0 0-.653.955 12.1 12.1 0 0 0 1.1 4.822 1 1 0 0 0 1 .578l1.935-.183a.83.83 0 0 1 .654.327.8.8 0 0 1 .188.726l-.6 1.822a1 1 0 0 0 .34 1.106c.66.504 1.369.94 2.117 1.3s1.532.642 2.338.841a1 1 0 0 0 .715-.09 1 1 0 0 0 .362-.332l1.136-1.736a.81.81 0 0 1 1.16.022l1.124 1.714a1 1 0 0 0 1.077.422c1.617-.4 3.133-1.13 4.454-2.145a1 1 0 0 0 .341-1.106l-.613-1.859a.77.77 0 0 1 .18-.7.78.78 0 0 1 .635-.317l1.945.183a.99.99 0 0 0 1-.578 12.1 12.1 0 0 0 1.1-4.822 1 1 0 0 0-.643-.953zm-1.6 2.977q-.155.673-.4 1.318l-1.213-.115a2.85 2.85 0 0 0-2.9 3.637l.383 1.16a10 10 0 0 1-2.473 1.191l-.72-1.1a2.69 2.69 0 0 0-2.275-1.18 2.64 2.64 0 0 0-2.232 1.16l-.735 1.12a10 10 0 0 1-2.471-1.19l.37-1.125a2.88 2.88 0 0 0-2.93-3.669l-1.2.113a10.5 10.5 0 0 1-.4-1.317 10 10 0 0 1-.214-1.358l.93-.345a3.032 3.032 0 0 0 1.095-4.8L3.55 7.15a10.2 10.2 0 0 1 1.71-2.146l.688.415a3 3 0 0 0 2.875.066 3.02 3.02 0 0 0 1.726-2.283l.105-.8a10.2 10.2 0 0 1 2.745 0l.11.844a3.1 3.1 0 0 0 4.542 2.184l.721-.435a10.2 10.2 0 0 1 1.712 2.146l-.694.72a3.005 3.005 0 0 0 1.084 4.768l.942.35q-.062.687-.215 1.36zM12 7.001a5 5 0 1 0 5 5 5.006 5.006 0 0 0-4.993-5zm0 8a3 3 0 1 1 .007 0z" />
                    </svg>

                </button>
            </div>

            <div className="top-categories">
                {categories.map((category) => (
                    <button
                        key={category}
                        className={activeCategory === category ? 'active' : ''}
                        onClick={() => setActiveCategory(category)}
                    >
                        {category}
                    </button>
                ))}
            </div>

            <div className="for-made">
                Made For
            </div>

            <h1 className='username'>
                <Link href='#'>John</Link>
                <Link href="#">Show all</Link>
            </h1>

            <div className="weekly-discover">
                {weeklyDiscoveries.map((item) => (
                    <Link href="#" key={item.id}>
                        <div className="discover-img">
                            <img src={item.imageUrl} />
                            <div className="play-icon">
                                <svg data-encore-id="icon" role="img" aria-hidden="true" className="e-9960-icon e-9960-baseline" viewBox="0 0 24 24">
                                    <path d="m7.05 3.606 13.49 7.788a.7.7 0 0 1 0 1.212L7.05 20.394A.7.7 0 0 1 6 19.788V4.212a.7.7 0 0 1 1.05-.606"></path>
                                </svg>
                            </div>
                        </div>
                        <p>{item.description}</p>
                    </Link>
                ))}
            </div>

            <h1 className='name'>
                <Link href='#'>Popular albums and Singles</Link>
                <Link href="#">Show all</Link>
            </h1>

            <div id="yandex_rtb_R-A-16144751-1">
                <script
                    dangerouslySetInnerHTML={{
                        __html: `
        window.yaContextCb = window.yaContextCb || [];
        window.yaContextCb.push(() => {
          Ya.Context.AdvManager.render({
            "blockId": "R-A-16144751-1",
            "renderTo": "yandex_rtb_R-A-16144751-1"
          });
        });
      `,
                    }}
                />
            </div>


            <div className="popular-albums-container">
                <div className="swiper-controls">
                    <button
                        className={`swiper-button-prev ${isBeginning ? 'disabled' : ''}`}
                        onClick={() => !isBeginning && swiperRef.current?.slidePrev()}
                        disabled={isBeginning}
                    >
                        <svg viewBox="0 0 24 24">
                            <path d="M15.41 16.59L10.83 12l4.58-4.59L14 6l-6 6 6 6 1.41-1.41z" />
                        </svg>
                    </button>

                    <Swiper
                        slidesPerView={3}
                        spaceBetween={10}
                        slidesPerGroup={1}
                        key={isRightPlayingSong ? 'with-player' : 'no-player'}
                        breakpoints={{
                            300: { slidesPerView: 2, spaceBetween: 10 },
                            640: { slidesPerView: 2, spaceBetween: 15 },
                            1024: { slidesPerView: 3, spaceBetween: 20 },
                            ...(!isRightPlayingSong && {
                                1024: { slidesPerView: 5, spaceBetween: 25 }
                            }),
                        }}
                        onSwiper={(swiper) => {
                            swiperRef.current = swiper;
                            setIsBeginning(swiper.isBeginning);
                            setIsEnd(swiper.isEnd);
                        }}
                        onSlideChange={(swiper) => {
                            setIsBeginning(swiper.isBeginning);
                            setIsEnd(swiper.isEnd);
                        }}
                    >
                        {popularMusic.map((music) => (
                            <SwiperSlide key={music.id}>
                                <div className={`popular-albums ${isRightPlayingSong ? "" : "w-100"}`}>
                                    <Link href='#' className="song-container">
                                        <div className="discover-img">
                                            <img src={music.imageUrl} />
                                            <button
                                                className={`play-icon ${currentSongId === music.id && isPlaying ? 'playing' : ''}`}
                                                onClick={() => handleSongPlay(music)}

                                            >
                                                <svg data-encore-id="icon" role="img" aria-hidden="true" className="e-9960-icon e-9960-baseline" viewBox="0 0 24 24">
                                                    {currentSongId === music.id && isPlaying ? (
                                                        <path d="M5.7 3a.7.7 0 0 0-.7.7v16.6a.7.7 0 0 0 .7.7h2.6a.7.7 0 0 0 .7-.7V3.7a.7.7 0 0 0-.7-.7H5.7zm10 0a.7.7 0 0 0-.7.7v16.6a.7.7 0 0 0 .7.7h2.6a.7.7 0 0 0 .7-.7V3.7a.7.7 0 0 0-.7-.7h-2.6z"></path>
                                                    ) : (
                                                        <path d="m7.05 3.606 13.49 7.788a.7.7 0 0 1 0 1.212L7.05 20.394A.7.7 0 0 1 6 19.788V4.212a.7.7 0 0 1 1.05-.606z"></path>
                                                    )}
                                                </svg>
                                            </button>
                                        </div>
                                        <p id='music-name'>{music.title}</p>
                                        <p id='music-author'>{music.artist}</p>
                                    </Link>
                                </div>
                            </SwiperSlide>
                        ))}
                    </Swiper>

                    <button
                        className={`swiper-button-next ${isEnd ? 'disabled' : ''}`}
                        onClick={() => !isEnd && swiperRef.current?.slideNext()}
                        disabled={isEnd}
                    >
                        <svg viewBox="0 0 24 24">
                            <path d="M8.59 16.59L13.17 12 8.59 7.41 10 6l6 6-6 6-1.41-1.41z" />
                        </svg>
                    </button>
                </div>
            </div>
        </div>
    )
}

export default MainSongs;