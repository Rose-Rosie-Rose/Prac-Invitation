import { useEffect, useRef, useState } from "react";

export const BackgroundMusic = () => {
  const [isPlaying, setIsPlaying] = useState(false);
  const audioRef = useRef(null);

  useEffect(() => {
    const audio = audioRef.current;
    audio.addEventListener("canplay", () => {
      if (isPlaying) {
        audio.play();
      }
    });
    return () => {
      audio.removeEventListener("canplay", () => {});
    };
  }, [isPlaying]);

  const handleTogglePlay = () => {
    if (isPlaying) {
      audioRef.current.pause();
    } else {
      audioRef.current
        .play()
        .catch((error) =>
          console.error("Error attempting to play audio:", error)
        );
    }
    setIsPlaying(!isPlaying);
  };

  return (
    <>
      <button onClick={handleTogglePlay}>{isPlaying ? "멈춤" : "재생"}</button>
      <audio ref={audioRef} loop>
        <source src="/assets/backgroundMusic.mp3" type="audio/mp3" />
      </audio>
    </>
  );
};
