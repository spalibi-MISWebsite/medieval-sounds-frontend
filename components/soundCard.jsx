import { useState } from "react";
import Image from 'next/image';

export default function SoundCard({ allSounds }) {
  const [selectedSound, setSelectedSound] = useState(null);

  return (
    <>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-12">
        {allSounds.map((sound, idx) => (
          <div
            key={idx}
            className="relative w-[250px] h-[300px] overflow-hidden rounded-xl shadow-lg group cursor-pointer"
          >
            {/* Image */}
            {sound.imageUrl && (
              <Image
                src={sound.imageUrl}
                alt={sound.title}
                width={300}
                height={200}
                className="rounded object-cover"
                quality={75}
                loading="lazy"
              />
            )}

            {/* Overlay */}
            <div className="absolute inset-0 bg-gradient-to-b from-black/80 via-black/50 to-transparent opacity-0 
            group-hover:opacity-100 transition duration-300 flex flex-col justify-start items-center p-4 space-y-4">
              {sound.audioUrl && (
                <audio controls className="w-11/12">
                  <source src={sound.audioUrl} type="audio/mpeg" />
                  Your browser does not support the audio element.
                </audio>
              )}
              <button
                onClick={() => setSelectedSound(sound)}
                className="mt-2 bg-[#E3D9D1] text-black font-serif font-medium px-4 py-2 rounded hover:bg-[#d5ccc4] transition"
              >
                Read More
              </button>
            </div>

            {/* Title */}
            <div className="absolute bottom-0 w-full bg-white bg-opacity-90 text-black text-center py-2 font-serif text-lg">
              {sound.title}
            </div>
          </div>
        ))}
      </div>

      {/* Modal */}
      {selectedSound && (
        <div className="fixed inset-0 bg-black/80 z-50 flex items-center justify-center">
          <div className="bg-[#E3D9D1] text-black rounded-lg w-[600px] max-w-full p-8 relative shadow-xl flex gap-6">
            {/* Close Button */}
            <button
              onClick={() => setSelectedSound(null)}
              className="absolute top-4 right-4 text-white bg-[#3B0A0A] px-3 py-1 rounded text-lg font-bold"
            >
              X
            </button>

            {/* Image and Info */}
            <div className="flex flex-col items-center">
              <Image
                src={selectedSound.imageUrl}
                alt={selectedSound.title}
                width={300}
                height={200}
                className="rounded object-cover"
                quality={75}
                loading="lazy"
              />
              <h3 className="mt-4 font-serif text-xl text-center">
                {selectedSound.title}
              </h3>
              {selectedSound.audioUrl && (
                <audio controls className="mt-4 w-40">
                  <source src={selectedSound.audioUrl} type="audio/mpeg" />
                  Your browser does not support the audio element.
                </audio>
              )}
            </div>

            {/* Text Excerpt */}
            <div className="flex-1 flex flex-col justify-center text-xl font-serif text-left space-y-4 px-2">
              {selectedSound.originalText && (
                <div>
                  <h4 className="font-bold text-lg mb-1">Original:</h4>
                  <p>{selectedSound.originalText}</p>
                </div>
              )}
              {selectedSound.translatedText && (
                <div>
                  <h4 className="font-bold text-lg mb-1">Translation:</h4>
                  <p>{selectedSound.translatedText}</p>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </>
  );
}
