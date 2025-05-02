import L from "leaflet";

/**
 * McProjectionファクトリ: scaleを外部から注入できるように
 * @param scale 1ブロック=何ピクセルか
 */
export function createMcProjection(scale: number): L.Projection {
  return {
    project(latlng: L.LatLng): L.Point {
      const x = latlng.lng * scale;
      const y = -latlng.lat * scale;
      return new L.Point(x, y);
    },
    unproject(point: L.Point): L.LatLng {
      const lng = point.x / scale;
      const lat = -point.y / scale;
      return new L.LatLng(lat, lng);
    },
    bounds: L.bounds(
      new L.Point(-Infinity, -Infinity),
      new L.Point(Infinity, Infinity)
    ),
  };
}

/**
 * Minecraft用CRSファクトリ: scaleを外部から注入できるように
 * @param scale 1ブロック=何ピクセルか
 */
export function createCRS_MC(scale: number): L.CRS {
  return L.Util.extend(Object.create(L.CRS.Simple), {
    projection: createMcProjection(scale),
    transformation: new L.Transformation(1, 0, 1, 0),
  });
}

/**
 * 緯度経度({ lat, lng }) → 座標({ x, y })
 * @param latlng 緯度経度オブジェクト
 * @param scale 1ブロック=何ピクセルか（必須）
 */
export function latLngToPoint(
  latlng: { lat: number; lng: number },
  scale: number
): { x: number; y: number } {
  return {
    x: latlng.lng * scale,
    y: -latlng.lat * scale,
  };
}

/**
 * 座標({ x, y }) → 緯度経度({ lat, lng })
 * @param point 座標オブジェクト
 * @param scale 1ブロック=何ピクセルか（必須）
 */
export function pointToLatLng(
  point: { x: number; y: number },
  scale: number
): { lat: number; lng: number } {
  return {
    lat: -point.y / scale,
    lng: point.x / scale,
  };
}
