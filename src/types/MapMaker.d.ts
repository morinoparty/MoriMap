/** 座標・サイズ・アンカー共通で出てくる 2D ベクトル */
export interface Vec2 {
  /** X 軸（Minecraft の X。緯度用に Y 軸ではなく X） */
  x: number;
  /** Z 軸（Minecraft の Z。経度用に Y 軸ではなく Z） */
  z: number;
}

/** マーカーの共通色指定 (hex 文字列) */
export type HexColor = `#${string}`;

/* ---------- 個別マーカー型 ---------- */

/** 円マーカー (駅や拠点の範囲など) */
export interface CircleMarker {
  type: "circle";
  center: Vec2;
  radius: number;
  color: HexColor;
  fillColor: HexColor;
  popup?: string;
}

/** 折れ線マーカー (鉄道路線など) */
export interface PolylineMarker {
  type: "polyline";
  points: Vec2[];
  color: HexColor;
  /** データ上入っていないこともあるので optional */
  fillColor?: HexColor;
  popup?: string;
}

/** 矩形マーカー (Claim 区画など) */
export interface RectangleMarker {
  type: "rectangle";
  /** 対角２点（左上・右下） */
  points: [Vec2, Vec2];
  color: HexColor;
  fillColor: HexColor;
  /** 線の太さ。未指定ならデフォルト */
  weight?: number;
  popup?: string;
}

/** アイコンマーカー (スポーン地点や旗など) */
export interface IconMarker {
  type: "icon";
  icon: string; // アイコンキー or パス
  point: Vec2; // 表示位置
  anchor: Vec2; // 画像の基準点
  size: Vec2; // 画像サイズ
  tooltip?: string;
  tooltip_anchor?: Vec2;
  popup?: string;
}

/** マーカーの合併型 */
export type Marker =
  | CircleMarker
  | PolylineMarker
  | RectangleMarker
  | IconMarker;

/* ---------- レイヤー ---------- */

/** １レイヤー分の定義 */
export interface Layer {
  /** 初期表示で非表示かどうか */
  hide: boolean;
  /** Leaflet z-index 相当 */
  z_index: number;
  /** 表示名。JSON では数値だけど文字列扱いにしとくと安全 */
  name: string;
  /** Layer の on/off を UI に出すか */
  control: boolean;
  /** レイヤー ID */
  id: string;
  /** このレイヤーに属するマーカー配列 */
  markers: Marker[];
  /** control パネル内での表示順 */
  order: number;
  /** 生成・保存タイムスタンプ (epoch millis) */
  timestamp: number;
}

/** まるごとファイルのルート型 */
export type MapMarkerFile = Layer[];
