import { useState, useEffect } from 'react'
import { client } from '../lib/sanity'
import SoundCard from '../components/soundCard'
import Image from 'next/image';
import Link from 'next/link';

export default function Sounds() {
    const [menuOpen, setMenuOpen] = useState(false);
    const [sounds, setSounds] = useState([])
    const [searchTerm, setSearchTerm] = useState("")
    const [categoryFilters, setCategoryFilters] = useState([])

    useEffect(() => {
        let baseQuery = `*[_type == "sound"`;
        const conditions = [];
        const params = {};

        if (categoryFilters.length > 0) {
            conditions.push(`category in $categories`);
            params.categories = categoryFilters;
        }

        if (searchTerm) {
            conditions.push(`title match $search`);
            params.search = `*${searchTerm}*`;
        }

        if (conditions.length > 0) {
            baseQuery += ` && ${conditions.join(' && ')}`;
        }

        baseQuery += `]{
            title,
            "imageUrl": image.asset->url,
            "audioUrl": file.asset->url,
            originalText,
            translatedText,
            category
        }`;

        client.fetch(baseQuery, params).then(setSounds);
    }, [searchTerm, categoryFilters]);

return (
    <>
      {/* Header */}
        <header className="bg-[#7B2E3C] text-[#E3D9D1] h-20 sticky top-0 z-50">
            <div className="flex items-center justify-between px-4 sm:px-6 lg:px-12 py-6">
            <Link href="/" className="text-xl font-bold font-serif">
                Medieval Iberian Sound
            </Link>

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
            <ul className="hidden sm:flex space-x-6 text-sm tracking-widest uppercase font-serif">
                <li><Link href="/" className="hover:underline">Home</Link></li>
                <li><Link href="/about" className="hover:underline">About</Link></li>
                <li><Link href="/sounds" className="font-bold hover:underline">Sounds</Link></li>
                <li><Link href="/texts" className="hover:underline">Texts</Link></li>
                <li><Link href="/credits" className="hover:underline">Credits</Link></li>
            </ul>
            </div>

            {/* Navigation Links (mobile dropdown) */}
            {menuOpen && (
            <ul className="sm:hidden flex flex-col items-center space-y-4 pb-4 bg-[#7B2E3C] text-sm tracking-widest uppercase font-serif">
                <li><Link href="/" className="hover:underline">Home</Link></li>
                <li><Link href="/about" className="hover:underline">About</Link></li>
                <li><Link href="/sounds" className="font-bold hover:underline">Sounds</Link></li>
                <li><Link href="/texts" className="hover:underline">Texts</Link></li>
                <li><Link href="/credits" className="hover:underline">Credits</Link></li>
            </ul>
            )}
        </header>
        
        <div className="relative -mt-40 z-0 w-full h-[500px] sm:h-[600px] md:h-[700px]">
            <Image
                src="/images/cover.png"
                alt="Libro de Horas cover"
                fill
                className="object-cover opacity-90"
                priority
            />

            <div className="absolute inset-0 flex flex-col items-center justify-center text-center">
            <h2 className="text-[#E3D9D1] text-3xl md:text-5xl font-serif drop-shadow-lg mb-2">
                Sounds
            </h2>
            </div>
        </div>

        {/* Search and filter section */}
        <div className="bg-[#E3D9D1] px-10 py-8 font-serif">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                
                {/* Search Bar */}
                <input
                type="text"
                placeholder="Search by title..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="p-2 border border-[#1A0A02] text-[#1A0A02] rounded w-full sm:w-1/2"
                />

                {/* Category Chips */}
                <div className="flex flex-wrap gap-2 justify-center sm:justify-start">
                {["animal", "religion", "nature", "voice", "instrument", "everyday", "war", "other"].map((cat) => (
                    <button
                    key={cat}
                    onClick={() =>
                        setCategoryFilters((prev) =>
                        prev.includes(cat)
                            ? prev.filter((c) => c !== cat)
                            : [...prev, cat]
                        )
                    }
                    className={`px-4 py-2 rounded-full text-sm font-mono tracking-wide border transition 
                        ${
                        categoryFilters.includes(cat)
                            ? "bg-[#1A0A02] text-[#E3D9D1] border-[#1A0A02]"
                            : "bg-[#E3D9D1] text-[#1A0A02] border-[#1A0A02] hover:bg-[#e2cfc0]"
                        }`}
                    >
                    {cat.charAt(0).toUpperCase() + cat.slice(1)}
                    </button>
                ))}
                </div>
            </div>
        </div>

        {/* Sound Cards Section */}
        <div className="p-6 h-auto bg-[#E3D9D1] flex justify-center">
            <SoundCard allSounds={sounds}/>
        </div>

        {/* Footer */}
        <footer className="bg-[#7B2E3C] text-[#E3D9D1] px-10 py-8">
          <div className="flex flex-col md:flex-row justify-between items-center md:items-start max-w-7xl mx-auto">
            <div className="text-center md:text-left mb-6 md:mb-0">
              <h2 className="text-xl md:text-3xl font-serif mb-1">Medieval Iberian Sound</h2>
              <p className="text-sm md:text-base font-light tracking-wide font-serif">A Digital Humanities Project</p>
            </div>

            {/* Hide nav on small screens */}
            <div className="hidden sm:flex">
              <ul className="flex space-x-10 text-sm tracking-widest uppercase font-serif">
                <li><Link href="/" className="hover:underline">Home</Link></li>
                <li><Link href="/about" className="hover:underline">About</Link></li>
                <li><Link href="/sounds" className="hover:underline">Sounds</Link></li>
                <li><Link href="/texts" className="hover:underline">Texts</Link></li>
                <li><Link href="/credits" className="hover:underline">Credits</Link></li>
              </ul>
            </div>
          </div>
        </footer>
    </>
  );
}
