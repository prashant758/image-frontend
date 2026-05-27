import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";

export default function Navbar() {
  const [search, setSearch] = useState("");
  const navigate = useNavigate();
  const token = localStorage.getItem("token");

  function handleSearch(e) {
    e.preventDefault();
    if (search.trim()) {
      navigate(`/gallery?search=${search}`);
    }
  }

  function handleLogout() {
    localStorage.removeItem("token");
    navigate("/login");
  }

  return (
    <nav className="bg-white shadow-md sticky top-0 z-50">
      <div className="max-w-6xl mx-auto px-4 py-3 flex items-center justify-between">
        <Link to="/" className="text-2xl font-bold text-purple-600">
          ImageAI
        </Link>
        <form onSubmit={handleSearch} className="flex">
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search images..."
            className="border border-gray-300 rounded-l-full px-4 py-2 w-64 text-sm focus:outline-none focus:ring-2 focus:ring-purple-400"
          />
          <button
            type="submit"
            className="bg-purple-600 text-white px-4 py-2 rounded-r-full text-sm hover:bg-purple-700"
          >
            Search
          </button>
        </form>
        <div className="flex items-center gap-4">
          <Link to="/" className="text-gray-600 hover:text-purple-600 text-sm font-medium">
            Home
          </Link>
          <Link to="/gallery" className="text-gray-600 hover:text-purple-600 text-sm font-medium">
            Gallery
          </Link>
          {token ? (
            <button
              onClick={handleLogout}
              className="bg-red-500 text-white px-4 py-2 rounded-full text-sm font-medium hover:bg-red-600"
            >
              Logout
            </button>
          ) : (
            <Link
              to="/login"
              className="bg-purple-600 text-white px-4 py-2 rounded-full text-sm font-medium hover:bg-purple-700"
            >
              Login
            </Link>
          )}
        </div>
      </div>
    </nav>
  );
}