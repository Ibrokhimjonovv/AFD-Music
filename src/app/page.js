import LikedSongs from "@/components/likedSongs/likedSongs";
import "./globals.scss";
import MainSongs from "@/components/mainSongs/mainSongs";
import PlayingSong from "@/components/playing-song/playingSong";
import MusicPlayer from "@/components/music-player/musicPlayer";
import MobileMottomMenu from "@/components/mobile/bottom-menu/mobile-bottom-menu";
import MobileMiniPlayer from "@/components/mobile/mobile-mini-player/mobile-mini-player";

export default function Home() {
  return (
    <div id="main-container">
      <div className="main-container-top">
        <LikedSongs />
        <MainSongs />
        <PlayingSong />
      </div>
      <div className="main-container-bottom">
        <MusicPlayer />
      </div>
      <div className="mobile-bottome-container">
        <MobileMiniPlayer />
        <MobileMottomMenu />
      </div>
    </div>
  );
}
