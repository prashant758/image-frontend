import { Link } from "react-router-dom";
import { useState } from "react";

export default function ImageCard({ image }) {
  const [liked, setLiked] = useState(false);
  const [likes, setLikes] = useState(0);

  function handleLike() {
    setLiked(!liked);
    setLikes(liked ? likes - 1 : likes + 1);
  }

  return (
    <div className="bg-white rounded-2xl shadow-md overflow-hidden hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
      <Link to={`/image/${image.id}`}>
        <div className="overflow-hidden h-52">
          <img
            src={image.s3_url}
            alt={image.prompt}
            className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
          />
        </div>
      </Link>
      <div className="p-4">
        <span className="bg-purple-100 text-purple-700 text-xs font-semibold px-3 py-1 rounded-full">
          {image.category}
        </span>
        <p className="text-gray-600 text-sm mt-2 leading-relaxed line-clamp-2">
          {image.prompt}
        </p>
        <div className="flex items-center justify-between mt-3">
          <button
            onClick={handleLike}
            className={`flex items-center gap-1 text-sm font-medium transition-colors ${
              liked ? "text-red-500" : "text-gray-400 hover:text-red-400"
            }`}
          >
            {liked ? "❤️" : "🤍"} {likes}
          </button>
          <Link to={`/image/${image.id}`} className="text-purple-600 text-sm font-medium hover:underline">
            View →
          </Link>
        </div>
      </div>
    </div>
  );
}