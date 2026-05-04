export const C = {
  pink: "#E83D8A",
  pinkLight: "#f472b6",
  pinkNeon: "#ff2d92",
  black: "#060606",
  dark: "#0e0e0e",
  card: "#121212",
  border: "#1e1e1e",
  borderGlow: "rgba(232,61,138,0.35)",
  muted: "#4a4a4a",
  mutedLight: "#7a7a7a",
  white: "#f0f0f0",
};

export const neonBorder = `1px solid ${C.borderGlow}`;
export const neonShadow = `0 0 24px rgba(232,61,138,0.25), 0 0 8px rgba(232,61,138,0.15)`;
export const neonShadowStrong = `0 0 40px rgba(232,61,138,0.4), 0 0 80px rgba(232,61,138,0.15), inset 0 0 40px rgba(232,61,138,0.05)`;

export const fmt = (n: number) => `₦${n.toLocaleString()}`;