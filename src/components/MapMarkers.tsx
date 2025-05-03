import { Layer, Marker } from "../types/MapMaker";
import {
  Circle,
  Polyline,
  Rectangle,
  Marker as LeafletMarker,
  Popup,
  Tooltip,
} from "react-leaflet";
import { pointToLatLng } from "../utils/crs";
import {
  MapMarkersPinPin,
  MapMarkersPinPinFill,
  MapMarkersPinText,
} from "./MapMarkersPins";
import L from "leaflet";
import ReactDOMServer from "react-dom/server";
import { mixHexColors } from "../utils/mixHexColors";
import { useAtom } from "jotai";
import { mapStateAtom } from "../context/state";

// mapStateAtomの型を抽出
import type { PrimitiveAtom } from "jotai";
import { parseTrustHtmlToJson } from "../utils/parseTrustHtmlToJson";
import { GriefPreventionPopup } from "./GriefPreventionPopup";
type MapState =
  typeof import("../context/state").mapStateAtom extends PrimitiveAtom<infer T>
    ? T
    : never;

// Vec2({x, z}) → {x, y} 変換
const vec2ToXY = (v: { x: number; z: number }) => ({ x: v.x, y: v.z });
// pointToLatLngの返り値をLatLngTupleに変換
const toLatLngTuple = (
  v: { x: number; z: number },
  scale: number = 1
): [number, number] => {
  const { lat, lng } = pointToLatLng(vec2ToXY(v), scale);
  return [lat, lng];
};

// 汎用的な円マーカーコンポーネント
type RenderMarkerCircleProps = {
  center: { x: number; z: number };
  radius: number;
  color: string;
  fillColor: string;
  children?: React.ReactNode;
  popup?: string;
  interactive?: boolean;
};

export const RenderMarkerCircle: React.FC<RenderMarkerCircleProps> = ({
  center,
  radius,
  color,
  fillColor,
  children,
  popup,
  interactive = true,
}) => (
  <Circle
    center={toLatLngTuple(center)}
    radius={radius}
    pathOptions={{ color, fillColor }}
    interactive={interactive}
  >
    {popup && <Popup>{popup}</Popup>}
    {children}
  </Circle>
);

// 汎用的な折れ線マーカーコンポーネント
export type RenderMarkerPolylineProps = {
  points: { x: number; z: number }[];
  color: string;
  fillColor?: string;
  children?: React.ReactNode;
  popup?: string;
  interactive?: boolean;
};

export const RenderMarkerPolyline: React.FC<RenderMarkerPolylineProps> = ({
  points,
  color,
  fillColor,
  children,
  popup,
  interactive = true,
}) => (
  <Polyline
    positions={points.map((p) => toLatLngTuple(p))}
    pathOptions={{ color, fillColor }}
    interactive={interactive}
  >
    {popup && <Popup>{popup}</Popup>}
    {children}
  </Polyline>
);

// 汎用的な矩形マーカーコンポーネント
export type RenderMarkerRectangleProps = {
  points: [{ x: number; z: number }, { x: number; z: number }];
  color: string;
  fillColor: string;
  weight?: number;
  children?: React.ReactNode;
  popup?: string;
  interactive?: boolean;
};

export const RenderMarkerRectangle: React.FC<RenderMarkerRectangleProps> = ({
  points,
  color,
  fillColor,
  weight,
  children,
  popup,
  interactive = true,
}) => (
  <Rectangle
    bounds={[toLatLngTuple(points[0]), toLatLngTuple(points[1])]}
    pathOptions={{ color, fillColor, weight }}
    interactive={interactive}
  >
    {popup && <Popup>{popup}</Popup>}
    {children}
  </Rectangle>
);

// 汎用的なアイコンマーカーコンポーネント
export type RenderMarkerIconProps = {
  point: { x: number; z: number };
  icon: L.Icon | L.DivIcon;
  children?: React.ReactNode;
  tooltip?: string;
  popup?: string;
  interactive?: boolean;
};

export const RenderMarkerIcon: React.FC<RenderMarkerIconProps> = ({
  point,
  icon,
  children,
  interactive = true,
}) => (
  <LeafletMarker
    position={toLatLngTuple(point)}
    icon={icon}
    interactive={interactive}
  >
    {children}
  </LeafletMarker>
);

// marker描画用の独立関数
function renderMarker(layer: Layer, marker: Marker, idx: number) {
  switch (marker.type) {
    case "circle":
      return (
        <RenderMarkerCircle
          key={`circle-${layer.id}-${idx}`}
          center={marker.center}
          radius={marker.radius}
          color={marker.color}
          fillColor={marker.fillColor}
        >
          {marker.popup && <Popup>{marker.popup}</Popup>}
        </RenderMarkerCircle>
      );
    case "polyline":
      return (
        <RenderMarkerPolyline
          key={`polyline-${layer.id}-${idx}`}
          points={marker.points}
          color={mixHexColors("#A7D6BD", marker.color, 0.6)}
          fillColor={marker.fillColor}
          popup={marker.popup}
        >
          {marker.popup && <Popup>{marker.popup}</Popup>}
        </RenderMarkerPolyline>
      );
    case "rectangle":
      return (
        <RenderMarkerRectangle
          key={`rect-${layer.id}-${idx}`}
          points={marker.points}
          color={marker.color}
          fillColor={marker.fillColor}
          weight={marker.weight}
        >
          {marker.popup && <Popup>{marker.popup}</Popup>}
        </RenderMarkerRectangle>
      );
    case "icon": {
      // アイコンの生成は用途ごとに異なるため、ここではデフォルトのdivIconを仮で使用
      const icon = L.divIcon({
        html: marker.icon || "",
        className: "default-icon",
        iconSize: [30, 33],
        iconAnchor: [15, 16.5],
      });
      return (
        <RenderMarkerIcon
          key={`icon-${layer.id}-${idx}`}
          point={marker.point}
          icon={icon}
        >
          {marker.tooltip && <Tooltip>{marker.tooltip}</Tooltip>}
          {marker.popup && <Popup>{marker.popup}</Popup>}
        </RenderMarkerIcon>
      );
    }
    default:
      return null;
  }
}

