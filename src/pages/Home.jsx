import { useState } from "react";


export default function Home() {
  const [name, setName] = useState("");
  const [note, setNote] = useState("");
  const [song, setSong] = useState("");
  const [generatedLink, setGeneratedLink] = useState("");
  const [copied, setCopied] = useState(false); 



  const handleGenerate = () => {
    const baseUrl = `${window.location.origin}/love`;

    const encodedName = encodeURIComponent(name);
    const encodedNote = encodeURIComponent(note);
    const encodedSong = encodeURIComponent(song);

    const url = `${baseUrl}?name=${encodedName}&note=${encodedNote}&song=${encodedSong}`;
    
    setGeneratedLink(url);
    setCopied(false); 
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(generatedLink);
    setCopied(true); 
  };

  return (
    <div className="min-h-screen bg-pink-100 flex items-center justify-center p-6">
      <div className="bg-white rounded-2xl shadow-xl p-8 w-full max-w-md">
        <h1 className="text-2xl font-bold text-pink-500 text-center mb-6">
          Create Your Love Link 💌
        </h1>

        <input
          type="text"
          placeholder="Crush's Name"
          className="w-full border p-3 rounded-lg mb-4"
          onChange={(e) => setName(e.target.value)}
        />

        <textarea
          placeholder="Write your sweet note..."
          className="w-full border p-3 rounded-lg mb-4"
          rows="4"
          onChange={(e) => setNote(e.target.value)}
        />

        <input
          type="text"
          placeholder="Song link (YouTube)"
          className="w-full border p-3 rounded-lg mb-6"
          onChange={(e) => setSong(e.target.value)}
        />

        <button
          onClick={handleGenerate}
          className=" cursor-pointer w-full bg-pink-500 text-white py-3 rounded-lg hover:bg-pink-600 transition mb-4"
        >
          Generate Love Link ❤️
        </button>

        {generatedLink && (
          <div className="flex flex-col items-center gap-2">
            <input
              type="text"
              value={generatedLink}
              readOnly
              className="w-full border p-2 rounded-lg text-sm"
            />
            <button
              onClick={handleCopy}
              className={` cursor-pointer bg-pink-400 text-white py-2 px-4 rounded-lg transition ${
                copied ? "bg-pink-600" : "hover:bg-pink-500"
              }`}
            >
              {copied ? "Copied 💌" : "Copy Link 💌"}
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
