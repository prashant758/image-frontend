import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const PROMPT_API = "https://promptgram-95ny.onrender.com";

export default function Upload() {
  const [file, setFile] = useState(null);
  const [tags, setTags] = useState("");
  const [title, setTitle] = useState("");
  const [preview, setPreview] = useState(null);
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const token = localStorage.getItem("token");

  function handleFile(e) {
    const f = e.target.files[0];
    if (!f) return;
    if (f.size > 10 * 1024 * 1024) {
      setError("File too large. Max 10MB.");
      return;
    }
    setFile(f);
    setPreview(URL.createObjectURL(f));
    setError("");
  }

  async function handleUpload() {
    if (!token) {
      navigate("/login");
      return;
    }
    if (!file) {
      setError("Please select an image first.");
      return;
    }
    if (!title.trim()) {
      setError("Please enter a title.");
      return;
    }

    setLoading(true);
    setError("");

    try {
      // Step 1 — Create a prompt first
      const tagList = tags
        .split(" ")
        .filter(Boolean)
        .map((t) => t.replace("#", "").trim());

      const promptRes = await axios.post(
        `${PROMPT_API}/prompts/`,
        {
          title: title,
          body: title,
          tags: tagList,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );

      const promptId = promptRes.data.id;

      // Step 2 — Upload image to that prompt
      const formData = new FormData();
      formData.append("file", file);

      await axios.post(
        `${PROMPT_API}/images/upload?prompt_id=${promptId}`,
        formData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "multipart/form-data",
          },
        }
      );

      setSuccess(true);
      setLoading(false);

      setTimeout(() => navigate("/"), 2000);

    } catch (err) {
      const msg = err.response?.data?.detail || "Upload failed. Please try again.";
      setError(typeof msg === "string" ? msg : JSON.stringify(msg));
      setLoading(false);
    }
  }

  return (
    <div style={{ flex: 1, padding: "30px 24px", background: "#F0F6FF", overflowY: "auto" }}>
      <div style={{
        maxWidth: "520px",
        margin: "0 auto",
        background: "rgba(255,255,255,0.85)",
        borderRadius: "16px",
        padding: "32px",
        border: "1px solid rgba(6,182,212,0.2)",
        boxShadow: "0 4px 24px rgba(6,182,212,0.08)"
      }}>

        {/* Header */}
        <div style={{ marginBottom: "24px" }}>
          <h1 style={{ fontSize: "20px", fontWeight: 700, color: "#0c1a3d", marginBottom: "4px" }}>
            Upload Image
          </h1>
          <p style={{ fontSize: "13px", color: "#4A6080" }}>
            Share your image with the community
          </p>
        </div>

        {/* Not logged in warning */}
        {!token && (
          <div style={{
            background: "rgba(212,160,23,0.1)",
            border: "1px solid rgba(212,160,23,0.3)",
            borderRadius: "8px",
            padding: "12px 16px",
            marginBottom: "16px",
            fontSize: "13px",
            color: "#B8860B"
          }}>
            You must be logged in to upload.{" "}
            <span
              onClick={() => navigate("/login")}
              style={{ fontWeight: 600, cursor: "pointer", textDecoration: "underline" }}
            >
              Login here
            </span>
          </div>
        )}

        {/* Success message */}
        {success && (
          <div style={{
            background: "rgba(6,182,212,0.1)",
            border: "1px solid rgba(6,182,212,0.3)",
            borderRadius: "8px",
            padding: "12px 16px",
            marginBottom: "16px",
            fontSize: "13px",
            color: "#0284C7",
            fontWeight: 500
          }}>
            ✅ Image uploaded successfully! Redirecting...
          </div>
        )}

        {/* Error message */}
        {error && (
          <div style={{
            background: "rgba(220,50,50,0.08)",
            border: "1px solid rgba(220,50,50,0.2)",
            borderRadius: "8px",
            padding: "12px 16px",
            marginBottom: "16px",
            fontSize: "13px",
            color: "#dc3232"
          }}>
            {error}
          </div>
        )}

        {/* Title */}
        <div style={{ marginBottom: "16px" }}>
          <label style={{ display: "block", fontSize: "13px", fontWeight: 500, color: "#0c1a3d", marginBottom: "6px" }}>
            Title *
          </label>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Give your image a title"
            style={{
              width: "100%",
              padding: "11px 14px",
              border: "1px solid rgba(6,182,212,0.3)",
              borderRadius: "8px",
              fontSize: "13px",
              outline: "none",
              color: "#0c1a3d",
              background: "#fff"
            }}
          />
        </div>

        {/* File upload */}
        <div style={{ marginBottom: "16px" }}>
          <label style={{ display: "block", fontSize: "13px", fontWeight: 500, color: "#0c1a3d", marginBottom: "6px" }}>
            Select Image * (max 10MB)
          </label>
          <div style={{
            border: "2px dashed rgba(6,182,212,0.4)",
            borderRadius: "10px",
            padding: "20px",
            textAlign: "center",
            cursor: "pointer",
            background: "rgba(6,182,212,0.02)"
          }}
            onClick={() => document.getElementById("fileInput").click()}
          >
            {preview ? (
              <img
                src={preview}
                alt="preview"
                style={{ maxWidth: "100%", maxHeight: "220px", borderRadius: "8px", objectFit: "cover" }}
              />
            ) : (
              <div>
                <p style={{ fontSize: "32px", marginBottom: "8px" }}>🖼️</p>
                <p style={{ fontSize: "13px", color: "#4A6080" }}>Click to select image</p>
                <p style={{ fontSize: "11px", color: "#94A3B8", marginTop: "4px" }}>PNG, JPG, GIF up to 10MB</p>
              </div>
            )}
            <input
              id="fileInput"
              type="file"
              accept="image/*"
              onChange={handleFile}
              style={{ display: "none" }}
            />
          </div>
          {file && (
            <p style={{ fontSize: "11px", color: "#4A6080", marginTop: "6px" }}>
              Selected: {file.name}
            </p>
          )}
        </div>

        {/* Tags */}
        <div style={{ marginBottom: "24px" }}>
          <label style={{ display: "block", fontSize: "13px", fontWeight: 500, color: "#0c1a3d", marginBottom: "6px" }}>
            Tags (optional — space separated)
          </label>
          <input
            type="text"
            value={tags}
            onChange={(e) => setTags(e.target.value)}
            placeholder="nature sunset beautiful sky"
            style={{
              width: "100%",
              padding: "11px 14px",
              border: "1px solid rgba(6,182,212,0.3)",
              borderRadius: "8px",
              fontSize: "13px",
              outline: "none",
              color: "#0c1a3d",
              background: "#fff"
            }}
          />
          {tags && (
            <div style={{ display: "flex", flexWrap: "wrap", gap: "5px", marginTop: "8px" }}>
              {tags.split(" ").filter(Boolean).map((tag, i) => (
                <span key={i} style={{
                  padding: "3px 9px",
                  background: "rgba(6,182,212,0.08)",
                  borderRadius: "20px",
                  fontSize: "11px",
                  color: "#0284C7"
                }}>
                  #{tag.replace("#", "")}
                </span>
              ))}
            </div>
          )}
        </div>

        {/* Upload button */}
        <button
          onClick={handleUpload}
          disabled={loading || success || !token}
          style={{
            width: "100%",
            padding: "14px",
            background: loading
              ? "rgba(6,182,212,0.5)"
              : "linear-gradient(90deg,#06B6D4,#0284C7)",
            color: "#fff",
            border: "none",
            borderRadius: "10px",
            fontSize: "14px",
            fontWeight: 600,
            cursor: loading ? "not-allowed" : "pointer",
            transition: "all 0.2s"
          }}
        >
          {loading ? "Uploading... Please wait" : "⬆️ Upload Image"}
        </button>

        {/* Cancel */}
        <button
          onClick={() => navigate("/")}
          style={{
            width: "100%",
            padding: "12px",
            background: "transparent",
            color: "#4A6080",
            border: "none",
            borderRadius: "10px",
            fontSize: "13px",
            cursor: "pointer",
            marginTop: "8px"
          }}
        >
          Cancel
        </button>

      </div>
    </div>
  );
}