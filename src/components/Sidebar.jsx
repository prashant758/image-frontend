import { Link, useNavigate } from "react-router-dom";

export default function Sidebar() {
  const navigate = useNavigate();
  const token = localStorage.getItem("token");
  const username = localStorage.getItem("username") || "User";

  function handleLogout() {
    localStorage.removeItem("token");
    localStorage.removeItem("username");
    navigate("/login");
  }

  return (
    <div style={{
      width: "200px",
      flexShrink: 0,
      position: "relative",
      zIndex: 10,
      display: "flex",
      flexDirection: "column",
      minHeight: "100vh"
    }}>
      {/* Glass background */}
      <div style={{
        position: "absolute",
        inset: 0,
        background: "linear-gradient(180deg,rgba(10,24,55,0.96) 0%,rgba(8,28,72,0.95) 100%)",
        backdropFilter: "blur(4px)",
        borderRight: "1px solid rgba(245,215,110,0.13)",
        zIndex: 0
      }} />

      <div style={{ position: "relative", zIndex: 1, display: "flex", flexDirection: "column", height: "100%" }}>

        {/* Logo */}
        <div style={{ padding: "20px 18px 24px", borderBottom: "1px solid rgba(212,160,23,0.18)" }}>
          <span style={{
            fontSize: "15px",
            fontWeight: 700,
            background: "linear-gradient(90deg,#F5D76E 0%,#D4A017 40%,#F5D76E 70%,#B8860B 100%)",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent"
          }}>
            ✦ Promptgram
          </span>
        </div>

        {/* Nav items */}
        <nav style={{ flex: 1, padding: "16px 10px" }}>
          {[
            { icon: "🏠", label: "Home", path: "/" },
            { icon: "🔍", label: "Explore", path: "/gallery" },
            { icon: "🖼️", label: "Gallery", path: "/gallery" },
            { icon: "⬆️", label: "Upload", path: "/upload" },
            { icon: "📌", label: "Saved", path: "/" },
            { icon: "👤", label: "Profile", path: "/profile" },
          ].map((item) => (
            <Link
              key={item.label}
              to={item.path}
              style={{
                display: "flex",
                alignItems: "center",
                gap: "10px",
                padding: "9px 10px",
                borderRadius: "8px",
                color: "rgba(255,255,255,0.46)",
                fontSize: "13px",
                textDecoration: "none",
                marginBottom: "2px",
                transition: "all 0.2s"
              }}
              onMouseEnter={e => {
                e.currentTarget.style.color = "rgba(255,255,255,0.82)";
                e.currentTarget.style.background = "rgba(255,255,255,0.05)";
              }}
              onMouseLeave={e => {
                e.currentTarget.style.color = "rgba(255,255,255,0.46)";
                e.currentTarget.style.background = "transparent";
              }}
            >
              <span>{item.icon}</span>
              <span>{item.label}</span>
            </Link>
          ))}
        </nav>

        {/* User info at bottom */}
        <div style={{
          display: "flex",
          alignItems: "center",
          gap: "10px",
          padding: "14px 16px",
          borderTop: "1px solid rgba(212,160,23,0.18)",
          marginTop: "auto"
        }}>
          <div style={{
            width: "34px",
            height: "34px",
            borderRadius: "50%",
            background: "linear-gradient(135deg,#0a2250,#B8860B)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            fontSize: "12px",
            fontWeight: 600,
            color: "#F5D76E",
            flexShrink: 0
          }}>
            {username.slice(0, 2).toUpperCase()}
          </div>
          <div style={{ flex: 1 }}>
            <p style={{ fontSize: "12px", fontWeight: 500, color: "rgba(255,255,255,0.85)" }}>
              {token ? username : "Guest"}
            </p>
            <p style={{ fontSize: "11px", color: "rgba(255,255,255,0.32)" }}>
              {token ? "Online" : "Not logged in"}
            </p>
          </div>
          {token ? (
            <button
              onClick={handleLogout}
              style={{
                background: "none",
                border: "1px solid rgba(255,100,100,0.3)",
                color: "rgba(255,100,100,0.7)",
                borderRadius: "6px",
                padding: "3px 8px",
                fontSize: "10px",
                cursor: "pointer"
              }}
            >
              Out
            </button>
          ) : (
            <Link
              to="/login"
              style={{
                background: "none",
                border: "1px solid rgba(6,182,212,0.4)",
                color: "#06B6D4",
                borderRadius: "6px",
                padding: "3px 8px",
                fontSize: "10px",
                cursor: "pointer",
                textDecoration: "none"
              }}
            >
              Login
            </Link>
          )}
        </div>
      </div>
    </div>
  );
}