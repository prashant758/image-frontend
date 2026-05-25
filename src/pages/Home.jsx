import { useEffect, useState } from "react";
import ImageCard from "../components/ImageCard";
import CategoryFilter from "../components/CategoryFilter";

export default function Home() {
  const [images, setImages] = useState([]);
  const [filtered, setFiltered] = useState([]);
  const [category, setCategory] = useState("All");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("/results.json")
      .then((res) => res.json())
      .then((data) => {
        setImages(data);
        setFiltered(data);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);

  function handleCategorySelect(cat) {
    setCategory(cat);
    if (cat === "All") {
      setFiltered(images);
    } else {
      setFiltered(images.filter((img) => img.category === cat));
    }
  }

  return (
    <div className="max-w-6xl mx-auto px-4 py-8">
      <div className="text-center mb-10 bg-gradient-to-r from-purple-600 to-indigo-600 rounded-3xl py-16 px-6 text-white">
        <h1 className="text-4xl font-bold mb-3">AI Generated Image Gallery</h1>
        <p className="text-purple-100 text-lg">
          200 unique images generated from AI prompts across 20 categories
        </p>
        <div className="flex justify-center gap-6 mt-6 text-sm">
          <div className="bg-white bg-opacity-20 rounded-xl px-5 py-3">
            <p className="text-2xl font-bold">{images.length}</p>
            <p className="text-purple-100">Total Images</p>
          </div>
          <div className="bg-white bg-opacity-20 rounded-xl px-5 py-3">
            <p className="text-2xl font-bold">20</p>
            <p className="text-purple-100">Categories</p>
          </div>
          <div className="bg-white bg-opacity-20 rounded-xl px-5 py-3">
            <p className="text-2xl font-bold">AI</p>
            <p className="text-purple-100">Generated</p>
          </div>
        </div>
      </div>

      <CategoryFilter selected={category} onSelect={handleCategorySelect} />

      <p className="text-gray-500 text-sm mb-4">
        Showing {filtered.length} images
        {category !== "All" && ` in "${category}"`}
      </p>

      {loading && (
        <div className="flex justify-center items-center h-64">
          <div className="animate-spin rounded-full h-12 w-12 border-4 border-purple-600 border-t-transparent"></div>
        </div>
      )}

      {!loading && filtered.length > 0 && (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {filtered.map((image) => (
            <ImageCard key={image.id} image={image} />
          ))}
        </div>
      )}

      {!loading && filtered.length === 0 && (
        <div className="text-center text-gray-400 py-20">
          <p className="text-5xl mb-4">🖼️</p>
          <p className="text-lg">No images found for this category.</p>
        </div>
      )}
    </div>
  );
}