import { useEffect, useState } from "react";
import { useMap } from "react-leaflet";
import { latLngToPoint } from "../utils/crs";
import { useAtom } from "jotai";
import { mapStateAtom } from "../context/state";
import { cx, sva } from "../../styled-system/css";

export type ContextMenuState = {
  x: number;
  y: number;
  latlng: { lat: number; lng: number };
} | null;

const MapContextMenuStyles = sva({
  slots: ["root", "button"],
  base: {
    root: {
      position: "fixed",
      background: "rgba(255, 255, 255, 0.9)",
      border: "1px solid #A7D6BD",
      backdropFilter: "blur(12px)",
      borderRadius: "8px",
      boxShadow: "0 2px 8px rgba(0,0,0,0.15)",
      zIndex: 10000,
      px: "0px",
      py: "0px",
      minWidth: "180px",
      display: "flex",
      flexDirection: "column",
      gap: "8px",
    },
    button: {
      color: "#488669",
      border: "none",
      borderRadius: "6px",
      fontWeight: "bold",
      fontSize: "13px",
      px: "12px",
      py: "8px",
      cursor: "pointer",
      transition: "opacity 0.2s ease",
      _hover: {
        opacity: 0.8,
      },
    },
  },
});

export const MapContextMenu: React.FC = () => {
  const [state] = useAtom(mapStateAtom);
  const [contextMenu, setContextMenu] = useState<ContextMenuState>(null);
  const map = useMap();
  const classes = MapContextMenuStyles();

  // 右クリックでメニュー表示
  useEffect(() => {
    const handler = (e: L.LeafletMouseEvent) => {
      e.originalEvent.preventDefault();
      setContextMenu({
        x: e.originalEvent.clientX,
        y: e.originalEvent.clientY,
        latlng: e.latlng,
      });
    };
    map.on("contextmenu", handler);
    return () => {
      map.off("contextmenu", handler);
    };
  }, [map]);

  // メニュー外クリックで閉じる
  useEffect(() => {
    if (!contextMenu) return;
    const handler = () => setContextMenu(null);
    window.addEventListener("click", handler);
    return () => window.removeEventListener("click", handler);
  }, [contextMenu]);

  // URLコピー処理
  const handleCopyUrl = () => {
    if (!contextMenu) return;
    const scale = 1;
    const { x, y } = latLngToPoint(contextMenu.latlng, scale);
    const url = `https://morino.party/maps?x=${Math.round(x)}&z=${Math.round(y)}&world=${state.layer.world}`;
    navigator.clipboard.writeText(url);
    setContextMenu(null);
  };

  if (!contextMenu) return null;
  return (
    <div
      className={cx(classes.root, "map-context-menu")}
      style={{
        top: contextMenu.y,
        left: contextMenu.x,
      }}
    >
      <button className={classes.button} onClick={handleCopyUrl}>
        この位置のリンクをコピー
      </button>
    </div>
  );
};
