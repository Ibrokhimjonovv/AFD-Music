'use client';
import React, { useState, useRef, useEffect } from 'react';
import "./mainSongs.scss"
import Link from 'next/link';

import 'swiper/css';
import { Swiper, SwiperSlide } from 'swiper/react';

const MainSongs = () => {
    const [activeCategory, setActiveCategory] = useState("All");
    const swiperRef = useRef(null);
    const [isBeginning, setIsBeginning] = useState(true);
    const [isEnd, setIsEnd] = useState(false);

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

    // Popular Music data
    const popularMusic = [
        {
            id: 1,
            imageUrl: "https://i.scdn.co/image/ab67616d00001e0233b7d4d2036d06202a8f22a1",
            title: "I AM",
            artist: "MACAN"
        },
        {
            id: 2,
            imageUrl: "https://m.media-amazon.com/images/I/511bCT+EtQL._AC_UF894,1000_QL80_.jpg",
            title: "Blinding Lights",
            artist: "The Weeknd"
        },
        {
            id: 3,
            imageUrl: "https://m.media-amazon.com/images/I/511bCT+EtQL._AC_UF894,1000_QL80_.jpg",
            title: "Star Boy",
            artist: "The Weeknd"
        },
        {
            id: 4,
            imageUrl: "https://i.scdn.co/image/ab67616d00001e02ff9ca10b55ce82ae553c8228",
            title: "Dynamite",
            artist: "BTS"
        },
        {
            id: 5,
            imageUrl: "https://i.scdn.co/image/ab67616d00001e02ff9ca10b55ce82ae553c8228",
            title: "Shape of You",
            artist: "Ed Sheeran"
        }
    ];

    useEffect(() => {
        if (swiperRef.current) {
            swiperRef.current.on('slideChange', () => {
                setIsBeginning(swiperRef.current.isBeginning);
                setIsEnd(swiperRef.current.isEnd);
            });
        }
    }, []);

    return (
        <div id='main-songs'>
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

            <div id="yandex_rtb_R-A-16116744-1">
                <script
                    dangerouslySetInnerHTML={{
                        __html: `
            window.yaContextCb = window.yaContextCb || [];
            window.yaContextCb.push(() => {
              Ya.Context.AdvManager.render({
                blockId: "R-A-16116744-1",
                renderTo: "yandex_rtb_R-A-16116744-1"
              });
            });
          `,
                    }}
                />
            </div>

            <h1 className='name'>
                <Link href='#'>Popular albums and Singles</Link>
                <Link href="#">Show all</Link>
            </h1>

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
                        breakpoints={{
                            320: { slidesPerView: 1, spaceBetween: 10 },
                            640: { slidesPerView: 2, spaceBetween: 15 },
                            1024: { slidesPerView: 3, spaceBetween: 20 }
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
                                <div className="popular-albums">
                                    <Link href="#">
                                        <div className="discover-img">
                                            <img src={music.imageUrl} />
                                            <div className="play-icon">
                                                <svg data-encore-id="icon" role="img" aria-hidden="true" className="e-9960-icon e-9960-baseline" viewBox="0 0 24 24">
                                                    <path d="m7.05 3.606 13.49 7.788a.7.7 0 0 1 0 1.212L7.05 20.394A.7.7 0 0 1 6 19.788V4.212a.7.7 0 0 1 1.05-.606"></path>
                                                </svg>
                                            </div>
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