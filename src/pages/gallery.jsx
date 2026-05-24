import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import ImageCard from "../components/ImageCard";

export default function Gallery() {
  const [images, setImages] = useState([]);
  const [search, setSearch] = useState("");
  const [searchParams] = useSearchParams();

  useEffect(() => {
    const q = searchParams.get("search") || "";
    setSearch(q);
    fetch("/results.json")
      .then((res) => res.json())
      .then(setImages);
  }, [searchParams]);

  const filtered = images.filter(
    (img) =>
      img.prompt.toLowerCase().includes(search.toLowerCase()) ||
      img.category.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="max-w-6xl mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold text-gray-800 mb-2">Full Gallery</h1>
      <p className="text-gray-500 mb-6">Browse and search all 200 AI generated images</p>

      <input
        type="text"
        placeholder="Search by prompt or category..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        className="w-full border border-gray-300 rounded-xl px-5 py-3 text-sm mb-2 focus:outline-none focus:ring-2 focus:ring-purple-400"
      />

      <p className="text-gray-500 text-sm mb-6">{filtered.length} images found</p>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {filtered.map((image) => (
          <ImageCard key={image.id} image={image} />
        ))}
      </div>

      {filtered.length === 0 && (
        <div className="text-center text-gray-400 py-20">
          <p className="text-5xl mb-4">🔍</p>
          <p className="text-lg">No results for "{search}"</p>
        </div>
      )}
    </div>
  );
}