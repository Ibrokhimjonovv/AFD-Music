import React from 'react';
import "./playingSong.scss";
import Link from 'next/link';

const PlayingSong = () => {
  return (
    <div id='current-song'>
        <div className="bar">
            <Link href="#">Discover Weekly</Link>
        </div>
        <div className="current-song-details">
            <div className="song-img">
                <img src="https://i.scdn.co/image/ab67616d00001e02b552d1ab68a5a0238afcdc06" alt="" />
            </div>
            <p className="song-name">
                When I Win
            </p>
            <div className="song-author">
                MiyaGi & Endspiel
            </div>
        </div>
    </div>
  )
}

export default PlayingSong