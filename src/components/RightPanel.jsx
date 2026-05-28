export default function RightPanel() {
  const trending = [
    { tag: "#chainofthought", posts: "4.2k posts" },
    { tag: "#roleplay", posts: "3.8k posts" },
    { tag: "#writing", posts: "2.9k posts" },
    { tag: "#code", posts: "2.1k posts" },
    { tag: "#persona", posts: "1.7k posts" },
  ];

  const suggested = [
    { initials: "AA", name: "Amira Ahm.", prompts: "920 prompts", color: "linear-gradient(135deg,#06B6D4,#0a2250)" },
    { initials: "LN", name: "Luca Nero", prompts: "614 prompts", color: "linear-gradient(135deg,#D4A017,#B8860B)" },
    { initials: "SJ", name: "Sara Jeon", prompts: "488 prompts", color: "linear-gradient(135deg,#0284C7,#4A6080)" },
  ];

  return (
    <div style={{
      width: "220px",
      flexShrink: 0,
      background: "#fff",
      padding: "16px 14px",
      borderLeft: "1px solid rgba(6,182,212,0.1)",
      overflowY: "auto",
      position: "relative"
    }}>
      {/* Gold splash decorations */}
      {[
        { w: 110, h: 110, x: "10%", y: "5%", blur: 28, opacity: 0.22, color: "rgba(212,160,23,1)" },
        { w: 140, h: 140, x: "-15%", y: "38%", blur: 35, opacity: 0.18, color: "rgba(184,134,11,1)" },
        { w: 100, h: 100, x: "30%", y: "68%", blur: 30, opacity: 0.14, color: "rgba(200,144,10,1)" },
      ].map((s, i) => (
        <div key={i} style={{
          position: "absolute",
          width: s.w,
          height: s.h,
          left: s.x,
          top: s.y,
          borderRadius: "50%",
          filter: `blur(${s.blur}px)`,
          opacity: s.opacity,
          background: `radial-gradient(circle, ${s.color} 0%, transparent 70%)`,
          pointerEvents: "none",
          zIndex: 0
        }} />
      ))}

      <div style={{ position: "relative", zIndex: 1 }}>

        {/* Stats */}
        <div style={{ marginBottom: "18px" }}>
          <p style={{ fontSize: "11px", fontWeight: 600, color: "#4A6080", letterSpacing: "0.06em", textTransform: "uppercase", marginBottom: "10px" }}>
            Your Stats
          </p>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "6px" }}>
            {[
              { num: "200", label: "Images" },
              { num: "20", label: "Categories" },
              { num: "0", label: "Likes" },
              { num: "0", label: "Followers" },
            ].map((stat) => (
              <div key={stat.label} style={{ background: "#F0F6FF", borderRadius: "8px", padding: "10px", textAlign: "center" }}>
                <span style={{
                  fontSize: "18px",
                  fontWeight: 600,
                  background: "linear-gradient(90deg,#0c1a3d,#B8860B)",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                  display: "block",
                  lineHeight: 1.2
                }}>
                  {stat.num}
                </span>
                <div style={{ fontSize: "10px", color: "#4A6080", marginTop: "2px" }}>{stat.label}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Gold divider */}
        <div style={{ height: "1px", background: "linear-gradient(90deg,transparent,#D4A017,transparent)", margin: "14px 0", opacity: 0.5 }} />

        {/* Trending tags */}
        <div style={{ marginBottom: "18px" }}>
          <p style={{ fontSize: "11px", fontWeight: 600, color: "#4A6080", letterSpacing: "0.06em", textTransform: "uppercase", marginBottom: "10px" }}>
            Trending Tags
          </p>
          {trending.map((item, i) => (
            <div key={i} style={{ display: "flex", alignItems: "center", gap: "8px", padding: "6px 0" }}>
              <span style={{
                fontSize: "14px",
                fontWeight: 700,
                background: "linear-gradient(90deg,#0c1a3d,#D4A017)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                minWidth: "16px"
              }}>
                {i + 1}
              </span>
              <div>
                <p style={{ fontSize: "12px", fontWeight: 500, color: "#0c1a3d" }}>{item.tag}</p>
                <p style={{ fontSize: "10px", color: "#4A6080" }}>{item.posts}</p>
              </div>
            </div>
          ))}
        </div>

        {/* Gold divider */}
        <div style={{ height: "1px", background: "linear-gradient(90deg,transparent,#D4A017,transparent)", margin: "14px 0", opacity: 0.5 }} />

        {/* Suggested users */}
        <div>
          <p style={{ fontSize: "11px", fontWeight: 600, color: "#4A6080", letterSpacing: "0.06em", textTransform: "uppercase", marginBottom: "10px" }}>
            Suggested
          </p>
          {suggested.map((user, i) => (
            <div key={i} style={{ display: "flex", alignItems: "center", gap: "8px", padding: "6px 0" }}>
              <div style={{
                width: "30px",
                height: "30px",
                borderRadius: "50%",
                background: user.color,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontSize: "11px",
                fontWeight: 600,
                color: "#fff",
                flexShrink: 0
              }}>
                {user.initials}
              </div>
              <div style={{ flex: 1 }}>
                <p style={{ fontSize: "11px", fontWeight: 500, color: "#0c1a3d" }}>{user.name}</p>
                <p style={{ fontSize: "10px", color: "#4A6080" }}>{user.prompts}</p>
              </div>
              <button style={{
                padding: "4px 9px",
                borderRadius: "6px",
                border: "1px solid rgba(6,182,212,0.4)",
                background: "transparent",
                fontSize: "10px",
                color: "#0284C7",
                cursor: "pointer"
              }}>
                Follow
              </button>
            </div>
          ))}
        </div>

      </div>
    </div>
  );
}