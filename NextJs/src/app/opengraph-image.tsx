import { ImageResponse } from "next/og";

export const runtime = "edge";
export const alt = "Yandrixa Smart Solutions";
export const size = {
  width: 1200,
  height: 630
};
export const contentType = "image/png";

export default function OpenGraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: 56,
          background:
            "radial-gradient(circle at top left, rgba(123,63,228,0.35), transparent 28%), linear-gradient(180deg, #090B12, #111522)",
          color: "#F7F8FC"
        }}
      >
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: 20
          }}
        >
          <div
            style={{
              width: 96,
              height: 96,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              borderRadius: 28,
              background: "rgba(123,63,228,0.18)",
              border: "1px solid rgba(255,255,255,0.12)"
            }}
          >
            <span style={{ fontSize: 48, fontWeight: 700 }}>Y</span>
          </div>
          <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
            <span style={{ fontSize: 54, fontWeight: 700 }}>Yandrixa Smart Solutions</span>
            <span style={{ fontSize: 28, color: "#A3FF12" }}>Build. Grow. Scale.</span>
          </div>
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: 18 }}>
          <span style={{ fontSize: 72, lineHeight: 1.08, maxWidth: 920, fontWeight: 700 }}>
            Web Development, Software, AI and Digital Growth
          </span>
          <span style={{ fontSize: 30, color: "#A8B0C3", maxWidth: 980 }}>
            Practical digital solutions for businesses that want better systems, clearer delivery, and scalable growth foundations.
          </span>
        </div>
      </div>
    ),
    size
  );
}
