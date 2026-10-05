import { ImageResponse } from "next/og";
import { site } from "@/data/site";

/*
 * Imagem padrao de compartilhamento (Open Graph e Twitter/X), gerada no
 * build. TODO(cliente): trocar o traco pelo logo oficial quando chegar o SVG.
 */
export const alt = `${site.nome} — consultoria de franquias`;
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function Image() {
  return new ImageResponse(
    <div
      style={{
        width: "100%",
        height: "100%",
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        padding: "72px 80px",
        background: "#0b0b0c",
        color: "#f4f1ea",
        fontFamily: "sans-serif",
      }}
    >
      <div style={{ display: "flex", alignItems: "center", gap: 20 }}>
        <svg width="40" height="50" viewBox="0 0 16 20">
          <path
            d="M2 0V18.5L15 1"
            fill="none"
            stroke="#da8e1d"
            strokeWidth="2.2"
          />
        </svg>
        <div style={{ fontSize: 30, letterSpacing: 10 }}>AVANT FRANCHISING</div>
      </div>

      <div style={{ display: "flex", flexDirection: "column" }}>
        <div style={{ fontSize: 76, lineHeight: 1.05, maxWidth: 980 }}>
          Transformamos negócios em redes prontas para crescer.
        </div>
        <div style={{ marginTop: 28, fontSize: 28, color: "#a39e95" }}>
          {`Consultoria de franquias · desde ${site.fundacao}`}
        </div>
      </div>

      <div
        style={{
          display: "flex",
          height: 4,
          width: 160,
          background: "#da8e1d",
        }}
      />
    </div>,
    size,
  );
}
