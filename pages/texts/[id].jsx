import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'
import { client } from '../../lib/sanity'
import SoundCard from '../../components/SoundCard'

export default function TextDetail() {
    const router = useRouter()
    const { id } = router.query

    const [text, setText] = useState(null)
    const [sounds, setSounds] = useState([])
    const [menuOpen, setMenuOpen] = useState(false)
    const [searchTerm, setSearchTerm] = useState("")
    const [categoryFilters, setCategoryFilters] = useState([])

    useEffect(() => {
        if (!id) return

        // Fetch text metadata
        client.fetch(
        `*[_type == "refText" && _id == $id][0]{
            title,
            author,
            year,
            citation,
            image{asset->{url}}
        }`,
        { id }
        ).then(setText)

        // Build query for related sounds
        let query = `*[_type == "sound" && relatedText._ref == $id`
        const filters = []
        const params = { id }

        if (searchTerm) {
        filters.push(`title match $search`)
        params.search = `*${searchTerm}*`
        }

        if (categoryFilters.length > 0) {
        filters.push(`category in $categories`)
        params.categories = categoryFilters
        }

        if (filters.length > 0) {
        query += ` && ${filters.join(' && ')}`
        }

        query += `]{
        title,
        "imageUrl": image.asset->url,
        "audioUrl": file.asset->url,
        originalText,
        translatedText,
        category
        }`

        client.fetch(query, params).then(setSounds)
    }, [id, searchTerm, categoryFilters])

    if (!text) return <div>Loading...</div>

  return (
    <>
        {/* Header */}
        <header className="bg-[#1A0A02] text-[#E3D9D1] h-20 sticky top-0 z-50">
            <div className="flex items-center justify-between px-4 sm:px-6 lg:px-12 py-6">
            <a href="/" className="text-xl font-bold font-serif">Medieval Iberian Sounds</a>

            <button
                className="sm:hidden focus:outline-none"
                onClick={() => setMenuOpen(!menuOpen)}
                aria-label="Toggle navigation"
            >
                <svg className="w-6 h-6 text-[#E3D9D1]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                {menuOpen
                    ? <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                    : <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />}
                </svg>
            </button>

            <ul className="hidden sm:flex space-x-6 text-sm tracking-widest uppercase font-mono">
                <li><a href="/" className="hover:underline">Home</a></li>
                <li><a href="/about" className="hover:underline">About</a></li>
                <li><a href="/sounds" className="hover:underline">Sounds</a></li>
                <li><a href="/texts" className="hover:underline">Texts</a></li>
                <li><a href="/sources" className="hover:underline">Sources</a></li>
            </ul>
            </div>

            {menuOpen && (
            <ul className="sm:hidden flex flex-col items-center space-y-4 pb-4 bg-[#1A0A02] text-sm tracking-widest uppercase font-mono">
                <li><a href="/" className="hover:underline">Home</a></li>
                <li><a href="/about" className="hover:underline">About</a></li>
                <li><a href="/sounds" className="hover:underline">Sounds</a></li>
                <li><a href="/texts" className="hover:underline">Texts</a></li>
                <li><a href="/sources" className="hover:underline">Sources</a></li>
            </ul>
            )}
        </header>

        {/* Hero with background image */}
        <div className="relative -mt-40 z-0">
            {text.image?.asset?.url && (
            <img
                src={text.image.asset.url}
                alt={text.title}
                className="w-full h-[500px] sm:h-[600px] md:h-[700px] object-cover opacity-35"
            />
            )}

            <div className="absolute inset-0 flex flex-col items-center justify-center text-center">
            <h1 className="text-4xl font-serif mb-4 text-[#E3D9D1]">{text.title}</h1>
            <p className="mb-2 text-[#E3D9D1]"><strong>Author/Source:</strong> {text.author}</p>
            <p className="mb-2 text-[#E3D9D1]"><strong>Year:</strong> {text.year}</p>
            </div>
        </div>

        <div className="p-6 bg-[#E3D9D1] min-h-screen">
            
            <h2 className="py-8 text-[#1A0A02] text-2xl text-center"> Sounds Referenced in this Text</h2>

            {/* Search & Filter Section */}
            <div className="px-6 py-8">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                <input
                type="text"
                placeholder="Search by title..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="p-2 border border-[#1A0A02] text-[#1A0A02] rounded w-full sm:w-1/2"
                />
                <div className="flex flex-wrap gap-2 justify-center sm:justify-start">
                {["animal", "church", "voice", "nature", "instrument", "other"].map((cat) => (
                    <button
                    key={cat}
                    onClick={() =>
                        setCategoryFilters((prev) =>
                        prev.includes(cat) ? prev.filter((c) => c !== cat) : [...prev, cat]
                        )
                    }
                    className={`px-4 py-2 rounded-full text-sm font-mono tracking-wide border transition ${
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

            <div className="p-6 h-auto bg-[#E3D9D1] flex justify-center">
            <SoundCard allSounds={sounds} />
            </div>
        </div>

        {/* Footer */}
        <footer className="bg-[#1A0A02] text-[#E3D9D1] px-10 py-8">
            <div className="flex flex-col md:flex-row justify-between items-center md:items-start max-w-7xl mx-auto">
            <div className="text-center md:text-left mb-6 md:mb-0">
                <h2 className="text-xl md:text-3xl font-serif mb-1">Medieval Iberian Sound</h2>
                <p className="text-sm md:text-base font-light tracking-wide">A Digital Humanities Project</p>
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
  )
}
