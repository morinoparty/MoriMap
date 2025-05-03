import React, { useRef, useState, useEffect } from "react";
import { useAtom } from "jotai";
import { mapStateAtom } from "../context/state";
import { css } from "../../styled-system/css";
import { MapMarkersPinPin } from "./MapMarkersPins";

export const LayerControlPanel: React.FC = () => {
  const [state, setState] = useAtom(mapStateAtom);
  const [open, setOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const markerKeys = Object.keys(
    state.layer.markers
  ) as (keyof typeof state.layer.markers)[];

  const handleMarkerToggle = (key: keyof typeof state.layer.markers) => {
    setState((prev) => ({
      ...prev,
      layer: {
        ...prev.layer,
        markers: {
          ...prev.layer.markers,
          [key]: !prev.layer.markers[key],
        },
      },
    }));
  };

  // ドロップダウン外クリックで閉じる
  useEffect(() => {
    if (!open) return;
    const handleClick = (e: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(e.target as Node)
      ) {
        setOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClick);
    return () => document.removeEventListener("mousedown", handleClick);
  }, [open]);

  return (
    <div
      className={css({
        position: "absolute",
        top: "12px",
        left: "12px",
        zIndex: 1000,
        // background: "rgba(255,255,255,0.95)",
        borderRadius: "12px",
        // padding: "16px",
        // boxShadow: "0 2px 12px rgba(0,0,0,0.10)",
        // minWidth: "200px",
        // border: "2px solid #A7D6BD",
        display: "flex",
        flexDirection: "column",
        gap: "12px",
      })}
    >
      <div style={{ position: "relative" }}>
        <button
          aria-label="マーカー表示切替"
          className={css({
            background: "#EAF2EF",
            border: "2px solid #A7D6BD",
            borderRadius: "12px",
            padding: "4px",
            pr: "8px",
            cursor: "pointer",
            display: "flex",
            alignItems: "center",
            gap: "6px",
            boxShadow: open ? "0 2px 8px rgba(0,0,0,0.10)" : undefined,
            transition: "box-shadow 0.2s",
          })}
          onClick={() => setOpen((v) => !v)}
          type="button"
        >
          <MapMarkersPinPin />
          <span
            className={css({
              fontWeight: "bold",
              color: "#488669",
              fontSize: "14px",
            })}
          >
            マーカー表示
          </span>
          <svg
            width="16"
            height="16"
            viewBox="0 0 16 16"
            fill="none"
            style={{ marginLeft: "4px" }}
          >
            <path
              d="M4 6l4 4 4-4"
              stroke="#488669"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </button>
        {open && (
          <div
            ref={dropdownRef}
            className={css({
              position: "absolute",
              top: "42px",
              left: 0,
              minWidth: "160px",
              background: "#fff",
              border: "2px solid #A7D6BD",
              borderRadius: "10px",
              boxShadow: "0 4px 16px rgba(0,0,0,0.13)",
              p: "8px",
              px: "14px",
              zIndex: 2000,
              display: "flex",
              flexDirection: "column",
              gap: "8px",
            })}
          >
            {markerKeys.map((key) => (
              <label
                key={String(key)}
                className={css({
                  display: "flex",
                  alignItems: "center",
                  fontSize: "14px",
                  fontWeight: "bold",
                  color: "#488669",
                  cursor: "pointer",
                  gap: "6px",
                  padding: "2px 0",
                  borderRadius: "6px",
                })}
              >
                <input
                  type="checkbox"
                  checked={state.layer.markers[key]}
                  onChange={() => handleMarkerToggle(key)}
                  className={css({
                    marginRight: "6px",
                    accentColor: "#A7D6BD",
                    color: "#A7D6BD",
                  })}
                />
                {String(key)}
              </label>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};
