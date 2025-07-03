import LikedSongs from "@/components/likedSongs/likedSongs";
import "./globals.scss";
import MainSongs from "@/components/mainSongs/mainSongs";
import PlayingSong from "@/components/playing-song/playingSong";

export default function Home() {
  return (
    <div id="main-container">
      <LikedSongs />
      <MainSongs />
      <PlayingSong />
    </div>
  );
}
