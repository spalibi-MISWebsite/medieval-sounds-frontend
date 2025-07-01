import { useState, useEffect } from 'react';
import { client } from '../lib/sanity';
import Link from 'next/link';
import Image from 'next/image';

export default function Home() {
  const [featuredSound, setFeaturedSound] = useState(null);
  const [featuredText, setFeaturedText] = useState(null);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    client.fetch(`*[_type == "sound" && featured == true][0]{
      title,
      "imageUrl": image.asset->url,
      "audioUrl": file.asset->url,
      originalText,
      translatedText
    }`).then(setFeaturedSound);

    client.fetch(`*[_type == "refText" && featured == true][0]{
      title,
      date,
      "imageUrl": image.asset->url
    }`).then(setFeaturedText);
  }, []);

  return (
    <>
      {/* Header */}
      <header
        className="text-[#E3D9D1] h-20 sticky top-0 z-50 bg-[#7B2E3C]"
        //style={{ backgroundColor: 'rgba(93, 74, 79, 1)' }}
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
            <li><Link href="/" className="font-bold hover:underline">Home</Link></li>
            <li><Link href="/about" className="hover:underline">About</Link></li>
            <li><Link href="/sounds" className="hover:underline">Sounds</Link></li>
            <li><Link href="/texts" className="hover:underline">Texts</Link></li>
            <li><Link href="/credits" className="hover:underline">Credits</Link></li>
          </ul>
        </div>

        {/* Navigation Links (mobile dropdown) */}
        {menuOpen && (
          <ul className="sm:hidden flex flex-col items-center space-y-4 pb-4 bg-[#7B2E3C] text-sm tracking-widest uppercase font-serif">
            <li><Link href="/" className="font-bold hover:underline">Home</Link></li>
            <li><Link href="/about" className="hover:underline">About</Link></li>
            <li><Link href="/sounds" className="hover:underline">Sounds</Link></li>
            <li><Link href="/texts" className="hover:underline">Texts</Link></li>
            <li><Link href="/credits" className="hover:underline">Credits</Link></li>
          </ul>
        )}
      </header>


      {/* Cover Image */}
      <div className="relative -mt-40 z-0 w-full h-[500px] sm:h-[600px] md:h-[700px]">
        <Image
          src="/images/cover.png"
          alt="Libro de Horas cover"
          fill
          className="object-cover opacity-90"
          priority
        />

        <div className="absolute inset-0 flex flex-col items-center justify-center text-center px-4">
          <h2 className="text-[#E3D9D1] text-2xl sm:text-4xl md:text-5xl font-serif drop-shadow-lg mb-2">
            Medieval Iberian Sound
          </h2>
          <p className="text-[#E3D9D1] text-sm sm:text-base md:text-lg drop-shadow font-serif">
            A DIGITAL HUMANITIES PROJECT
          </p>
        </div>
      </div>

      {/* Introduction Section */}
      <section className="bg-[#E3D9D1] px-4 sm:px-6 lg:px-12 py-12">
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center gap-12">
          <div className="text-sm sm:text-base leading-relaxed tracking-wide text-[#30251d]">
            <h2 className="text-xl font-bold font-serif mb-4">Brief Introduction and Project Overview</h2>
            <p className="font-serif">
              This site, part of my ongoing research project, aims to provide both a research repository for different 
              approximations to an archive of sound that has been effectively lost, and also to serve as a frame of reference 
              for the imagination of sound in a variety of pedagogical settings. While there has been a lot of interest 
              regarding the history of the different technologies that transmit, record, and preserve sound, these archives 
              have tended to document mostly a modern idea of sound, especially from the 19th century onward. Earlier periods 
              have to contend with the absence of a contemporary record of these sounds except for the textual references to 
              them. Among these, literary language is a particularly creative and rich site for the transcription, 
              translation, and instrumentalization of sound. Using medieval Iberian literary texts as pretexts, this site 
              brings together fragments of works that demand a sonic literacy from the audience, supplemented with sound 
              files that are themselves approximations, reimaginings of medieval sound, attempting to bridge the gap between 
              our present loss and a fictional archive.
            </p>
            <div className="mt-6 flex justify-center md:justify-start">
              <Link href="/about" className="w-full sm:w-auto bg-[#2f4150] hover:bg-[#1c2730] transition-colors duration-200 
              rounded px-6 py-3 font-serif text-sm text-gray-200 text-center">
                LEARN MORE
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Section */}
      <section className="relative py-10 px-4 sm:px-6 lg:px-12">
        {/* Background image */}
        <div className="absolute inset-0 w-full h-full z-0">
          <Image
            src="/images/back-panel.png"
            alt="Flowering vine"
            fill
            className="object-cover opacity-50"
            quality={75}
          />
        </div>

        {/* Content */}
        <div className="relative z-10 max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-10">
          {/* Featured Sound */}
          <div className="bg-[#1A0A02]/70 text-[#E3D9D1] py-10 px-6 rounded-xl shadow-lg flex flex-col items-center text-center">
            {featuredSound ? (
              <>
                <h2 className="text-2xl md:text-3xl font-serif mb-6">Featured Sound</h2>
                <Image
                  src={featuredSound.imageUrl}
                  alt={featuredSound.title}
                  width={150}           // smaller width
                  height={150}          // smaller height (keep square for circle)
                  className="rounded-full object-cover mb-6"  // rounded-full for circle
                />

                <h3 className="text-xl font-serif mb-6">{featuredSound.title}</h3>
                {featuredSound.audioUrl && (
                  <audio controls className="w-full max-w-sm mx-auto mb-6">
                    <source src={featuredSound.audioUrl} type="audio/mpeg" />
                  </audio>
                )}
                <Link
                  href="/sounds"
                  className="bg-[#765B33] hover:bg-[#594526] transition-colors duration-200 rounded px-6 py-3 font-serif text-sm text-[#E1DBD2]"
                >
                  EXPLORE ALL SOUNDS
                </Link>
              </>
            ) : (
              <p>No featured sound found.</p>
            )}
          </div>

          {/* Featured Text */}
          <div className="bg-[#1A0A02]/70 text-[#E3D9D1] p-8 rounded-xl shadow-lg flex flex-col items-center text-center">
            {featuredText ? (
              <>
                <p className="font-serif text-2xl md:text-3xl mb-6">Featured Text</p>
                <div className="w-40 h-60 mb-6">
                  <Image
                    src={featuredText.imageUrl}
                    alt={featuredText.title}
                    width={160}
                    height={240}
                    className="object-cover shadow-md rounded"
                  />
                </div>

                <p className="font-serif text-xl mb-6">
                  {featuredText.title}
                  {featuredText.date && <><br /><span className="text-lg">{featuredText.date}</span></>}
                </p>
                <Link
                  href="/texts"
                  className="bg-[#765B33] hover:bg-[#594526] transition-colors duration-200 rounded px-6 py-3 font-serif text-sm text-[#E1DBD2]"
                >
                  EXPLORE ALL TEXTS
                </Link>
              </>
            ) : (
              <p className="text-white">No featured text found.</p>
            )}
          </div>
        </div>
      </section>


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
