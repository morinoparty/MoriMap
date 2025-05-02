import { useEffect, useState } from "react";
import { useMap } from "react-leaflet";
import { latLngToPoint } from "../utils/crs";

export const CursorCoords: React.FC = () => {
  const map = useMap();
  const [latLng, setLatLng] = useState<{ lat: number; lng: number } | null>(
    null
  );

  useEffect(() => {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const handler = (e: any) => {
      setLatLng(e.latlng);
    };
    map.on("mousemove", handler);
    return () => {
      map.off("mousemove", handler);
    };
  }, [map]);

  if (!latLng) return null;
  const scale = 1;
  const { x, y } = latLngToPoint(latLng, scale);
  return (
    <div
      style={{
        position: "absolute",
        right: 16,
        bottom: 16,
        background: "rgba(255,255,255,0.85)",
        color: "#333",
        padding: "6px 12px",
        borderRadius: 8,
        fontSize: 14,
        zIndex: 9999,
        pointerEvents: "none",
        fontFamily: "monospace",
      }}
    >
      {`x: ${x.toFixed(1)}, z: ${y.toFixed(1)}`}
    </div>
  );
};
