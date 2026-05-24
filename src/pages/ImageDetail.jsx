import { useParams, Link } from "react-router-dom";
import { useEffect, useState } from "react";

export default function ImageDetail() {
  const { id } = useParams();
  const [image, setImage] = useState(null);

  useEffect(() => {
    fetch("/results.json")
      .then((res) => res.json())
      .then((data) => {
        const found = data.find((img) => img.id === parseInt(id));
        setImage(found);
      });
  }, [id]);

  if (!image) {
    return (
      <div className="flex justify-center items-center h-64">
        <p className="text-purple-600 text-lg">Loading...</p>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto px-4 py-10">
      <Link to="/" className="text-purple-600 text-sm mb-6 inline-block">
        Back to gallery
      </Link>
      <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
        <img src={image.s3_url} alt={image.prompt} className="w-full max-h-96 object-cover" />
        <div className="p-6">
          <span className="bg-purple-100 text-purple-700 text-xs font-semibold px-3 py-1 rounded-full">
            {image.category}
          </span>
          <p className="text-gray-700 text-lg mt-4 mb-2">{image.prompt}</p>
          <p className="text-gray-400 text-sm mb-6">Image number {image.id}</p>
          <a href={image.s3_url} target="_blank" rel="noreferrer" className="bg-purple-600 text-white px-6 py-3 rounded-xl font-medium hover:bg-purple-700 inline-block">
            Open Full Image
          </a>
        </div>
      </div>
    </div>
  );
}
