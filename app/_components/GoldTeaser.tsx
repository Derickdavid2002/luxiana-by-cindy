import Link from "next/link";
import { C } from "../../lib/constants";

export default function GoldTeaser() {
  return (
    <div style={{ position: "relative", overflow: "hidden", padding: "100px 32px", background: "linear-gradient(135deg, #08050100, #120c00, #08050100)" }}>
      <div style={{ position: "absolute", inset: 0, backgroundImage: "url(https://images.unsplash.com/photo-1512290923902-8a9f81dc236c?w=1400&q=80)", backgroundSize: "cover", backgroundPosition: "center", opacity: 0.12 }} />
      <div style={{ position: "absolute", inset: 0, background: "linear-gradient(135deg, #060400ee, #100800dd, #060400ee)" }} />
      <div style={{ position: "absolute", top: "30%", left: "50%", transform: "translateX(-50%)", width: 600, height: 300, background: "radial-gradient(ellipse, rgba(200,148,42,0.12) 0%, transparent 70%)", filter: "blur(30px)" }} />

      <div style={{ maxWidth: 720, margin: "0 auto", textAlign: "center", position: "relative", zIndex: 1 }}>
        <div style={{ display: "inline-flex", alignItems: "center", gap: 10, background: "rgba(200,148,42,0.1)", border: "1px solid rgba(200,148,42,0.3)", borderRadius: 99, padding: "6px 20px", marginBottom: 30 }}>
          <span style={{ color: "#e8c060", fontSize: 10, letterSpacing: 3, textTransform: "uppercase", fontWeight: 600 }}>✦ Exclusive Collection ✦</span>
        </div>
        <h2 style={{ color: "#f0d080", fontSize: "clamp(32px, 5vw, 58px)", fontWeight: 700, marginBottom: 22, lineHeight: 1.15, textShadow: "0 0 40px rgba(200,148,42,0.4)" }}>
          The Gold Collection
        </h2>
        <p style={{ color: "#8a6828", fontSize: 15, lineHeight: 1.9, marginBottom: 48, maxWidth: 500, margin: "0 auto 48px" }}>
          Rare pieces reserved for those who appreciate true luxury. Crafted for those who settle for nothing less than extraordinary.
        </p>
        <Link
          href="/gold"
          style={{
            display: "inline-block",
            background: "linear-gradient(135deg, #c8942a, #e8c060, #c8942a)",
            color: "#0a0600",
            padding: "17px 56px",
            borderRadius: 12,
            fontWeight: 800,
            fontSize: 14,
            textDecoration: "none",
            letterSpacing: 1.5,
            textTransform: "uppercase",
            boxShadow: "0 4px 30px rgba(200,148,42,0.4), 0 0 60px rgba(200,148,42,0.15)",
          }}
        >
          View Gold Collection
        </Link>
      </div>
    </div>
  );
}