import { useLocation } from "react-router-dom";
import { useEffect, useState, useRef } from "react";

const CUTE_CAT_GIF =
  "https://media.giphy.com/media/v1.Y2lkPTc5MGI3NjExMTE1Yjd3MHBya2VrdnltYWU1MnB3NHpkN3NudHpxbzcycTlvbWpnaiZlcD12MV9naWZzX3NlYXJjaCZjdD1n/OvpA7YvA9INE7bgGOy/giphy.gif";

function extractYouTubeID(url) {
  const regex =
    /(?:youtube\.com\/(?:watch\?v=|embed\/)|youtu\.be\/)([a-zA-Z0-9_-]{11})/;
  const match = url.match(regex);
  return match ? match[1] : null;
}

function Heart({ style }) {
  return (
    <div
      className="absolute animate-bounce-slow"
      style={{
        fontSize: `${Math.random() * 24 + 16}px`,
        color: "#FF4D6D",
        ...style,
      }}
    >
      ❤️
    </div>
  );
}

function Rose({ style }) {
  return (
    <div
      className="absolute animate-bounce-slow"
      style={{
        fontSize: `${Math.random() * 28 + 16}px`,
        ...style,
      }}
    >
      🌹
    </div>
  );
}

function Confetti({ style }) {
  return (
    <div
      className="absolute w-2 h-2 rounded-full bg-pink-400 opacity-80 animate-fall"
      style={style}
    ></div>
  );
}

function MouseHeart({ x, y }) {
  if (x === null || y === null) return null;
  return (
    <div
      style={{
        position: "fixed",
        top: y - 10,
        left: x - 10,
        pointerEvents: "none",
        fontSize: "20px",
        color: "#FF4D6D",
        animation: "mouse-heart 1s forwards",
      }}
    >
      ❤️
    </div>
  );
}

