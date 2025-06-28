import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';

export default function About() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <>
        {/* Header */}
        <header className="bg-[#BAA393] text-[#30251d] h-20 sticky top-0 z-50">
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
                <li><Link href="/about" className="font-bold hover:underline">About</Link></li>
                <li><Link href="/sounds" className="hover:underline">Sounds</Link></li>
                <li><Link href="/texts" className="hover:underline">Texts</Link></li>
                <li><Link href="/credits" className="hover:underline">Credits</Link></li>
            </ul>
            </div>

            {/* Navigation Links (mobile dropdown) */}
            {menuOpen && (
            <ul className="sm:hidden flex flex-col items-center space-y-4 pb-4 bg-[#1A0A02] text-sm tracking-widest uppercase font-serif">
                <li><Link href="/" className="hover:underline">Home</Link></li>
                <li><Link href="/about" className="font-bold hover:underline">About</Link></li>
                <li><Link href="/sounds" className="hover:underline">Sounds</Link></li>
                <li><Link href="/texts" className="hover:underline">Texts</Link></li>
                <li><Link href="/credits" className="hover:underline">Credits</Link></li>
            </ul>
            )}
        </header>

        {/* Cover Section */}
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
                    About the Project
                </h2>
            </div>
        </div>

        {/* Main Text Content */}
        <div className="bg-[#EDE0CF] p-4 sm:p-6 md:p-10 text-gray-800 space-y-10 font-serif">
            <p className="text-base sm:text-lg md:text-xl leading-relaxed">
                Sound studies have been growing exponentially in recent years, creating exciting new collaborations between 
                artists and sound engineers, between historians of science and musicologists. While there has been a lot of  
                interest regarding the history of the different technologies that transmit, record, and preserve sound, from  
                telephones to phonographs, recording and reproduction devices, these archives have tended to document mostly a 
                modern idea of sound, especially from the 19th century onward. Earlier periods have to contend with the absence 
                of a contemporary record of these sounds except for the textual references to them, whether in historical, 
                musical, scientific, or literary materials. Among these texts, only voice and musical materials can be 
                recreated/performed, while the complex aural dimension of everyday life that is critical to the experience of 
                the medieval period, literature in particular, is something that students, scholars, and the general public, 
                are left to “imagine” without having recourse to an archive.        
            </p>

            <Image
                src="/images/divider.png"
                alt="Flowering vine"
                width={1200}
                height={60}
                className="w-full h-auto"
                quality={75}
            />
            <p className="text-base sm:text-lg md:text-xl leading-relaxed">
                This site is part of my ongoing research project. This digital humanities project is a first step in
                gathering a number of soundscapes circumscribed at this stage by the period and the space defined by Medieval
                Iberia, a location and a period in which the exchanges between multiple languages, religions, and ethnicities
                produced a rich set of cultures with productive contrasts at all levels --including sound.
            </p>

            <Image
                src="/images/divider.png"
                alt="Flowering vine"
                width={1200}
                height={60}
                className="w-full h-auto"
                quality={75}
            />
            <p className="text-base sm:text-lg md:text-xl leading-relaxed">
                As the only contemporary record of sound available to us from eras in which there was no other recording 
                technology available, written language that alludes, suggests, or directly references 
                different soundscapes, is the only approximation that we have to this primary sense of cognition. Literature’s 
                relation to the aural is not only as record, however. While medieval literature was mostly experienced through 
                the ear, this aural dimension is not only crucial at the level of dissemination, but is essential to 
                composition itself. While sound’s import is most evident in poetry, it is also as part of literature’s most 
                complex rhetorical edifices, from onomatopoeia to allegory, from scene-building to characterization. Using 
                medieval Iberian literary texts as pretexts or starting points for these different roles of sound in 
                literature, this collection puts together fragments of works that demand a sonic literacy from the audience 
                to understand, supplement, or interpret texts. The sound files gathered in these archives are themselves 
                approximations, reimagining  medieval sound, attempting to bridge the gap between our present loss and a 
                fictional archive.        
            </p>
        </div>

        {/* Author Section */}
        <section className="w-full bg-[#BF6E46]/25 text-[#E3D9D1] px-6 py-20">
            <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center md:items-start md:gap-20 text-center md:text-left">
                
                {/* Image + Name + Email */}
                <div className="flex flex-col items-center md:items-start w-full md:w-1/3">
                    <Image
                        src="/images/headshot.jpg"
                        alt="Simone Pinet's headshot"
                        width={240}
                        height={240}
                        className="object-cover rounded-full"
                        quality={80}
                    />

                    <h3 className="mt-6 text-xl md:text-2xl font-semibold tracking-wide">Prof. Simone Pinet</h3>
                    <p className="text-sm md:text-base mt-2">sp349@cornell.edu</p>
                </div>

                {/* Description Text */}
                <div className="mt-10 md:mt-0 w-full md:w-2/3 text-sm md:text-base leading-relaxed tracking-wide">
                <p className="mb-4 text-lg p-2">
                    This site complements an ongoing project on medieval Iberian sound, which will eventually have a book 
                    focusing on different sonic operations and possibilities across the Spanish literary canon. A graduate 
                    seminar at Cornell University was the first venue in which I experimented with this approach, and several 
                    students participated in the initial research stage for this website; undergraduate students also helped 
                    with research and website design with the support of a New Frontiers Grant.
                </p>
                <p className="mb-4 text-lg p-2">
                    I have presented and published work related to this project, which I have included in the bibliography, 
                    to serve as guide for anyone interested in exploring the topic.
                </p>
                <p className="mb-4 text-lg p-2">
                    If you have any questions or suggestions, please contact me.
                </p>
                </div>

            </div>
        </section>

        {/* Footer */}
        <footer className="bg-[#BAA393] text-[#30251d] px-10 py-8">
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
