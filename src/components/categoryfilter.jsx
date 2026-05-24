const categories = [
  "All",
  "Nature & Landscapes",
  "Fantasy & Magic",
  "Science Fiction & Space",
  "Architecture & Cities",
  "Wildlife & Animals",
  "Food & Culinary",
  "People & Portraits",
  "Abstract & Digital Art",
  "Seasons & Weather",
  "Cultural & Historical",
  "Technology & Innovation",
  "Interior Design & Spaces",
  "Mythology & Legends",
  "Sports & Action",
  "Emotion & Mood",
  "Macro & Micro",
  "Steampunk & Alternative History",
  "Dreams & Surrealism",
  "Vehicles & Transport",
  "Spiritual & Cosmic",
];

export default function CategoryFilter({ selected, onSelect }) {
  return (
    <div className="flex flex-wrap gap-2 my-6">
      {categories.map((cat) => (
        <button
          key={cat}
          onClick={() => onSelect(cat)}
          className={`px-4 py-2 rounded-full text-sm font-medium border transition-all ${
            selected === cat
              ? "bg-purple-600 text-white border-purple-600 shadow-md"
              : "bg-white text-gray-600 border-gray-300 hover:border-purple-400 hover:text-purple-600"
          }`}
        >
          {cat}
        </button>
      ))}
    </div>
  );
}