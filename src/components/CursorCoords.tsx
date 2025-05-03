import { useEffect, useState } from "react";
import { useMap } from "react-leaflet";
import { latLngToPoint } from "../utils/crs";
import { css } from "../../styled-system/css";

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
      className={css({
        position: "absolute",
        left: 0,
        bottom: 0,
        background: "#EAF2EF",
        color: "#3A5A40",
        padding: "4px 12px",
        borderRadius: "0 8px 0 0",
        fontSize: 12,
        zIndex: 9999,
        pointerEvents: "none",
        fontFamily: "monospace",
      })}
    >
      {`x: ${x.toFixed(1)}, z: ${y.toFixed(1)}`}
    </div>
  );
};
