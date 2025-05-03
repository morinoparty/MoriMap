import { MapContainer, TileLayer, LayersControl, useMap } from "react-leaflet";
import { createCRS_MC, pointToLatLng } from "../utils/crs";
import { cva } from "../../styled-system/css";
import { useMarkers } from "../hooks/useMarkers";
import { usePlayers } from "../hooks/usePlayers";
import { MapMarkers } from "./MapMarkers";
import { MapPlayers } from "./MapPlayers";
import { useEffect } from "react";
import { CursorCoords } from "./CursorCoords";
import { useAtom } from "jotai";
import { mapStateAtom } from "../context/state";
import { LayerControlPanel } from "./LayerControlPanel";

const MoriMapStyles = cva({
  base: {
    height: "100vh",
    width: "100%",
    "& .leaflet-container": {
      bg: "yellow !important",
    },
    "& .leaflet-tile-container": {
      imageRendering: "pixelated",
      filter:
        "contrast(0.8) brightness(1.2) grayscale(0.15) hue-rotate(-7deg) !important",
      mixBlendMode: "luminosity !important",
    },
  },
});

const TileLayerOptions = {
  tileSize: 512,
  zoomReverse: false,
  minZoom: 0,
  maxZoom: 5,
  maxNativeZoom: 2,
  minNativeZoom: 2,
  noWrap: true,
};
const MapContainerOptions = {
  crs: createCRS_MC(1 / Math.pow(2, 2)),
  center: pointToLatLng({ x: 5100, y: 4102 }, 1),
  zoom: 2,
  minZoom: 0,
  maxZoom: 5,
  scrollWheelZoom: true,
  zoomControl: false,
  preferCanvas: true,
};

export const MoriMap = () => {
  const styles = MoriMapStyles();
  const [state, setState] = useAtom(mapStateAtom);

  const { data: markers } = useMarkers();
  const { data: players } = usePlayers();

  // Child component to use useMap inside MapContainer
  function BaseLayerListener() {
    const map = useMap();
    useEffect(() => {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const handler = (e: any) => {
        setState((prev) => ({
          ...prev,
          layer: {
            ...prev.layer,
            world: e.name,
          },
        }));

        if (markers) {
          const spawnIconLayer = markers[e.name].find(
            (layer) => layer.id === "squaremap-spawn_icon"
          );
          if (
            spawnIconLayer &&
            spawnIconLayer.markers.length > 0 &&
            spawnIconLayer.markers[0].type === "icon"
          ) {
            const spawnPoint = spawnIconLayer.markers[0].point;
            map.setView(
              pointToLatLng({ x: spawnPoint.x, y: spawnPoint.z }, 1),
              2
            );
          }
        }
      };
      map.on("baselayerchange", handler);
      return () => {
        map.off("baselayerchange", handler);
      };
    }, [map]);
    return null;
  }

  return (
    <div style={{ position: "relative" }}>
      {/* Layer管理UIを別コンポーネント化 */}
      <LayerControlPanel />
      {/* Map本体 */}
      <MapContainer className={styles} {...MapContainerOptions}>
        <BaseLayerListener />
        <LayersControl position="topright">
          <LayersControl.BaseLayer checked name="minecraft_overworld">
            <TileLayer
              url="https://mapreserve.morino.party/tiles/minecraft_overworld/3/{x}_{y}.png"
              {...TileLayerOptions}
            />
          </LayersControl.BaseLayer>
          <LayersControl.BaseLayer name="minecraft_the_nether">
            <TileLayer
              url="https://mapreserve.morino.party/tiles/minecraft_the_nether/3/{x}_{y}.png"
              {...TileLayerOptions}
            />
          </LayersControl.BaseLayer>
          <LayersControl.BaseLayer name="minecraft_the_end">
            <TileLayer
              url="https://mapreserve.morino.party/tiles/minecraft_the_end/3/{x}_{y}.png"
              {...TileLayerOptions}
            />
          </LayersControl.BaseLayer>
        </LayersControl>
        {markers && <MapMarkers markers={markers[state.layer.world]} />}
        {players && (
          <MapPlayers
            players={players.players.filter(
              (player) => player.world === state.layer.world
            )}
          />
        )}
        <CursorCoords />
      </MapContainer>
    </div>
  );
};
