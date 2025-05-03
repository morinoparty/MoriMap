/* eslint-disable @typescript-eslint/no-explicit-any */
import {
  MapContainer,
  TileLayer,
  LayersControl,
  useMap,
  MapContainerProps,
  TileLayerProps,
} from "react-leaflet";
import { createCRS_MC, pointToLatLng } from "../utils/crs";
import { cva } from "../../styled-system/css";
import { useMarkers } from "../hooks/useMarkers";
import { usePlayers } from "../hooks/usePlayers";
import { MapMarkers } from "./MapMarkers";
import { MapPlayers } from "./MapPlayers";
import { useEffect, useRef, useState } from "react";
import { CursorCoords } from "./CursorCoords";
import { useAtom } from "jotai";
import { mapStateAtom } from "../context/state";
import { LayerControlPanel } from "./LayerControlPanel";
import { MapContextMenu } from "./MapContextMenu";

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

const TileLayerOptions: Omit<TileLayerProps, "url"> = {
  tileSize: 512,
  zoomReverse: false,
  minZoom: 0,
  maxZoom: 5,
  maxNativeZoom: 2,
  minNativeZoom: 2,
  noWrap: true,
};
const MapContainerOptions: MapContainerProps = {
  crs: createCRS_MC(1 / Math.pow(2, 2)),
  center: pointToLatLng({ x: 5100, y: 4102 }, 1),
  zoom: 2,
  minZoom: 0,
  maxZoom: 5,
  scrollWheelZoom: true,
  zoomControl: false,
  preferCanvas: true,
  attributionControl: false,
};

export const MoriMap = () => {
  const styles = MoriMapStyles();
  const [state, setState] = useAtom(mapStateAtom);

  const { data: markers } = useMarkers();
  const { data: players } = usePlayers();

  const mapContainerRef = useRef<HTMLDivElement>(null);
  const [queryParamCentered, setQueryParamCentered] = useState(false);

  // クエリパラメータから x, z, world を取得し、地図を移動させる
  function QueryParamCentering() {
    const map = useMap();
    useEffect(() => {
      if (queryParamCentered) return;
      const params = new URLSearchParams(window.location.search);
      const x = params.get("x");
      const z = params.get("z");
      const world = params.get("world");
      if (x && z && world) {
        if (world !== state.layer.world) {
          setState((prev) => ({
            ...prev,
            layer: {
              ...prev.layer,
              world: world as import("../types/Worlds").Worlds,
            },
          }));
        }
        const latlng = pointToLatLng({ x: Number(x), y: Number(z) }, 1);
        map.setView(latlng, 2);
        setQueryParamCentered(true);
      } else {
        setQueryParamCentered(true);
      }
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [queryParamCentered]);
    return null;
  }

  // Child component to use useMap inside MapContainer
  function BaseLayerListener() {
    const map = useMap();
    useEffect(() => {
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
    <div style={{ position: "relative" }} ref={mapContainerRef}>
      {/* Layer管理UIを別コンポーネント化 */}
      <LayerControlPanel />
      {/* Map本体 */}
      <MapContainer className={styles} {...MapContainerOptions}>
        <MapContextMenu />
        <BaseLayerListener />
        <QueryParamCentering />
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
