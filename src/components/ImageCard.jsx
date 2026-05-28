import { Link } from "react-router-dom";
import { useState } from "react";

const modelColors = {
  "Nature & Landscapes": { bg: "rgba(6,182,212,0.12)", color: "#0284C7", border: "rgba(6,182,212,0.25)" },
  "Fantasy & Magic": { bg: "rgba(212,160,23,0.12)", color: "#B8860B", border: "rgba(212,160,23,0.25)" },
  "Science Fiction & Space": { bg: "rgba(120,80,200,0.1)", color: "#7048c8", border: "rgba(120,80,200,0.2)" },
  "default": { bg: "rgba(6,182,212,0.12)", color: "#0284C7", border: "rgba(6,182,212,0.25)" }
};

export default function ImageCard({ image }) {
  const [liked, setLiked] = useState(false);
  const [likes, setLikes] = useState(0);

  const badge = modelColors[image.category] || modelColors["default"];

  return (
    <div style={{
      background: "rgba(255,255,255,0.72)",
      backdropFilter: "blur(12px)",
      border: "1px solid rgba(6,182,212,0.18)",
      borderRadius: "12px",
      marginBottom: "12px",
      overflow: "hidden",
      transition: "border-color 0.2s, transform 0.2s",
    }}
      onMouseEnter={e => {
        e.currentTarget.style.borderColor = "rgba(212,160,23,0.4)";
        e.currentTarget.style.transform = "translateY(-1px)";
      }}
      onMouseLeave={e => {
        e.currentTarget.style.borderColor = "rgba(6,182,212,0.18)";
        e.currentTarget.style.transform = "translateY(0)";
      }}
    >
      {/* Crown gradient bar */}
      <div style={{ height: "2px", background: "linear-gradient(90deg,#06B6D4,#0284C7,#B8860B,#F5D76E,#D4A017)" }} />

      <div style={{ padding: "14px 16px" }}>
        {/* Card header */}
        <div style={{ display: "flex", alignItems: "center", gap: "10px", marginBottom: "12px" }}>
          <div style={{
            width: "36px",
            height: "36px",
            borderRadius: "50%",
            background: "linear-gradient(135deg,#06B6D4,#0284C7)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            fontSize: "12px",
            fontWeight: 600,
            color: "#fff",
            flexShrink: 0
          }}>
            AI
          </div>
          <div style={{ flex: 1 }}>
            <p style={{ fontSize: "13px", fontWeight: 500, color: "#0c1a3d" }}>AI Generated</p>
            <p style={{ fontSize: "11px", color: "#4A6080" }}>Pollinations AI</p>
          </div>
          <span style={{
            padding: "3px 8px",
            borderRadius: "20px",
            fontSize: "10px",
            fontWeight: 500,
            background: badge.bg,
            color: badge.color,
            border: `1px solid ${badge.border}`
          }}>
            {image.category?.split(" ")[0]}
          </span>
        </div>

        {/* Image */}
        <Link to={`/image/${image.id}`}>
          <img
            src={image.s3_url}
            alt={image.prompt}
            style={{
              width: "100%",
              height: "180px",
              objectFit: "cover",
              borderRadius: "8px",
              marginBottom: "10px",
              cursor: "pointer"
            }}
          />
        </Link>

        {/* Prompt text */}
        <div style={{
          background: "rgba(12,26,61,0.04)",
          border: "1px solid rgba(12,26,61,0.08)",
          borderLeft: "3px solid #06B6D4",
          borderRadius: "6px",
          padding: "10px 12px",
          fontFamily: "'JetBrains Mono', monospace",
          fontSize: "11.5px",
          color: "#0c1a3d",
          lineHeight: 1.6,
          marginBottom: "10px"
        }}>
          {image.prompt?.slice(0, 100)}...
        </div>

        {/* Hashtags */}
        <div style={{ display: "flex", flexWrap: "wrap", gap: "5px", marginBottom: "12px" }}>
          {image.category?.split(" & ").map((tag, i) => (
            <span key={i} style={{
              padding: "3px 8px",
              background: "rgba(6,182,212,0.07)",
              borderRadius: "20px",
              fontSize: "11px",
              color: "#0284C7",
              cursor: "pointer"
            }}>
              #{tag.toLowerCase().replace(/ /g, "")}
            </span>
          ))}
        </div>

        {/* Actions */}
        <div style={{
          display: "flex",
          alignItems: "center",
          gap: "4px",
          paddingTop: "10px",
          borderTop: "1px solid rgba(12,26,61,0.06)"
        }}>
          <button
            onClick={() => { setLiked(!liked); setLikes(liked ? likes - 1 : likes + 1); }}
            style={{
              display: "flex",
              alignItems: "center",
              gap: "5px",
              padding: "5px 10px",
              borderRadius: "6px",
              border: "none",
              background: "transparent",
              cursor: "pointer",
              fontSize: "11px",
              color: liked ? "#e24b4a" : "#4A6080",
              fontFamily: "'Inter', sans-serif"
            }}
          >
            {liked ? "❤️" : "🤍"} {likes}
          </button>

          <button style={{
            display: "flex",
            alignItems: "center",
            gap: "5px",
            padding: "5px 10px",
            borderRadius: "6px",
            border: "none",
            background: "transparent",
            cursor: "pointer",
            fontSize: "11px",
            color: "#4A6080",
            fontFamily: "'Inter', sans-serif"
          }}>
            💬 Comment
          </button>

          <button style={{
            display: "flex",
            alignItems: "center",
            gap: "5px",
            padding: "5px 10px",
            borderRadius: "6px",
            border: "none",
            background: "transparent",
            cursor: "pointer",
            fontSize: "11px",
            color: "#4A6080",
            fontFamily: "'Inter', sans-serif"
          }}>
            🔗 Share
          </button>

          <div style={{ flex: 1 }} />

          <Link to={`/image/${image.id}`} style={{
            padding: "5px 10px",
            borderRadius: "6px",
            fontSize: "11px",
            color: "#0284C7",
            textDecoration: "none"
          }}>
            View →
          </Link>
        </div>
      </div>
    </div>
  );
}