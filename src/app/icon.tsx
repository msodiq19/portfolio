import { ImageResponse } from "next/og";

export const size = {
  width: 32,
  height: 32,
};
export const contentType = "image/png";

export default function Icon() {
  return new ImageResponse(
    (
      <div
        style={{
          width: 32,
          height: 32,
          borderRadius: 6,
          background: "linear-gradient(135deg, #00d4ff 0%, #3b82f6 50%, #8b5cf6 100%)",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <span
          style={{
            fontSize: 16,
            fontWeight: 800,
            color: "#fff",
            letterSpacing: -1,
          }}
        >
          SM
        </span>
      </div>
    ),
    { ...size }
  );
}
