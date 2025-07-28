import { useEffect, useState } from 'react'
import { client } from '../lib/sanity'
import TextCard from '../components/textCard'
import Link from 'next/link';
import Image from 'next/image';

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
            <header
                className="text-[#E3D9D1] h-20 sticky top-0 z-50"
                style={{ backgroundColor: 'rgba(38, 4, 8, 0.5)' }}
            >              
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
                    <li><Link href="/sounds" className="hover:underline">Sounds</Link></li>
                    <li><Link href="/texts" className="font-bold hover:underline">Texts</Link></li>
                    <li><Link href="/credits" className="hover:underline">Credits</Link></li>
                </ul>
                </div>

                {/* Navigation Links (mobile dropdown) */}
                {menuOpen && (
                <ul className="sm:hidden flex flex-col items-center space-y-4 pb-4 bg-[#7B2E3C] text-sm tracking-widest uppercase font-serif">
                    <li><Link href="/" className="hover:underline">Home</Link></li>
                    <li><Link href="/about" className="hover:underline">About</Link></li>
                    <li><Link href="/sounds" className="hover:underline">Sounds</Link></li>
                    <li><Link href="/texts" className="font-bold hover:underline">Texts</Link></li>
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
                    Available Texts
                </h2>
                </div>
            </div>

            {/* Text Cards Section */}
            <div className="p-6 h-auto bg-[#E3D9D1] flex justify-center">
                <TextCard allTexts={texts}/>
            </div>

            {/* Footer */}
            <footer className="bg-[#2e0905] text-[#E3D9D1] px-10 py-8">
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
