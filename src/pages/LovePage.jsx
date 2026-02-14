import { useLocation } from "react-router-dom";
import { useEffect, useState } from "react";

// Extract YouTube video ID
function extractYouTubeID(url) {
  const regex =
    /(?:youtube\.com\/(?:watch\?v=|embed\/)|youtu\.be\/)([a-zA-Z0-9_-]{11})/;
  const match = url.match(regex);
  return match ? match[1] : null;
}

// Floating heart
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

// Floating rose
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

// Confetti
function Confetti({ style }) {
  return (
    <div
      className="absolute w-2 h-2 rounded-full bg-pink-400 opacity-80 animate-fall"
      style={style}
    ></div>
  );
}

// Mouse heart
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
  const [canPlay, setCanPlay] = useState(false);
  const [mousePos, setMousePos] = useState({ x: null, y: null });
  const name = params.get("name");
  const note = params.get("note");
  const song = params.get("song");
  const videoId = extractYouTubeID(song);

  useEffect(() => {
    const handleMouseMove = (e) => setMousePos({ x: e.clientX, y: e.clientY });
    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  useEffect(() => {
    const enableAudio = () => setCanPlay(true);
    window.addEventListener("click", enableAudio, { once: true });
    return () => window.removeEventListener("click", enableAudio);
  }, []);

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

  const handleYes = () => setShowGif(true);

  return (
    <div className="relative min-h-screen overflow-hidden">
      {showGif ? (
        // GIF page
        <div className="relative min-h-screen flex items-center justify-center bg-pink-200 overflow-hidden">
          <img
            src="https://media.giphy.com/media/JIX9t2j0ZTN9S/giphy.gif"
            alt="cute cat gif"
            className="absolute top-0 left-0 w-full h-full object-cover z-0"
          />
          {song && !videoId && <audio src={song} autoPlay loop />}
          {song && videoId && (
            <iframe
              width="0"
              height="0"
              src={`https://www.youtube.com/embed/${videoId}?autoplay=1&loop=1&playlist=${videoId}`}
              title="Love Song"
              allow="autoplay"
            />
          )}
        </div>
      ) : (
    
        <div className="relative min-h-screen bg-gradient-to-br from-pink-300 to-red-300 flex items-center justify-center overflow-hidden p-4 md:p-6">
          {hearts}
          {roses}
          {confetti}
          <MouseHeart x={mousePos.x} y={mousePos.y} />

          <div className="bg-white p-6 md:p-12 rounded-[30px] shadow-[0_15px_40px_rgba(255,77,109,0.3)] text-center w-full max-w-md z-10 relative animate-fade-in">
            <h1 className="text-2xl md:text-4xl font-extrabold text-pink-600 mb-4 animate-pulse scale-up">
              💖 Will you be my Valentine? 💖
            </h1>

            {name && (
              <h2 className="text-lg md:text-2xl font-semibold text-pink-500 mb-4 flex items-center justify-center gap-2 animate-bounce-slow">
                Hey {name} <span className="animate-spin">✨</span>
              </h2>
            )}

            <p className="text-sm md:text-lg text-gray-700 mb-6 relative before:content-['❝'] before:text-pink-300 before:text-2xl before:absolute before:-left-4 before:-top-1 after:content-['❞'] after:text-pink-300 after:text-2xl after:absolute after:-right-4 after:-bottom-1">
              {note}
            </p>

            {song && (
              <>
                {!canPlay ? (
                  <button
                    onClick={() => setCanPlay(true)}
                    className="mt-4 bg-gradient-to-r from-pink-400 to-pink-600 text-white py-2 md:py-3 px-4 md:px-6 rounded-full shadow-lg hover:scale-105 hover:from-pink-500 hover:to-pink-700 transition transform text-sm md:text-base"
                  >
                    ▶ Play Your Love Song 🎵
                  </button>
                ) : videoId ? (
                  <iframe
                    width="0"
                    height="0"
                    src={`https://www.youtube.com/embed/${videoId}?autoplay=1&loop=1&playlist=${videoId}`}
                    title="Love Song"
                    allow="autoplay"
                  ></iframe>
                ) : (
                  <audio src={song} autoPlay loop />
                )}

                {canPlay && (
                  <p className="text-pink-500 font-semibold mt-2 animate-pulse text-sm md:text-base">
                    🎵 Playing your song!
                  </p>
                )}
              </>
            )}

            <div className="mt-4 md:mt-6 flex flex-col sm:flex-row justify-center gap-2 sm:gap-4">
              <button
                onClick={handleYes}
                className="bg-pink-500 text-white py-2 px-4 rounded-lg hover:bg-pink-600 transition w-full sm:w-auto"
              >
                Yes ❤️
              </button>
              <button
                onClick={handleYes}
                className="bg-pink-500 text-white py-2 px-4 rounded-lg hover:bg-pink-600 transition w-full sm:w-auto"
              >
                Definitely Yes 💖
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