export default function LovePage() {
  const location = useLocation();
  const params = new URLSearchParams(location.search);
  const [showGif, setShowGif] = useState(false);
  const [mousePos, setMousePos] = useState({ x: null, y: null });
  const [musicStarted, setMusicStarted] = useState(false);
  const name = params.get("name");
  const note = params.get("note");
  const song = params.get("song");
  const videoId = extractYouTubeID(song);
  const audioRef = useRef(null);
  const youtubePlayerRef = useRef(null);
  const youtubeContainerRef = useRef(null);
  const musicStartedRef = useRef(false);
  musicStartedRef.current = musicStarted;

  useEffect(() => {
    const handleMouseMove = (e) => setMousePos({ x: e.clientX, y: e.clientY });
    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  
  useEffect(() => {
    const img = new Image();
    img.src = CUTE_CAT_GIF;
  }, []);

  
  useEffect(() => {
    if (!videoId) return;
    if (
      !document.querySelector(
        'script[src="https://www.youtube.com/iframe_api"]'
      )
    ) {
      const tag = document.createElement("script");
      tag.src = "https://www.youtube.com/iframe_api";
      const firstScript = document.getElementsByTagName("script")[0];
      firstScript.parentNode.insertBefore(tag, firstScript);
    }
    const id = videoId;
    const tryPlay = (player) => {
      if (musicStartedRef.current && player?.playVideo) player.playVideo();
    };
    window.onYouTubeIframeAPIReady = function createPlayer() {
      const el = document.getElementById("youtube-player");
      if (el && id && !youtubePlayerRef.current) {
        youtubePlayerRef.current = new window.YT.Player("youtube-player", {
          videoId: id,
          playerVars: { autoplay: 0, loop: 1, playlist: id },
          events: {
            onReady: (e) => tryPlay(e.target),
          },
        });
      }
    };
    if (window.YT?.Player) {
      const el = document.getElementById("youtube-player");
      if (el && !youtubePlayerRef.current) {
        youtubePlayerRef.current = new window.YT.Player("youtube-player", {
          videoId,
          playerVars: { autoplay: 0, loop: 1, playlist: videoId },
          events: {
            onReady: (e) => tryPlay(e.target),
          },
        });
      }
    }
    return () => {
      delete window.onYouTubeIframeAPIReady;
    };
  }, [videoId]);

  const hearts = Array.from({ length: 15 }, (_, i) => (
    <Heart
      key={i}
      style={{
        top: `${Math.random() * 80}%`,
        left: `${Math.random() * 90}%`,
        animationDelay: `${Math.random() * 3}s`,
      }}
    />
  ));
  const roses = Array.from({ length: 10 }, (_, i) => (
    <Rose
      key={i}
      style={{
        top: `${Math.random() * 80}%`,
        left: `${Math.random() * 90}%`,
        animationDelay: `${Math.random() * 3}s`,
      }}
    />
  ));
  const confetti = Array.from({ length: 50 }, (_, i) => (
    <Confetti
      key={i}
      style={{
        left: `${Math.random() * 100}%`,
        top: `-${Math.random() * 20}%`,
        animationDelay: `${Math.random() * 5}s`,
      }}
    />
  ));

  const startMusic = () => {
    if (musicStarted) return;
    setMusicStarted(true);
    if (song && !videoId && audioRef.current) {
      audioRef.current.play().catch(() => {});
    }
    if (videoId && youtubePlayerRef.current?.playVideo) {
      youtubePlayerRef.current.playVideo();
    }
  };

  const handleYes = () => {
    startMusic();
    setShowGif(true);
  };

  return (
    <div className="relative min-h-screen overflow-hidden">
      {song && !videoId && (
        <audio ref={audioRef} src={song} loop className="hidden" />
      )}
      {song && videoId && (
        <div
          ref={youtubeContainerRef}
          id="youtube-player"
          className="hidden w-0 h-0"
          aria-hidden="true"
        />
      )}

      {showGif ? (
        <div className="relative min-h-screen flex items-center justify-center bg-pink-200 overflow-hidden">
          <img
            src={CUTE_CAT_GIF}
            alt="cute cat gif"
            className="absolute top-0 left-0 w-full h-full object-cover z-0"
            fetchPriority="high"
          />

          {confetti}
        </div>
      ) : (
        <div className="relative min-h-screen bg-gradient-to-br from-pink-300 to-red-300 flex items-center justify-center overflow-hidden p-4 md:p-6">
          {hearts}
          {roses}
          {confetti}
          <MouseHeart x={mousePos.x} y={mousePos.y} />

          <div className="bg-white p-6 md:p-12 rounded-[30px] shadow-[0_15px_40px_rgba(255,77,109,0.3)] text-center w-full max-w-md z-10 relative animate-fade-in">


            {name && (
              <h2 className="text-lg md:text-2xl font-semibold text-pink-500 mb-4 flex items-center justify-center gap-2 animate-bounce-slow">
                Hey {name} <span className="animate-spin">✨</span>
              </h2>
            )}

            <p className="text-sm md:text-lg text-gray-700 mb-6 relative before:content-['❝'] before:text-pink-300 before:text-2xl before:absolute before:-left-4 before:-top-1 after:content-['❞'] after:text-pink-300 after:text-2xl after:absolute after:-right-4 after:-bottom-1">
              {note}
            </p>

            {song && !musicStarted && (
              <div className="w-full flex justify-center mb-4">
                <button
                  type="button"
                  onClick={startMusic}
                  className=" cursor-pointer px-6 py-3 bg-gradient-to-r from-pink-400 via-pink-500 to-pink-600 text-white font-semibold rounded-full shadow-lg transform transition hover:scale-105 hover:shadow-2xl animate-bounce-slow flex items-center justify-center gap-1"
                >
                     <span>🎵 Play the music dedicated to you</span>
                  <span className="text-yellow-200 animate-pulse">✨</span>
                </button>
              </div>
            )}

            <div className="mt-4 md:mt-6 flex flex-col sm:flex-row justify-center gap-2 sm:gap-4">
              {/* <button
                onClick={handleYes}
                className=" cursor-pointer bg-pink-500 text-white py-2 px-4 rounded-lg hover:bg-pink-600 transition w-full sm:w-auto"
              >
                Yes ❤️
              </button> */}
              <button
                onClick={handleYes}
                className=" cursor-pointer bg-pink-500 text-white py-2 px-4 rounded-lg hover:bg-pink-600 transition w-full sm:w-auto"
              >
                I love You Too  💖
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
