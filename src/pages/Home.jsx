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
    setFiltered(cat === "All" ? images : images.filter((img) => img.category === cat));
  }

  return (
    <div style={{ flex: 1, overflowY: "auto", padding: "20px 16px", position: "relative", background: "#F0F6FF" }}>

      {/* Animated orbs */}
      <div style={{ position: "fixed", inset: 0, overflow: "hidden", pointerEvents: "none", zIndex: 0 }}>
        {[
          { w: 220, h: 220, top: "-40px", left: "25%", color: "#0284C7" },
          { w: 180, h: 180, top: "40%", right: "10%", color: "#06B6D4" },
          { w: 260, h: 260, bottom: "-60px", left: "15%", color: "#0a2250" },
        ].map((orb, i) => (
          <div key={i} style={{
            position: "absolute",
            width: orb.w,
            height: orb.h,
            borderRadius: "50%",
            filter: "blur(60px)",
            opacity: 0.18,
            background: `radial-gradient(circle, ${orb.color}, transparent)`,
            top: orb.top,
            left: orb.left,
            right: orb.right,
            bottom: orb.bottom
          }} />
        ))}
      </div>

      {/* Feed header */}
      <div style={{ position: "relative", zIndex: 1, display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: "16px" }}>
        <h2 style={{ fontSize: "16px", fontWeight: 500, color: "#0c1a3d" }}>
          AI Generated Feed
        </h2>
        <button style={{
          padding: "7px 14px",
          borderRadius: "8px",
          border: "1px solid rgba(6,182,212,0.4)",
          background: "rgba(6,182,212,0.06)",
          color: "#0284C7",
          fontSize: "12px",
          fontWeight: 500,
          cursor: "pointer"
        }}>
          + Share Prompt
        </button>
      </div>

      {/* Category filter */}
      <div style={{ position: "relative", zIndex: 1 }}>
        <CategoryFilter selected={category} onSelect={handleCategorySelect} />
      </div>

      <p style={{ fontSize: "12px", color: "#4A6080", marginBottom: "12px", position: "relative", zIndex: 1 }}>
        Showing {filtered.length} images {category !== "All" && `in "${category}"`}
      </p>

      {/* Loading */}
      {loading && (
        <div style={{ display: "flex", justifyContent: "center", padding: "40px", position: "relative", zIndex: 1 }}>
          <div style={{
            width: "32px",
            height: "32px",
            borderRadius: "50%",
            border: "3px solid rgba(6,182,212,0.2)",
            borderTop: "3px solid #06B6D4",
            animation: "spin 1s linear infinite"
          }} />
          <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
        </div>
      )}

      {/* Image cards */}
      {!loading && (
        <div style={{ position: "relative", zIndex: 1 }}>
          {filtered.map((image) => (
            <ImageCard key={image.id} image={image} />
          ))}
        </div>
      )}
    </div>
  );
}