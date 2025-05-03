import React from "react";
import type { Worlds } from "../types/Worlds";
import { useAtom } from "jotai";
import { mapStateAtom } from "../context/state";

export const LayerControlPanel: React.FC = () => {
  const [state, setState] = useAtom(mapStateAtom);

  const markerKeys = Object.keys(
    state.layer.markers
  ) as (keyof typeof state.layer.markers)[];
  const worldOptions = [
    { value: "minecraft_overworld", label: "Overworld" },
    { value: "minecraft_the_nether", label: "Nether" },
    { value: "minecraft_the_end", label: "The End" },
  ];

  const handleWorldChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setState((prev) => ({
      ...prev,
      layer: {
        ...prev.layer,
        world: e.target.value as Worlds,
      },
    }));
  };

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

  return (
    <div
      style={{
        position: "absolute",
        top: 12,
        left: 12,
        zIndex: 1000,
        background: "rgba(255,255,255,0.9)",
        borderRadius: 8,
        padding: 12,
        boxShadow: "0 2px 8px rgba(0,0,0,0.08)",
        minWidth: 180,
      }}
    >
      <div style={{ marginBottom: 8 }}>
        <label>
          ワールド:
          <select
            value={state.layer.world}
            onChange={handleWorldChange}
            style={{ marginLeft: 8 }}
          >
            {worldOptions.map((opt) => (
              <option key={opt.value} value={opt.value}>
                {opt.label}
              </option>
            ))}
          </select>
        </label>
      </div>
      <div>
        <div style={{ fontWeight: "bold", marginBottom: 4 }}>マーカー表示:</div>
        {markerKeys.map((key) => (
          <label key={String(key)} style={{ display: "block", fontSize: 14 }}>
            <input
              type="checkbox"
              checked={state.layer.markers[key]}
              onChange={() => handleMarkerToggle(key)}
              style={{ marginRight: 4 }}
            />
            {String(key)}
          </label>
        ))}
      </div>
    </div>
  );
};
