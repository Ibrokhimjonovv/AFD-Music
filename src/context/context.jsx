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
      imageUrl: "https://i.scdn.co/image/ab67616d00001e026492453ee238cd8546c6850e",
      title: "A Little Death",
      artist: "The Neighbourhood",
      audioUrl: "/music/a-little-death.mp3", // Replace with actual audio URL
      category: 1,
    },
    {
      id: 6,
      imageUrl: "https://i.scdn.co/image/ab67616d00001e024d070fdf58fad8c54c5beb85",
      title: "No One Noticed",
      artist: "The Marías",
      audioUrl: "/music/no-one-noticed.mp3", // Replace with actual audio URL
      category: 1,
    },
    {
      id: 7,
      imageUrl: "https://i.scdn.co/image/ab67616d00001e02870c1c64b1d77eb4456e4283",
      title: "Камин",
      artist: "EMIN feat. JONY",
      audioUrl: "/music/kamin.mp3", // Replace with actual audio URL
      category: 1,
    },
    {
      id: 8,
      imageUrl: "https://i.scdn.co/image/ab67616d00001e02249dc66f0cb95bed7dacc39e",
      title: "Smart",
      artist: "Le Sserafim",
      audioUrl: "/music/smart.mp3", // Replace with actual audio URL
      category: 1,
    },
    {
      id: 9,
      imageUrl: "https://i.scdn.co/image/ab67616d00001e0210f1253af109738ad9ecea86",
      title: "Hot",
      artist: "Le Sserafim",
      audioUrl: "/music/hot.mp3", // Replace with actual audio URL
      category: 1,
    },
    {
      id: 10,
      imageUrl: "https://i.scdn.co/image/ab67616d00001e025e352f6eccf8cb96d0b247cc",
      title: "Perfect Night",
      artist: "Le Sserafim",
      audioUrl: "/music/perfect-night.mp3", // Replace with actual audio URL
      category: 1,
    },
    {
      id: 11,
      imageUrl: "https://i.scdn.co/image/ab67616d00001e029b6ac98a52f62d5cb473da40",
      title: "Reflections",
      artist: "The Neighbourhood",
      audioUrl: "/music/reflections.mp3", // Replace with actual audio URL
      category: 1,
    },
    {
      id: 12,
      imageUrl: "https://i.scdn.co/image/ab67616d00001e028265a736a1eb838ad5a0b921",
      title: "Sweater weather",
      artist: "The Neighbourhood",
      audioUrl: "/music/sweater-weather.flac", // Replace with actual audio URL
      category: 1,
    },
    {
      id: 13,
      imageUrl: "https://i.scdn.co/image/ab67616d00001e029b6ac98a52f62d5cb473da40",
      title: "Softcore",
      artist: "The Neighbourhood",
      audioUrl: "/music/softcore.mp3", // Replace with actual audio URL
      category: 1,
    },
    {
      id: 14,
      imageUrl: "https://i.scdn.co/image/ab67616d00001e02ab9433cc4b9cda9431be879a",
      title: "Just One Day",
      artist: "BTS",
      audioUrl: "/music/just-one-day.mp3", // Replace with actual audio URL
      category: 1,
    },
    {
      id: 15,
      imageUrl: "https://i.scdn.co/image/ab67616d00001e0224fdfeddf0a47e8ca85c1b2f",
      title: "Пустота",
      artist: "Jony",
      audioUrl: "/music/pustota.m4a", // Replace with actual audio URL
      category: 1,
    },
    {
      id: 16,
      imageUrl: "https://i.scdn.co/image/ab67616d00001e02b9e31d66c27f4124e3e39a62",
      title: "No queda na",
      artist: "Babi~Marc Seguí",
      audioUrl: "/music/no-queda-na.flac", // Replace with actual audio URL
      category: 1,
    },
  ];

  const [currentMusicCategory, setCurrentMusicCategory] = useState(popularMusic[0].category)
  const [shuffleMode, setShuffleMode] = useState(false);
  const [playedShuffleIds, setPlayedShuffleIds] = useState([]);
  const [isRightPlayingSong, setIsRightPlayingSong] = useState(true);
  const [isSmaller, setIsSmaller] = useState(false);
  const [likedSongs, setLikedSongs] = useState([]);
  const [progress, setProgress] = useState(0);
  const [duration, setDuration] = useState(0);
  const [currentTime, setCurrentTime] = useState(0);

  const handleTimeUpdate = () => {
    if (audioRef.current && !isNaN(audioRef.current.duration)) {
      const newCurrentTime = audioRef.current.currentTime;
      const newDuration = audioRef.current.duration;
      const newProgress = (newCurrentTime / newDuration) * 100;

      setCurrentTime(newCurrentTime);
      setDuration(newDuration);
      setProgress(newProgress);

      console.log("Time update:", {
        currentTime: newCurrentTime,
        duration: newDuration,
        progress: newProgress
      });
    }
  };

  const toggleLike = (song) => {
    setLikedSongs((prev) => {
      const exists = prev.find((s) => s.id === song.id);
      if (exists) {
        return prev.filter((s) => s.id !== song.id);
      } else {
        return [...prev, song];
      }
    });
  };


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

  // Add this effect to set up audio element
  useEffect(() => {
    if (!audioRef.current) return;

    const audio = audioRef.current;
    audio.addEventListener('timeupdate', handleTimeUpdate);
    audio.addEventListener('loadedmetadata', handleTimeUpdate);

    return () => {
      audio.removeEventListener('timeupdate', handleTimeUpdate);
      audio.removeEventListener('loadedmetadata', handleTimeUpdate);
    };
  }, []);

  useEffect(() => {
    if (!audioRef.current) return;

    const audio = audioRef.current;

    // Add all event listeners
    const updateEvents = () => {
      audio.addEventListener('timeupdate', handleTimeUpdate);
      audio.addEventListener('loadedmetadata', handleTimeUpdate);
      audio.addEventListener('canplay', handleTimeUpdate);
      audio.addEventListener('progress', handleTimeUpdate);
    };

    // Cleanup function
    const cleanup = () => {
      audio.removeEventListener('timeupdate', handleTimeUpdate);
      audio.removeEventListener('loadedmetadata', handleTimeUpdate);
      audio.removeEventListener('canplay', handleTimeUpdate);
      audio.removeEventListener('progress', handleTimeUpdate);
    };

    updateEvents();
    return cleanup;
  }, [playingSong?.audioUrl]); // Re-run when audio URL changes

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
        setPlayedShuffleIds,
        isRightPlayingSong,
        setIsRightPlayingSong,
        isSmaller,
        setIsSmaller,
        likedSongs,
        toggleLike,
        progress,
        setProgress,
        duration,
        setDuration,
        currentTime,
        setCurrentTime,

      }}
    >
      {children}
      <audio
        ref={audioRef}
        onEnded={() => {
          if (isRepeat) {
            if (isRepeatCount === 1) {
              audioRef.current.currentTime = 0;
              audioRef.current.play();
            }
          } else {
            playNextSong();
            setIsPlaying(false);
          }
        }}
      />
    </AccessContext.Provider>
  );
};

export { AccessContext, AccessProvider };