import React from 'react';
import "./likedSongsList.scss";
import Link from "next/link"

const LikedSongsList = () => {
  return (
    <div className='liked-songs-items'>
      <Link href="#" className="liked-song-item">
        <div className="item-img">  
          <img src="https://misc.scdn.co/liked-songs/liked-songs-64.png" />
        </div>
        <div className="item-text">
          <p>Liked Songs</p>
          <p>Playlist • 1 song</p>
        </div>
      </Link>
    </div>
  )
}

export default LikedSongsList