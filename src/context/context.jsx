"use client";

import { createContext, useRef, useState, useEffect } from "react";

const AccessContext = createContext();

const AccessProvider = ({ children }) => {
  const [test, setTest] = useState('test');
  const audioRef = useRef(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentSongId, setCurrentSongId] = useState(null);
  const [playingSong, setPlayingSong] = useState(null);
  const [isRepeat, setIsRepeat] = useState(false);
  const [isRepeatCount, setIsRepeatCount] = useState(0)

  const musicCategories = [
    {
      id: 1,
      title: "Popular albums and Singles"
    },
    {
      id: 2,
      title: "Discover Weekly"
    }
  ]

  const popularMusic = [
    {
      id: 1,
      imageUrl: "https://i.scdn.co/image/ab67616d00001e02ebc8cfac8b586bc475b04918",
      title: "Born To Die",
      artist: "Lana Del Rey",
      audioUrl: "/music/born-to-die.mp3", // Replace with actual audio URL
      category: 1,
    },
    {
      id: 2,
      imageUrl: "https://i.scdn.co/image/ab67616d00001e028863bc11d2aa12b54f5aeb36",
      title: "Blinding Lights",
      artist: "The Weeknd",
      audioUrl: "/music/weeknd-blinding-lights.mp3", // Replace with actual audio URL
      category: 1,
    },
    {
      id: 3,
      imageUrl: "https://i.scdn.co/image/ab67616d00001e024718e2b124f79258be7bc452",
      title: "Star Boy",
      artist: "The Weeknd",
      audioUrl: "/music/star-boy.mp3", // Replace with actual audio URL
      category: 1,
    },
    {
      id: 4,
      imageUrl: "https://i.scdn.co/image/ab67616d00001e02a7f42c375578df426b37638d",
      title: "Still With You",
      artist: "Jung Kook",
      audioUrl: "/music/still-with-you.mp3", // Replace with actual audio URL
      category: 1,
    },
    {
      id: 5,
      imageUrl: "https://i.scdn.co/image/ab67616d00001e024d070fdf58fad8c54c5beb85",
      title: "No One Noticed",
      artist: "The Marías",
      audioUrl: "/music/no-one-noticed.mp3", // Replace with actual audio URL
      category: 1,
    }
  ];

  const [currentMusicCategory, setCurrentMusicCategory] = useState(popularMusic[0].category)
  const [shuffleMode, setShuffleMode] = useState(false);
  const [playedShuffleIds, setPlayedShuffleIds] = useState([]);


  const getSongsByCurrentCategory = () => {
    return popularMusic.filter(song => song.category === currentMusicCategory);
  };

  const playPreviousSong = () => {
    const songsInCategory = getSongsByCurrentCategory();
    if (!songsInCategory.length) return;

    const currentIndex = songsInCategory.findIndex(song => song.id === currentSongId);
    let previousIndex;

    if (currentIndex <= 0) {
      // Agar birinchi qo'shiqda bo'lsak, oxirgi qo'shiqqa o'tamiz
      previousIndex = songsInCategory.length - 1;
    } else {
      previousIndex = currentIndex - 1;
    }

    const previousSong = songsInCategory[previousIndex];
    togglePlayPause(previousSong);
  };

  const playNextSong = () => {
    const songsInCategory = getSongsByCurrentCategory();
    if (!songsInCategory.length) return;

    if (shuffleMode) {
      const unplayedSongs = songsInCategory.filter(
        song => !playedShuffleIds.includes(song.id)
      );

      let nextSong;

      if (unplayedSongs.length === 0) {
        // Barcha qo‘shiqlar o‘ynaldi, boshidan shuffle qilamiz
        setPlayedShuffleIds([]);
        const allSongs = [...songsInCategory];
        const random = Math.floor(Math.random() * allSongs.length);
        nextSong = allSongs[random];
      } else {
        const random = Math.floor(Math.random() * unplayedSongs.length);
        nextSong = unplayedSongs[random];
      }

      setPlayedShuffleIds(prev => [...prev, nextSong.id]);
      togglePlayPause(nextSong);
    } else {
      const currentIndex = songsInCategory.findIndex(song => song.id === currentSongId);
      let nextIndex;

      if (currentIndex === -1 || currentIndex === songsInCategory.length - 1) {
        nextIndex = 0;
      } else {
        nextIndex = currentIndex + 1;
      }

      const nextSong = songsInCategory[nextIndex];
      togglePlayPause(nextSong);
    }
  };



  useEffect(() => {
    if (!playingSong && popularMusic.length > 0) {
      setPlayingSong(popularMusic[0]);
    }
  }, []);

  const togglePlayPause = async (song = null) => {
    try {
      if (song) {
        if (currentSongId !== song.id) {
          // Yangi qo'shiq
          setPlayingSong(song);
          setCurrentSongId(song.id);
          setCurrentMusicCategory(song.category);

          // Audio elementini yangilash
          audioRef.current.src = song.audioUrl;

          // Yuklash tugaguniga kutamiz
          await new Promise((resolve) => {
            audioRef.current.onloadedmetadata = resolve;
            audioRef.current.onerror = resolve; // Xatolikni ham qayta ishlash
          });

          setIsPlaying(true);
          await audioRef.current.play();
        } else {
          // Bir xil qo'shiq, toggle qilamiz
          const newIsPlaying = !isPlaying;
          setIsPlaying(newIsPlaying);
          if (newIsPlaying) {
            await audioRef.current.play();
          } else {
            audioRef.current.pause();
          }
        }
      } else {
        // Faqat toggle
        const newIsPlaying = !isPlaying;
        setIsPlaying(newIsPlaying);
        if (newIsPlaying) {
          await audioRef.current.play();
        } else {
          audioRef.current.pause();
        }
      }
    } catch (error) {
      console.error("Audio error:", error);
      setIsPlaying(false);
    }
  };

  // Handle play/pause when isPlaying changes
  useEffect(() => {
    if (!audioRef.current) return;

    if (isPlaying) {
      audioRef.current.play().catch(error => {
        console.error("Error playing audio:", error);
        setIsPlaying(false);
      });
    } else {
      audioRef.current.pause();
    }
  }, [isPlaying]);

  // Handle song change
  useEffect(() => {
    if (!audioRef.current || !playingSong) return;

    audioRef.current.src = playingSong.audioUrl;
    if (isPlaying) {
      audioRef.current.play().catch(error => {
        console.error("Error playing audio:", error);
        setIsPlaying(false);
      });
    }
  }, [playingSong]);



  return (
    <AccessContext.Provider
      value={{
        test,
        audioRef,
        playingSong,
        setPlayingSong,
        popularMusic,
        isPlaying,
        setIsPlaying,
        currentSongId,
        togglePlayPause,
        setCurrentSongId,
        musicCategories,
        currentMusicCategory,
        playNextSong,
        playPreviousSong,
        isRepeat,
        setIsRepeat,
        isRepeatCount,
        setIsRepeatCount,
        shuffleMode,
        setShuffleMode,
        playedShuffleIds,
        setPlayedShuffleIds

      }}
    >
      {children}
    </AccessContext.Provider>
  );
};

export { AccessContext, AccessProvider };