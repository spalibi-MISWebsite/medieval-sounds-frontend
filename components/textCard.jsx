import Link from 'next/link'

export default function TextCard({ allTexts = [] }) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-12">
        {allTexts.map((text) => (
            // Link each text card to unique page
            <Link
                key={text._id}
                href={`/texts/${text._id}`}
                passHref
            >
                <div className="relative w-[250px] h-[300px] overflow-hidden rounded-xl shadow-lg group cursor-pointer block">
                    {text.imageUrl && (
                    <img
                        src={text.imageUrl}
                        alt={text.title}
                        className="w-full h-full object-cover transition duration-300 group-hover:opacity-60"
                    />
                    )}
                    
                    <div className="absolute bottom-0 w-full bg-white bg-opacity-90 text-black text-center py-2 font-serif text-lg">
                    {text.title}
                    </div>
                </div>
            </Link>
        ))}
    </div>
  );
}