// Railwayレイヤーの描画関数
function renderRailwayMarkers(layer: Layer, state: MapState) {
  if (!state.layer.markers.Railway) return null;
  return layer.markers.map((marker, idx) => {
    if (marker.type === "circle") {
      // 円の中心にMapMarkersPinCityName（街名テキスト）をdivIconで表示
      const formatCityName = (name: string) => {
        // "名前 : "の後からの部分を取得し、さらに"</span><br/>"を削除"
        const formattedName = name
          .split(" : ")[1]
          ?.replace(/<\/span><br\/>/g, "")
          .trim();
        return formattedName;
      };
      const cityName = marker.popup
        ? formatCityName(marker.popup)
        : "Unknown City";

      const iconHtml = ReactDOMServer.renderToString(
        <MapMarkersPinText text={cityName} />
      );
      const icon = L.divIcon({
        html: iconHtml,
        className: "circle-label-icon",
        iconSize: [1, 1],
        iconAnchor: [1, 1],
      });
      return (
        <LeafletMarker
          key={`circle-label-${layer.id}-${idx}`}
          position={toLatLngTuple(marker.center)}
          icon={icon}
          interactive={false}
        />
      );
    }
    return renderMarker(layer, marker, idx);
  });
}

function renderGriefpreventionMarkers(layer: Layer, state: MapState) {
  if (!state.layer.markers.griefprevention) return null;

  return layer.markers.map((marker, idx) => {
    if (marker.type === "rectangle") {
      const data = parseTrustHtmlToJson(marker.popup || "");
      return (
        <RenderMarkerRectangle
          key={`grief-${layer.id}-${idx}`}
          points={marker.points}
          color={marker.color}
          fillColor={marker.fillColor}
          weight={marker.weight}
        >
          {marker.popup && (
            <Popup>
              <GriefPreventionPopup data={data} />
            </Popup>
          )}
        </RenderMarkerRectangle>
      );
    } else {
      return renderMarker(layer, marker, idx);
    }
  });
}

// squaremap-spawn_iconレイヤーの描画関数
function renderSpawnIconMarkers(layer: Layer, state: MapState) {
  if (!state.layer.markers["squaremap-spawn_icon"]) return null;
  return layer.markers.map((marker, idx) => {
    if (marker.type === "icon") {
      const iconHtml = ReactDOMServer.renderToString(<MapMarkersPinPinFill />);
      const icon = L.divIcon({
        html: iconHtml,
        className: "spawn-icon",
        iconSize: [30, 33],
        iconAnchor: [30 / 2, 33 / 2],
      });
      return (
        <LeafletMarker
          key={`spawn-${layer.id}-${idx}`}
          position={toLatLngTuple(marker.point)}
          icon={icon}
        >
          {marker.tooltip && (
            <Popup>
              {marker.tooltip
                .replace(/<center>/g, "")
                .replace(/<\/center>/g, "")}
            </Popup>
          )}
        </LeafletMarker>
      );
    } else {
      return renderMarker(layer, marker, idx);
    }
  });
}

// squaremap-worldborderレイヤーの描画関数
function renderWorldborderMarkers(layer: Layer, state: MapState) {
  if (!state.layer.markers["squaremap-worldborder"]) return null;
  return layer.markers.map((marker, idx) => renderMarker(layer, marker, idx));
}

// bannersレイヤーの描画関数
function renderBannersMarkers(layer: Layer, state: MapState) {
  if (!state.layer.markers.banners) return null;
  return layer.markers.map((marker, idx) => {
    if (marker.type === "icon") {
      const iconHtml = ReactDOMServer.renderToString(<MapMarkersPinPin />);
      const icon = L.divIcon({
        html: iconHtml,
        className: "banner-icon",
        iconSize: [30, 33],
        iconAnchor: [30 / 2, 33 / 2],
      });
      return (
        <LeafletMarker
          key={`banner-${layer.id}-${idx}`}
          position={toLatLngTuple(marker.point)}
          icon={icon}
        >
          {marker.tooltip && (
            <Popup>
              {marker.tooltip
                .replace(/<center>/g, "")
                .replace(/<\/center>/g, "")}
            </Popup>
          )}
        </LeafletMarker>
      );
    } else {
      return renderMarker(layer, marker, idx);
    }
  });
}

// デフォルト描画関数
function renderDefaultMarkers(layer: Layer) {
  return layer.markers.map((marker, idx) => renderMarker(layer, marker, idx));
}

interface MapMarkersProps {
  markers: Layer[];
}

export const MapMarkers = ({ markers }: MapMarkersProps) => {
  const [state] = useAtom(mapStateAtom);

  return (
    <>
      {markers.map((layer) => {
        switch (layer.id) {
          case "Railway":
            return renderRailwayMarkers(layer, state);
          case "griefprevention":
            return renderGriefpreventionMarkers(layer, state);
          case "squaremap-spawn_icon":
            return renderSpawnIconMarkers(layer, state);
          case "squaremap-worldborder":
            return renderWorldborderMarkers(layer, state);
          case "banners":
            return renderBannersMarkers(layer, state);
          default:
            return renderDefaultMarkers(layer);
        }
      })}
    </>
  );
};
