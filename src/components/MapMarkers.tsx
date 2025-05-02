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

// marker描画用の独立関数
function renderMarker(layer: Layer, marker: Marker, idx: number) {
  if (layer.hide) return null;

  switch (marker.type) {
    case "circle":
      return (
        <Circle
          key={`circle-${layer.id}-${idx}`}
          center={toLatLngTuple(marker.center)}
          radius={marker.radius}
          pathOptions={{
            color: marker.color,
            fillColor: marker.fillColor,
          }}
        >
          {marker.popup && <Popup>{marker.popup}</Popup>}
        </Circle>
      );
    case "polyline":
      return (
        <Polyline
          key={`polyline-${layer.id}-${idx}`}
          positions={marker.points.map((p) => toLatLngTuple(p))}
          pathOptions={{
            color: mixHexColors("#A7D6BD", marker.color, 0.6),
            fillColor: marker.fillColor,
          }}
        >
          {marker.popup && <Popup>{marker.popup}</Popup>}
        </Polyline>
      );
    case "rectangle":
      return (
        <Rectangle
          key={`rect-${layer.id}-${idx}`}
          bounds={[
            toLatLngTuple(marker.points[0]),
            toLatLngTuple(marker.points[1]),
          ]}
          pathOptions={{
            color: marker.color,
            fillColor: marker.fillColor,
            weight: marker.weight,
          }}
        >
          {marker.popup && <Popup>{marker.popup}</Popup>}
        </Rectangle>
      );
    case "icon":
      return (
        <LeafletMarker
          key={`icon-${layer.id}-${idx}`}
          position={toLatLngTuple(marker.point)}
          // アイコン設定は省略（必要に応じて）
        >
          {marker.tooltip && <Tooltip>{marker.tooltip}</Tooltip>}
          {marker.popup && <Popup>{marker.popup}</Popup>}
        </LeafletMarker>
      );
    default:
      return null;
  }
}

interface MapMarkersProps {
  markers: Layer[];
}

export const MapMarkers = ({ markers }: MapMarkersProps) => {
  return (
    <>
      {markers.map((layer) => {
        switch (layer.id) {
          case "Railway": {
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
              // circle以外は従来通り
              return renderMarker(layer, marker, idx);
            });
          }
          case "griefprevention":
            return null;
          case "squaremap-spawn_icon":
            return layer.markers.map((marker, idx) => {
              if (marker.type === "icon") {
                const iconHtml = ReactDOMServer.renderToString(
                  <MapMarkersPinPinFill />
                );
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
          case "squaremap-worldborder":
            return layer.markers.map((marker, idx) =>
              renderMarker(layer, marker, idx)
            );
          case "banners":
            return layer.markers.map((marker, idx) => {
              if (marker.type === "icon") {
                const iconHtml = ReactDOMServer.renderToString(
                  <MapMarkersPinPin />
                );
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
          default:
            return layer.markers.map((marker, idx) =>
              renderMarker(layer, marker, idx)
            );
        }
      })}
    </>
  );
};
