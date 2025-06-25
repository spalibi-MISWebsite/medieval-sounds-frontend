import { useEffect, useState } from 'react'
import { client } from '../lib/sanity'
import TextCard from '../components/textCard'

export default function Texts() {
    const [texts, setTexts] = useState([])
    const [menuOpen, setMenuOpen] = useState(false);

    useEffect(() => {
        client.fetch(`*[_type == "refText"]{
            _id,
            title,
            year,
            "imageUrl": image.asset->url
        }`).then((data) => {
            console.log('Fetched:', data)
            setTexts(data)
        })
    }, [])

  
    return (
        <>
        {/* Header */}
        <header className="bg-[#1A0A02] text-[#E3D9D1] h-20 sticky top-0 z-50">
            <div className="flex items-center justify-between px-4 sm:px-6 lg:px-12 py-6">
            <a href="/" className="text-xl font-bold font-serif">
                Medieval Iberian Sounds
            </a>

            {/* Hamburger */}
            <button
                className="sm:hidden focus:outline-none"
                onClick={() => setMenuOpen(!menuOpen)}
                aria-label="Toggle navigation"
            >
                <svg
                className="w-6 h-6 text-[#E3D9D1]"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
                >
                {menuOpen ? (
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                ) : (
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
                )}
                </svg>
            </button>

            {/* Navigation Links (desktop) */}
            <ul className="hidden sm:flex space-x-6 text-sm tracking-widest uppercase font-mono">
                <li><a href="/" className="hover:underline">Home</a></li>
                <li><a href="/about" className="hover:underline">About</a></li>
                <li><a href="/sounds" className="hover:underline">Sounds</a></li>
                <li><a href="/texts" className="font-bold hover:underline">Texts</a></li>
                <li><a href="/sources" className="hover:underline">Sources</a></li>
            </ul>
            </div>

            {/* Navigation Links (mobile dropdown) */}
            {menuOpen && (
            <ul className="sm:hidden flex flex-col items-center space-y-4 pb-4 bg-[#1A0A02] text-sm tracking-widest uppercase font-mono">
                <li><a href="/" className="hover:underline">Home</a></li>
                <li><a href="/about" className="hover:underline">About</a></li>
                <li><a href="/sounds" className="hover:underline">Sounds</a></li>
                <li><a href="/texts" className="font-bold hover:underline">Texts</a></li>
                <li><a href="/sources" className="hover:underline">Sources</a></li>
            </ul>
            )}
        </header>
        
        <div className="relative -mt-40 z-0">
            <img
            src="/images/cover.png"
            alt="Libro de Horas cover"
            className="w-full h-[500px] sm:h-[600px] md:h-[700px] object-cover opacity-35"
            />

            <div className="absolute inset-0 flex flex-col items-center justify-center text-center">
            <h2 className="text-[#E3D9D1] text-3xl md:text-5xl font-serif drop-shadow-lg mb-2">
                Available Texts
            </h2>
            </div>
        </div>

        {/* Text Cards Section */}
        <div className="p-6 h-auto bg-[#E3D9D1] flex justify-center">
            <TextCard allTexts={texts}/>
        </div>

        <footer className="bg-[#1A0A02] text-[#E3D9D1] px-10 py-8">
            <div className="flex flex-col md:flex-row justify-between items-center md:items-start max-w-7xl mx-auto">
            
            <div className="text-center md:text-left mb-6 md:mb-0">
                <h2 className="text-xl md:text-3xl font-serif mb-1">
                Medieval Iberian Sound
                </h2>
                <p className="text-sm md:text-base font-light tracking-wide">
                A Digital Humanities Project
                </p>
            </div>

            <ul className="flex space-x-10 text-sm tracking-widest uppercase font-mono">
                <li><a href="/" className="hover:underline">Home</a></li>
                <li><a href="/about" className="hover:underline">About</a></li>
                <li><a href="/sounds" className="hover:underline">Sounds</a></li>
                <li><a href="/texts" className="hover:underline">Texts</a></li>
                <li><a href="/sources" className="hover:underline">Sources</a></li>
            </ul>

            </div>
        </footer>
    </>
  );
}
