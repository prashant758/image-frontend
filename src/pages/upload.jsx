import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { uploadImage, createPrompt } from "../api/images";

export default function Upload() {
  const [file, setFile] = useState(null);
  const [tags, setTags] = useState("");
  const [preview, setPreview] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const token = localStorage.getItem("token");

  function handleFile(e) {
    const f = e.target.files[0];
    setFile(f);
    setPreview(URL.createObjectURL(f));
  }

  async function handleUpload() {
    if (!token) { navigate("/login"); return; }
    if (!file) { setError("Please select an image"); return; }
    setLoading(true);
    setError("");
    try {
      const promptRes = await createPrompt({
        title: tags || "My Image",
        body: tags,
        tags: tags.split(" ").filter(Boolean)
      });
      const promptId = promptRes.data.id;
      const formData = new FormData();
      formData.append("file", file);
      await uploadImage(formData, promptId);
      navigate("/");
    } catch (err) {
      setError("Upload failed. Try again.");
    }
    setLoading(false);
  }

  return (
    <div style={{ flex: 1, padding: "40px 24px", background: "#F0F6FF", overflowY: "auto" }}>
      <div style={{
        maxWidth: "500px",
        margin: "0 auto",
        background: "rgba(255,255,255,0.8)",
        borderRadius: "16px",
        padding: "32px",
        border: "1px solid rgba(6,182,212,0.2)"
      }}>
        <h1 style={{ fontSize: "20px", fontWeight: 600, color: "#0c1a3d", marginBottom: "24px" }}>
          Upload Image
        </h1>

        {error && (
          <div style={{ background: "rgba(220,50,50,0.1)", color: "#dc3232", padding: "12px", borderRadius: "8px", marginBottom: "16px", fontSize: "13px" }}>
            {error}
          </div>
        )}

        {/* File input */}
        <div style={{ marginBottom: "20px" }}>
          <label style={{ display: "block", fontSize: "13px", fontWeight: 500, color: "#0c1a3d", marginBottom: "8px" }}>
            Select Image
          </label>
          <input
            type="file"
            accept="image/*"
            onChange={handleFile}
            style={{ width: "100%", padding: "10px", border: "1px solid rgba(6,182,212,0.3)", borderRadius: "8px", fontSize: "13px" }}
          />
        </div>

        {/* Preview */}
        {preview && (
          <div style={{ marginBottom: "20px" }}>
            <img src={preview} alt="preview" style={{ width: "100%", borderRadius: "8px", maxHeight: "300px", objectFit: "cover" }} />
          </div>
        )}

        {/* Tags */}
        <div style={{ marginBottom: "24px" }}>
          <label style={{ display: "block", fontSize: "13px", fontWeight: 500, color: "#0c1a3d", marginBottom: "8px" }}>
            Tags (space separated)
          </label>
          <input
            type="text"
            value={tags}
            onChange={(e) => setTags(e.target.value)}
            placeholder="#nature #sunset #beautiful"
            style={{ width: "100%", padding: "12px", border: "1px solid rgba(6,182,212,0.3)", borderRadius: "8px", fontSize: "13px", outline: "none" }}
          />
        </div>

        <button
          onClick={handleUpload}
          disabled={loading}
          style={{
            width: "100%",
            padding: "14px",
            background: "linear-gradient(90deg,#06B6D4,#0284C7)",
            color: "#fff",
            border: "none",
            borderRadius: "10px",
            fontSize: "14px",
            fontWeight: 600,
            cursor: "pointer",
            opacity: loading ? 0.6 : 1
          }}
        >
          {loading ? "Uploading..." : "Upload Image"}
        </button>
      </div>
    </div>
  );
}