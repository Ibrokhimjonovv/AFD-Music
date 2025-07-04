import React, { useContext } from 'react';
import "./likedSongsList.scss";
import Link from "next/link"
import { AccessContext } from '@/context/context';

const LikedSongsList = ({isSmaller}) => {
  const {likedSongs} = useContext(AccessContext);

  return (
    <div className='liked-songs-items'>
      <Link href="#" className="liked-song-item">
        <div className="item-img">  
          <img src="https://misc.scdn.co/liked-songs/liked-songs-64.png" />
        </div>
        <div className={`item-text ${isSmaller ? "hidden-action" : ""}`}>
          <p>Liked Songs</p>
          <p>Playlist • {likedSongs.length > 0 ? likedSongs.length : 0} song{likedSongs.length > 1 ? "s" : ""}</p>
        </div>
      </Link>
    </div>
  )
}

export default LikedSongsList