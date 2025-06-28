import { useEffect, useState } from 'react'
import { client } from '../lib/sanity'
import Link from 'next/link';
import Image from 'next/image';

export default function Credits() {
    const [sources, setSources] = useState([])
    const [menuOpen, setMenuOpen] = useState(false);
    const [openSections, setOpenSections] = useState({
        textSource: false,
        soundSource: false,
        imageSource: false,
    });

    useEffect(() => {
        client.fetch(`*[_type == "source"]{
        link,
        siteTitle,
        category
        }`).then((data) => {
        console.log('Fetched:', data)
        setSources(data)
        })
    }, [])

    const grouped = {
        textSource: sources.filter((s) => s.category === 'textSource'),
        soundSource: sources.filter((s) => s.category === 'soundSource'),
        imageSource: sources.filter((s) => s.category === 'imageSource'),
    };


    const toggleSection = (section) => {
        setOpenSections((prev) => ({
        ...prev,
        [section]: !prev[section],
        }));
    };

    const sectionTitleMap = {
        textSource: 'Text Sources',
        soundSource: 'Sound Sources',
        imageSource: 'Image Sources',
    };


    return (
        <>
            {/* Header */}
            <header className="bg-[#1A0A02] text-[#E3D9D1] h-20 sticky top-0 z-50">
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
                    <li><Link href="/texts" className="hover:underline">Texts</Link></li>
                    <li><Link href="/credits" className="font-bold hover:underline">Credits</Link></li>
                </ul>
                </div>

                {/* Navigation Links (mobile dropdown) */}
                {menuOpen && (
                <ul className="sm:hidden flex flex-col items-center space-y-4 pb-4 bg-[#1A0A02] text-sm tracking-widest uppercase font-serif">
                    <li><Link href="/" className="hover:underline">Home</Link></li>
                    <li><Link href="/about" className="hover:underline">About</Link></li>
                    <li><Link href="/sounds" className="hover:underline">Sounds</Link></li>
                    <li><Link href="/texts" className="hover:underline">Texts</Link></li>
                    <li><Link href="/credits" className="font-bold hover:underline">Credits</Link></li>
                </ul>
                )}
            </header>

            <div className="relative -mt-40 z-0 w-full h-[500px] sm:h-[600px] md:h-[700px]">
                <Image
                    src="/images/cover.png"
                    alt="Libro de Horas cover"
                    fill
                    className="object-cover opacity-80"
                    priority
                />
                <div className="absolute inset-0 flex flex-col items-center justify-center text-center">
                <h2 className="text-[#E3D9D1] text-3xl md:text-5xl font-serif drop-shadow-lg mb-2">
                    Credits
                </h2>
                </div>
            </div>
        
            {/* Intro */}
            <div className="p-10 h-auto bg-[#E3D9D1] font-serif">
                <p className="text-xl text-gray-800 p-8">
                The content on this site links texts to sound files, using images from a variety of manuscripts. The modern
                editions of the texts used are credited below. For the sound files, we have used the databases listed below,
                in addition to our own recordings or properly credited ones, which can be found here as well. Manuscript
                images are from digital libraries, as noted.
                </p>

                {/* Dropdown Sections */}
                {['textSource', 'soundSource', 'imageSource'].map((key) => (
                <div key={key} className="mb-6">
                    <button
                    onClick={() => toggleSection(key)}
                    className="w-full text-left text-2xl font-bold mb-2 px-4 py-2 bg-[#3B0A0A] text-[#E3D9D1] rounded hover:bg-[#4f1d1d] transition"
                    >
                    {sectionTitleMap[key]}
                    </button>
                    {openSections[key] && (
                    <ul className="px-8 py-4 space-y-2 text-lg list-disc text-[#1A0A02] bg-[#f1ebe6] rounded">
                        {grouped[key].length > 0 ? (
                        grouped[key].map((source, idx) => (
                            <li key={idx}>
                            <Link
                                href={source.link}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="underline hover:text-[#3B0A0A]"
                            >
                                {source.siteTitle}
                            </Link>
                            </li>
                        ))
                        ) : (
                        <li className="italic text-base">No sources listed.</li>
                        )}
                    </ul>
                    )}
                </div>
                ))}
            </div>


            {/* Student Contributors Section */}
            <section className="relative bg-[#464B2C]/25 py-10 px-4 sm:px-6 lg:px-12">
                <div className="relative z-10 max-w-6xl mx-auto">
                    <h2 className="text-3xl text-center font-serif text-[#E3D9D1] mb-10">Student Contributors</h2>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
                    {/* Student Researchers */}
                    <div className="bg-[#464B2C]/60 text-[#E3D9D1] p-8 rounded-xl shadow-lg flex flex-col items-center text-center">
                        <h3 className="text-2xl font-bold font-serif mb-4">Research</h3>
                        <ul className="space-y-2 text-base font-mono">
                            <li>Jack Brown</li>
                            <li>María Camila Castro Maldonado</li>
                            <li>Rocío Corral García</li>
                            <li>Juan Harari</li>
                            <li>Montse Li</li>
                            <li>Sara Stamatiades</li>
                            <li>Nicholas Lorenzo Vega</li>
                        </ul>
                    </div>

                    {/* Web Developers */}
                    <div className="bg-[#464B2C]/70 text-[#E3D9D1] p-8 rounded-xl shadow-lg flex flex-col items-center text-center">
                        <h3 className="text-2xl font-bold font-serif mb-4">Web Design</h3>
                        <ul className="space-y-2 text-base font-mono">
                            <li>Jesse Cheng</li>
                            <li>Melanie Jalbert</li>
                            <li>Jessica Rose Ritchie</li>
                        </ul>
                    </div>
                    </div>
                </div>
            </section>

            {/* Footer */}
            <footer className="bg-[#1A0A02] text-[#E3D9D1] px-10 py-8">
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
    )
}
